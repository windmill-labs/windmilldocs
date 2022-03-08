---
title: Query the demodb resource
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/postgres_example.py)

## Description


An example of how to use resources from scripts. In this example, we will query the demo database demodb that is set up by default on Windmill.

## Code

```python
import wmill
import psycopg2

client = wmill.Client()

def main():
    # query that returns rows will return them as a list
    res1 = query_pg("SELECT * from demo", "g/all/demodb")
                                                                                  
    # query that does not return rows will return None
    res2 = query_pg("UPDATE demo SET value = 'value'", "g/all/demodb")
                                                                                  
    # one can use RETURNING to still fetch the updated rows
    res3 = query_pg("UPDATE demo SET value = 'value' RETURNING *", "g/all/demodb")
                                                                                  
    # output expects a dict
    return {"res1": res1, "res2": res2, "res3": res3}



def query_pg(query: str, resource: str):
    pg_con = client.get_resource(resource)
    conn = psycopg2.connect(**pg_con)
    cur = conn.cursor()
    cur.execute(f"{query};")
    if cur.description:
        return cur.fetchall()
    else:
        return None
```

## Schema

```python
None
```

