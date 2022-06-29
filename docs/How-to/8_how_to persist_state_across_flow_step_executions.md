# How to persist state across flow step executions

**Internal States** allow you to save state to the Windmill cloud for use in your scripts and flows. Internal states allow you to set, update and retrieve states. It is often useful to have a state that persists across an execution of the same script of the flow. For instance, you may want to have your step retrieve new changes since the last execution in which case it is sufficient to store the last retrieved items and then only return new items.

- **[setInternalStatesetInternalState(state: any, suffix?: string)](https://doc.deno.land/https://deno.land/x/windmill@v1.14.1/index.ts/~/setInternalState)** allows you to set internal state within Windmill. The function requires an object parameter of the state to be set. Additionally, the function accepts the optional string parameter **suffix** (suffix of the path of the internal state) can be input as an argument in order to to share internal state between jobs.  

- **[getInternalStatesetInternalState(suffix?: string)](https://doc.deno.land/https://deno.land/x/windmill@v1.14.1/index.ts/~/getInternalState)**** allows you to access previously set internal states. The function accepts the optional string parameter **suffix** (suffix of the path of the internal state) can be input as an argument in order to to share internal state between jobs.

## How to use Internal States
Here is a simple example of accessing a previous state with **getInternalState()**, updating it with **setInternalState()** and then accessing the updated state.

First we will obtain the previously held state on the Windmill backend.
```js
export async function main(x: number) {
    const before = await wmill.getInternalState()
}
```

The state can then be updated or set using **setInternalState()** by specifying an object with a property and value. 
```js
export async function main(x: number) {
    const before = await wmill.getInternalState()
    await wmill.setInternalState({test: x})
}
```

The updated state can then be accessed and saved to a variable which can be returned. 
```js
export async function main(x: number) {
    const before = await wmill.getInternalState()
    await wmill.setInternalState({test: x})
    const after = await wmill.getInternalState()
    return { before, after }
}
```
## Implementation using Internal States vs Postgres SQL Database

Lets take a look at how internal states can be used to implement a script that allows users to check if a github repo has new stars. First we'll show you how the script is implemented using a postgres database to save the state of the github repo stars value. Then we'll compare it to how the same script is implemented with the power of Windmill internal states.

### Postgres Implementation

The script takes an input argument of a json object containing a Github repo name with it's corresponding star count. The script to generate this input is available on Windmill Hub and can be accessed [here](https://hub.windmill.dev/scripts/github/1206/get-repo-star-count-github#approved). 

```json
//{"reponame": star_count}

{"awesome":206586}
```

The below script connects to a Postgres Database and compares the previously held star count value of the repo that is held in the database to the value that was just obtained from input argument. If the new star value is greater than the old star value, the script will return a notification message containing the amount of new stars that the repo received.
If the repo is not in the database, the script will add it. Additionally, if the repo lost stars the script will update the database. 
```js
// only do the following import if you require your script to interact with the windmill
// for instance to get a variable or resource
import * as wmill from "https://deno.land/x/windmill@v1.14.6/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { databaseUrlFromResource } from "https://deno.land/x/windmill@v1.15.1/mod.ts";

export async function main(username: string, new_entries: object) {
  //Postgres Database Connection
  const client = new Client(
    await databaseUrlFromResource("u/Ross/windmill_pg_db"),
  );
  await client.connect();

  const select_query: string = "SELECT * FROM github_stars";
  const returned_query = await client.queryObject(select_query);
  const rows = returned_query.rows;

  var old_entries_dict = {};
  for (var i = 0; i < returned_query.rowCount; i++) {
    old_entries_dict[rows[i]["repo"]] = rows[i]["stars"];
  }
  var notification_list = {};
  var new_stars = false;
  for (var key in new_entries) {
    if (key in old_entries_dict && new_entries[key] > old_entries_dict[key]) {
      const difference = new_entries[key] - old_entries_dict[key];
      var add_update_lead_db_query: string = `UPDATE github_stars SET stars = ${
        new_entries[key]
      } WHERE repo = '${key}';`;
      var returned_update_query = await client.queryObject(
        add_update_lead_db_query,
      );
      notification_list[key] = difference;
      new_stars = true;
    } else if (
      key in old_entries_dict && new_entries[key] < old_entries_dict[key]
    ) {
      var sub_update_lead_db_query: string = `UPDATE github_stars SET stars = ${
        new_entries[key]
      } WHERE repo = '${key}';`;
      var returned_update_query = await client.queryObject(
        sub_update_lead_db_query,
      );
    } else if (!(key) in old_entries_dict) {
      var insert_lead_db_query: string =
        `INSERT INTO github_stars (repo, stars) VALUES ('${key}', ${
          new_entries[key]
        });`;
      var returned_update_query = await client.queryObject(
        insert_lead_db_query,
      );
    }
  }
  if (new_stars == true) {
    var notification: string =
      "You have received new Github stars on the following repos:";
    for (key in notification_list) {
      notification += `\n ${key} : ${notification_list[key]} Stars. `;
    }
  } else {
    var notification: string = "No new stars";
  }

  await client.end();

  return notification;
}



```

As you can see from the above example, getting and setting state using databases can lead to increased complexity when creating scripts to be used within flows and for consuming APIs. 

### Internal States Implementation

The below script computes the same result using the power of **Internal States** to minimise complexity by accessing states directly from the Windmill backend. The script gets the previous internal state and saves it to a variable called **before** using **wmill.getInternalState()**. The new state is set using **wmill.setInternalState()** and the resulting state is saved to a variable called **after**. If the new value of stars is greater than the old value of stars then the gained github stars is output to a notification that is sent to a next step in a Windmill Flow.

```json
//{"reponame": star_count}

{"awesome":206586}
```

```js
// only do the following import if you require your script to interact with the windmill
// for instance to get a variable or resource
import * as wmill from "https://deno.land/x/windmill@v1.14.3/index.ts";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

function getValue(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return obj[i];
    }
  }
}

export async function main(data: object) {
  const before = await wmill.getInternalState();
  var property = "";
  for (var key in data) {
    property = key;
    await wmill.setInternalState({ [key]: data[key] });
  }
  const after = await wmill.getInternalState();

  const before_val: number = getValue(before);
  const after_val: number = getValue(after);

  var notification: string =
    `No new Github stars on the following repo: \n ${property} : ${before_val} Stars`;
  if (after_val > before_val) {
    const difference: number = after_val - before_val;
    notification =
      `You have received ${difference} new Github stars on the following repo:\n${property} `;
  }

  return notification;
}


```
