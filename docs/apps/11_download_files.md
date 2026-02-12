---
description: How do I download files in Windmill apps? Use download buttons or transformers with Base64-encoded data URLs.
---

# Download files in apps

Within your Windmill apps, you might want users to download files. There are two options: the download button, and the transformers. Both involve manipulating data URLs scheme with a Base64 encoded string.

## Download button

The [download button](./4_app_configuration_settings/download_button.mdx) component allows you to download a file. The data source of the Download button must be a data URL scheme with a [Base64 encoded string](../core_concepts/18_files_binary_data/index.mdx):

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/download_base64.mp4"
	alt="Download button Base64"
/>

## Transformers

A [transformer](./3_app-runnable-panel.mdx#transformer) is a function that alters the output of the runnable, often used to format the output.

You can then download the file from your browser with the right transformer:

```js
// Assuming `result` is your data URL scheme with a Base64 encoded string

// Function to download the data as a file
function downloadDataAsFile(dataUrl, fileName) {
  // Create an anchor element
  const anchor = document.createElement('a');

  // Set the href to the data URL
  anchor.href = dataUrl;

  // Set the download attribute to the desired file name
  anchor.download = fileName;

  // Append the anchor to the body (required for Firefox)
  document.body.appendChild(anchor);

  // Trigger the download by simulating a click on the anchor
  anchor.click();

  // Remove the anchor from the body
  document.body.removeChild(anchor);
}

// Call the function with your data URL and a file name
downloadDataAsFile(result, 'name.file');
```

or if the result is just regular JSON:
```js
// Function to download the data as a file
function downloadDataAsFile(dataUrl, fileName) {
  // Create an anchor element
  const anchor = document.createElement('a');

  // Set the href to the data URL
  anchor.href = dataUrl;

  // Set the download attribute to the desired file name
  anchor.download = fileName;

  // Append the anchor to the body (required for Firefox)
  document.body.appendChild(anchor);

  // Trigger the download by simulating a click on the anchor
  anchor.click();

  // Remove the anchor from the body
  document.body.removeChild(anchor);
}

// Call the function with your data URL and a file name
downloadDataAsFile(result, 'selected_row.md');
```

Here is an example of downloading a file from a [button](./4_app_configuration_settings/button.mdx) in a [table](./4_app_configuration_settings/table.mdx).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/add_transformer_on_demand.mp4"
	alt="Transformer table"
/>

<br/>

And here is another example of a [background script](./3_app-runnable-panel.mdx#background-runnables) and a transformer automatically downloading a file upon input change (here the selected row of a [table](./4_app_configuration_settings/table.mdx)).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/transformer_background.mp4"
	alt="Transformer background script"
/>