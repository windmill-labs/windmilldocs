---
slug: listen-to-db-changes
title: Listen to Database Changes with Windmill Triggers or Debezium
authors: [fatonramadani]
tags: ['debezium', 'windmill', 'database', 'cdc']
image: ./ai-bot.png
---

# Listen to Database Changes with Windmill Triggers or Debezium

In this blog post, we will discuss how to listen to database changes using Windmill Triggers or Debezium. We will compare the two approaches and discuss their pros and cons.

## Windmill Triggers

Trigger scripts are designed to pull data from an external source and return all of the new items since the last run, without resorting to external webhooks. A trigger script is intended to be used with schedules and states (rich objects in JSON, persistent from one run to another) in order to compare the execution to the previous one and process each new item in a for loop. If there are no new items, the flow will be skipped.

### Example

```typescript
import { getState, setState } from 'https://deno.land/x/windmill@v1.85.0/mod.ts';
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

type Postgresql = {
	host: string;
	user: string;
	dbname: string;
	password: string;
};

export async function main(dbConfig: Postgresql, table: string) {
	const client = new Client({
		hostname: dbConfig.host,
		user: dbConfig.user,
		database: dbConfig.dbname,
		port: 5432,
		password: dbConfig.password
	});
	await client.connect();

	let lastState = await getState();
	if (!lastState) {
		lastState = 0;
	}

	const newEntries = await getNewEntries(client, table, lastState);
	const maxId = newEntries.length > 0 ? newEntries[newEntries.length - 1].id : lastState;
	await setState(maxId);

	await client.end();
	return newEntries;
}

async function getNewEntries(client: Client, table: string, lastState: number) {
	const result = await client.queryObject(`SELECT * FROM ${table} WHERE id > $1 ORDER BY id ASC`, [
		lastState
	]);
	return result.rows;
}
```

### Pros

- Easy to set up and use
- No need for external webhooks
- Can be used with schedules and states

### Cons

- Not real-time
- Requires polling
- Not suitable for high-frequency updates
- State management can be complex

## Debezium

Debezium is an open-source distributed platform that captures row-level changes in databases so that your applications can see and respond to those changes. Debezium records all of the changes in Kafka topics, which can then be consumed by your applications.

Debezium Server is distributed as a Docker image, and it can be easily deployed in a containerized environment. Debezium supports a wide range of databases, including MySQL, PostgreSQL, MongoDB, and SQL Server.

In our example, we will:

1. Add Debezium to our Docker Compose file
2. Using the Debezium REST API to configure the connector, including the database connection details and the sink configuration.

The sink configuration specifies where the changes should be sent. In our case, we will trigger a script using a webhook.

### Add Debezium to Docker Compose

```yaml
debezium:
  image: debezium/server:2.7
  ports:
    - '8083:8083'
  volumes:
    - ./config:/debezium/config
```

### Configure the Connector

We will use a Windmill script to configure the Debezium connector using the REST API.

```typescript
type Postgresql = {
	host: string;
	port: string;
	user: string;
	password: string;
	dbname: string;
};

async function registerConnector(config: { name: string; config: Record<string, string> }) {
	const response = await fetch('http://localhost:8083/connectors', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(config)
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(`Failed to register connector: ${errorMessage}`);
	}

	return response.json();
}

export async function main(dbConfig: Postgresql, table: string, webhookUrl: string) {
	const newConnectorConfig = {
		name: 'dbserver2-connector',
		config: {
			'connector.class': 'io.debezium.connector.postgresql.PostgresConnector',
			'tasks.max': '1',
			'database.hostname': dbConfig.host,
			'database.port': dbConfig.port,
			'database.user': dbConfig.user,
			'database.password': dbConfig.password,
			'database.dbname': dbConfig.dbname,
			'database.server.name': dbConfig.dbname,
			'table.include.list': table,
			'plugin.name': 'pgoutput',
			transforms: 'route',
			'transforms.route.type': 'org.apache.kafka.connect.transforms.RegexRouter',
			'transforms.route.regex': '([^.]+)\\.([^.]+)\\.([^.]+)',
			'transforms.route.replacement': '$3',
			'key.converter': 'org.apache.kafka.connect.json.JsonConverter',
			'value.converter': 'org.apache.kafka.connect.json.JsonConverter',
			'key.converter.schemas.enable': 'false',
			'value.converter.schemas.enable': 'false',
			'debezium.sink.type': 'https',
			'debezium.sink.http.url': webhookUrl,
			'debezium.sink.http.headers': 'Content-Type:application/json'
		}
	};

	registerConnector(newConnectorConfig)
		.then((response) => console.log('Connector registered:', response))
		.catch((error) => console.error('Error:', error));
}
```

No we want to create a script that will be triggered by the webhook. The script will process the changes and update the state.

Once we deployed our script, we need to configure the Debezium connector to send the changes to our webhook.
