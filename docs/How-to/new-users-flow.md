
## Flow Step 1: Get users from API endpoints
```js
export async function main() {
  const req = new Request(
    "https://62a35d5b5bd3609cee68de82.mockapi.io/users/",
    {
      method: "GET",
    },
  );
  let resp = await fetch(req);
  let data = JSON.parse(await resp.text());

  var new_entries = {};
  for (var i = 0; i < data.length; i++) {
    new_entries[data[i]["email"]] = {
      username: data[i]["username"],
      name: data[i]["name"],
    };
  }
  return new_entries;
}
```

## Flow Step 2: Send users to temp PG Table and then diff on main PG User Table 

```js
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { databaseUrlFromResource } from "https://deno.land/x/windmill@v1.15.1/mod.ts";

export async function main(data: object) {
    const client = new Client(
        await databaseUrlFromResource("u/Ross/windmill_pg_db"),
    ); 

    await client.connect();

    for (var i = 0; i < data.length; i++) {
        let insert_query: string =
            `INSERT INTO temp_user_table2 (email, username, name) VALUES (${data[i]["email"]}, ${data[i]["username"]}, ${data[i]["name"]});`
        await client.queryObject(insert_query);
    }

    let select_distinct_query =
        "SELECT DISTINCT on (email) email, username, name FROM temp_user_table1 temp_db WHERE NOT EXISTS (SELECT FROM temp_user_table2 main_db WHERE temp_db.email = main_db.email);";
    let users = await client.queryObject(select_distinct_query);

    console.log(users.rows[0]["email"]);
    let users_dict = {};
    for (var i = 0; i < users.rowCount; i++) {
        users_dict[users.rows[i]["email"]] = {
            username: users.rows[i]["username"],
            name: users.rows[i]["name"],
        };
    }
    for (var key in users_dict) {
        const insert_query: string =
            `INSERT INTO temp_user_table1 (email, username, name) VALUES (${key}, ${users_dict[key]["username"]
            }, ${users_dict[key]["name"]}) RETURNING lead_id, email, username;`;
    }

    return users_dict;

}
```


## Flow Step 3: Send to airtable
```js
import { Airtable } from "https://deno.land/x/airtable/mod.ts";
import { Field } from "https://deno.land/x/airtable/mod.ts";

export async function main(at_con: wmill.Resource<"c_airtable">,
    new_record_list: object) {
    let dict = [];
    for (let key in new_record_list) {
        dict.push({
            email: key,
            username: new_record_list[key]['username'],
            name: new_record_list[key]['name']
        });
    }

    const airtable = new Airtable(at_con);

    type Fields = {
        Email: string;
        Username: string;
        Name: string;
    };

    const createMultiple = await airtable.create<Fields>(
        new_record_list,
    );
    return new_record_list;
}
```
## Flow Step 4: Send Email to new users 
```js
import * as wmill from 'https://deno.land/x/windmill@v1.13.0/index.ts'
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";


export async function main(new_user_list: object) {


    for (var user_email in new_user_list) {

        let content_message = `Hi ${new_record_list[user_email]['name']},\nThank you for joining Windmill! \nFrom Windmill Team`;

        const client = new SmtpClient();

        const connectConfig: any = {
            hostname: "smtp.mail.me.com",
            port: 465,
            username: "xxxxx@gmail.com",
            password: "xxxxxxxx",
        };
        await client.connectTLS(connectConfig);

        await client.send({
            from: "@windmill.dev",
            to: user_email,
            subject: "Welcome to Windmill!",
            content: content_message,
        });

        await client.close();

    }
    return { foo: "success" };
}
```