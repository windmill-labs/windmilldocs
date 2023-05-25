# Tutorial: E-commerce CRM app

We will now use the Windmill app builder to build a simple E-commerce backoffice app. It is a simple CRM app that allows you to manage your products, customers and orders of a e-commerce store.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-ecomm-demo.mp4"
/>

<br/>

It showcases a variety of features that are available in the Windmill app builder, such as:

- [Runnables](/docs/apps/app-runnable/): scripts or flows that are executed on demand.
- [Components](/docs/apps/app_component_library/): pre-built, reusable building blocks that encapsulate specific functionalities or design elements.

:::tip

This app is available on the [Hub](https://hub.windmill.dev/apps/14/) and can be used on our [Demo workspace](https://app.windmill.dev/user/login) with the proper Supabase integration.

:::

## Features

We use [Supabase](https://supabase.com/) as a backend for this app. It is a great alternative to Firebase and it is free to use. It is a great way to get started with building your app. You can read more about Supabase [here](https://supabase.com/docs). Windmill has a [Supabase integration](/docs/integrations/supabase/) on the [Hub](https://hub.windmill.dev/) that allows you to easily connect your app to Supabase, and integrate it with your app.

We will use the following scripts from the Hub:

- [Fetch data from Supabase](https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase).
- [Create a new record in Supabase](https://hub.windmill.dev/scripts/supabase/1513/insert-data-supabase).
- [Update a record in Supabase](https://hub.windmill.dev/scripts/supabase/1514/update-data-supabase).

We will structure the app as follows:

- Products:
  - List of products: `Table`
  - Form to edit a product `Container`:
    - Title: `Text`
    - Description: `Text`
    - Image: `Image`
    - Price: `Text`
    - Quantity: `Text`
    - Save button: `Button`
- Orders
  - List of orders:
    - List of orders `Table`
    - List of product of an order `Table`
  - Analytics `PieChart`
  - Shipments map `Map`
- Customers
  - List of customers `Table`
  - List of orders of a customer `Table`
- Manual order
  - List of user `Table`
  - List of products `Table`
  - Form to create an cart

### Products Tab

We will split the product view into two parts, with the [vertical split](../apps/4_app_component_library.md#vertical-split-panes). The left part will be a list of products, and the right part will be a form to edit the currently selected product.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step1.mp4"
/>

#### Products List

A product has the folowing fields:

- **id** - the unique identifier of the product
- **title** - the title of the product
- **description** - the description of the product
- **image_url** - the URL of the product image
- **price** - the price of the product
- **quantity** - the quantity of the product

First we need to configure the data source for the Table component. We will pick the [Fetch data (supabase)](https://hub.windmill.dev/scripts/supabase/1512/fetch-data-supabase) script, available in the Hub.

This script has multilpe input, but we only need to specify the table name and the auth token.

Normally the component has now thrown an error: The Table component is expecting an array but got an object. This is because the script returns an object with the data in the `data` field. We can use a **transformer** to fix this.

```js
return result.data;
```

We can go further and use the transformer to remove fields that we don't need in the table.
For example, we can remove the `image_url` field, since we don't need it in the table, we would rather display the image in the form.

```js
return result.data?.map((product) => {
	const { id, title, description, price, quantity } = product;
	return { id, title, description, price, quantity };
});
```

#### Edit Product

Now we can add the form to the right side of the split. We will use Text and inputs components to create the form.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step2.mp4"
/>

<br/>

One powerful feature of Windmill is the ability to connect an output of one component to the input of another component. This allows us to connect the default value of an input to a value of the selected row of the table.

Now we need to add a button that will save the changes to the product. For the sake of demonstration, we will write our own script to update the product.

```ts
import { Resource } from 'https://deno.land/x/windmill@v1.70.1/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function main(
	auth: Resource<'supabase'>,
	id: string,
	title: string,
	description: string,
	quantity: number,
	price: number
) {
	const client = createClient(auth.supabaseUrl, auth.supabaseKey);

	return await client.from('products').update({ title, description, quantity, price }).eq('id', id);
}
```

The final result should look like this:
<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step3.mp4"
/>

### Orders Tab

The orders tab will have three parts:

- List of orders
- Analytics
- Shipments map

#### List of orders

The list of orders is pretty much the same as the list of products. We will use the same script to fetch the data from the database,
but we will use a different transformer to remove the fields that we don't need.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step4.mp4"
/>

<br/>

Like the products, we need to add a transformer to the Table component to remove the fields that we don't need.

```js
export async function main(orders: any[]) {
	return orders?.map((order) => {
		const { total_price, country, city, address, id } = order;
		return { id, total_price, address: `${address}, ${city}, ${country}` };
	});
}
```

#### List of products of an order

Now that we have the list of orders, the list of products and the selected order, we can display the list of products of the selected order.

We can create a new Table, and write an inline script to select the products of the selected order.

```ts
export async function main(selectedOrderIndex: number, orders: any[], products: any[]) {
	if (!orders) {
		return [];
	}

	return orders[selectedOrderIndex].product_ids.map((id) => {
		const product = products?.find((p) => p.id === id);

		if (!product) {
			return {};
		}

		const { title, description, price } = product;

		return { title, description, price, quantity: 1 };
	});
}
```

In this example, we assume that the quantity of each product is 1. We can improve this by adding a new field to the orders table, and storing the quantity of each product in the order.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step5.mp4"
/>

#### Analytics

It would be nice to have some analytics about the orders. We will use the PieChart component to display the number of products sold per order.

In order to to this, we will need to fetch the list of products sold per order. We will use the following inline script as a data source of a PieChart component.

```ts
export async function main(orders) {
	const count = { one: 0, two: 0, more: 0 };

	orders.forEach((o) => {
		const { length } = o.product_ids;
		count[length === 1 ? 'one' : length === 2 ? 'two' : 'more']++;
	});

	return {
		data: [count.one, count.two, count.more],
		labels: ['1 item', '2 items', 'More than 2 items']
	};
}
```

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step6.mp4"
/>

#### Shipments map

The last part of the orders tab is a map that shows the location of the orders. We will use the Map component to display the map.

The Map component has configuration `Map markers` that allows us to add markers to the map. We will use the following background inline script to create the markers.

We first need to convert the list orders to a list of addresses. We will use the following background inline script to do this.

```ts
export async function main(orders: any[]) {
	return orders?.map((order) => `${order.address} ${order.city} ${order.country}`) ?? [];
}
```

Then we will use the Google Maps API to convert the addresses to coordinates. We will use the following background inline script to do this.

```ts
async function reverseGeocode(address: string, apiKey: string) {
	const encodedAddress = encodeURIComponent(address);
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
	);

	if (!response.ok) {
		throw new Error(`Error fetching data from Google Maps API: ${response.statusText}`);
	}

	const data = await response.json();

	if (data.status !== 'OK') {
		throw new Error(`Google Maps API error: ${data.status}`);
	}

	const location = data.results[0].geometry.location;
	return { lat: location.lat, lon: location.lng, title: address };
}

export async function main(addresses: string[], apiKey: string) {
	const promises = addresses.map((address) => reverseGeocode(address, apiKey));
	return Promise.all(promises);
}
```

We can now connect the output of the previous script to the Map component as the `Map markers` configuration.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/app-builder-ecomm-step7.mp4"
/>

### Manual order tab

The manual order tab will have the following parts:

#### Customer selection

We will use a select component to select the customer.

We can write a background inline script to create this list using the previously fetched customers.

```ts
export async function main(users: any[]) {
	return users.map((u) => ({
		label: `${u.first_name}  ${u.last_name}`,
		value: u.id
	}));
}
```

#### Product selection

We will use a table to display the list of products. This is the same list of products that we used in the products tab. But we need to add a table action to the products table to add the selected product to the cart.

We can now use the concept of frontent script. Frontend scripts are scripts that are executed in the browser. We can use frontend scripts to interact with the local state of the app. Given that the id of the table is `ao`:

```ts
if (state.cart) {
	state.cart = [ao.selectedRow.id, ...state.cart];
} else {
	state.cart = [ao.selectedRow.id];
}
```

What we are doing here is adding the id of the selected product to the cart. We can now use this cart to display the list of products in the cart.

#### Cart management

For instance, let's create a new table and use the following inline script to display the list of products in the cart.

```ts
return state.cart ? state.cart.map((id) => j.result.find((x) => x.id === id)) : [];
```

The `add to cart` action needs to trigger a refresh of the table. We can do this by selecting the id of the table in the `Recompute others` configuration of the action. See [Recompute others](/docs/apps/app-runnable#recompute/) for more details.

We also need a action to remove a product from the cart. We can use the following frontend script to do this.

```ts
if (state.cart) {
	state.cart.splice(ap.selectedRowIndex, 1);
}
```

Like the `add to cart` action, we need to select the id of the table in the `Recompute others` configuration of the action to refresh the table.

We can also add a text field to display the total price of the cart. The static input of a text field is a template string. We can use the following template string to display the total price of the cart.

```ts
Total: ${ap.result.reduce((accu, curr) => accu + curr.price/100, 0)} CHF
```

Where `ap` is the id of the table.

The final step are to add two buttons:

- `Checkout` to create the order
- `Delete cart` to clear the cart

Deleting the cart is pretty straightforward. We can use the following frontend script to do this.

```ts
state.cart = [];
```

It also needs to refresh the table. We can do this by selecting the id of the table in the `Recompute others` configuration of the action.

The `Checkout` button needs to create the order. We can use the following frontend script to do this.

```ts
import { Resource } from 'https://deno.land/x/windmill@v1.70.1/mod.ts';
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.10.0';

export async function main(auth: Resource<'supabase'>, customerId: string, productIds: string[]) {
	const client = createClient(auth.supabaseUrl, auth.supabaseKey);

	productIds = productIds.filter(Boolean);
	const { country, city, address } = await getCustomer(client, customerId);
	const total_price = await getTotalPrice(client, productIds);

	return await client
		.from('orders')
		.insert({
			customer_id: customerId,
			product_ids: productIds,
			country,
			city,
			address,
			total_price
		})
		.select();
}

async function getCustomer(client: SupabaseClient, id: string) {
	const { data, error } = await client
		.from('customers')
		.select('country, city, address')
		.eq('id', id);

	if (error || !data.length) {
		throw Error(error?.message || `Couldn't find customer with ID "${id}"`);
	}

	return data[0];
}

async function getTotalPrice(client: SupabaseClient, ids: string[]) {
	const promises = ids.map((id) => client.from('products').select('price').eq('id', id));
	const res = await Promise.all(promises);
	let total = 0;

	for (let i = 0; i < res.length; i++) {
		const { data, error } = res[i];
		if (error || !data.length) {
			throw Error(error?.message || `Couldn't find product with ID "${ids[i]}"`);
		}
		total += data[0].price;
	}

	return total;
}
```
