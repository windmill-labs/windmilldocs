---
slug: automatically-populate-crm
title: Automatically Populate CRM from Simple Emails with OpenAI and Windmill Worfklows
authors: [henricourdent]
tags: [tutorial, automation, CRM, email, OpenAI, workflow]
image: ./windmill-crm.png
---

Getting leads emails from trials or newsletters signups is great. But it takes forever to get contact details manually. With a simple automated workflow, you can finally fill those details at scale.

<!--truncate-->

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/automating-contact-info.mp4"
/>
<br/>

:::info Disclaimers

This workflow is super powerful and easy to implement, however there are a few things to know:

- We do not claim a 100% success rate on every email: getting information from emails like john3@gmail.com will always be difficult.
- This workflow is great as an automation, for marginal cases it is outperformed by great detectives.
- For a step, the present workflow crawls Google results. In some cases it can be against [Google's Terms of Service](https://policies.google.com/terms).
- This workflow is not exactly free as it requires the use of [OpenAI API](https://openai.com/blog/openai-api). However their free trial will do the job and at scale, the costs are more than negligible: for each email, it will use ≈380 tokens = $0.0114. Windmill, for its part, is [free to use](/docs/getting_started/how_to_use_windmill).

:::

The present tutorial aims to 1. explain the logic behind the flow and 2. give technical tips on how to build it yourself, if you want to tailor it to you own needs (e.g. if you use a specific CRM other than Airtable in this example).

For those in a hurry, [here][wm-hub-flow] is a link to the flow on our Hub, fork it and [use it](/docs/getting_started/how_to_use_windmill).

Before jumping in, know that **this workflow was made by a non-technical user**. I have a business school background, so I guess with a little bit of intuition (and some help from Chat GPT), anyone can build such workflows on Windmill.

## A bit of architecture explanation and technical details

Here is what happens when you execute the flow for a single email:

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/crm-automation-execution.mp4"
/>

<br/>

And the graphical view of the flow:

![CRM Automated - Graph](./crm_automated_graph.png 'CRM Automated - Graph')

### 1. Making the relevant Google search

The first milestone is to make the appropriate Google search given only the email, with two objectives:

- give relevant details
- get rid of useless information

Getting rid of useless information meant for the username deleting numbers (numbers in john3@domain.com are irrelevant) and for the domain killing common ones (gmail.com, outook.com etc.) as they will only confuse OpenAI.

I quickly faced an issue: **all emails are not structured the same way**. Most are `firstname.lastname@domain.com`, but some are `firstname@domain.com` or even `(first-letter-of-name)lastname@domain.com`. For all I know, a single Google search can not accurately cover all those cases. I decided to go with 2 Google searches and use the titles of their first 2 results. So for the first one I'll search https://www.google.com/search?q=username+domain.com and the second one I went for https://www.google.com/search?q=u+sername+domain.com.

<details>
  <summary>Here is my script (in Typescript) for the parser and common emails eraser (step a). Code below:</summary>

```js
export async function main(email: string) {
	let [name, domain] = email.split('@');
	let name_space = name.charAt(0) + ' ' + name.slice(1);
	name = name.replace(/[0-9]/g, ' ');
	name_space = name_space.replace(/[0-9]/g, ' ');
	const nameWithoutDots = name.replace(/\./g, ' ');
	const commonDomains = [
		'gmail.com',
		'yahoo.com',
		'outlook.com',
		'hotmail.com',
		'aol.com',
		'icloud.com',
		'mail.ru',
		'yandex.ru',
		'live.com',
		'zoho.com',
		'protonmail.com',
		'gmx.com',
		'fastmail.com',
		'comcast.net',
		'verizon.net',
		'163.com',
		'qq.com',
		'sina.com',
		'naver.com',
		't-online.de'
	];

	const isCommonDomain = commonDomains.includes(domain);

	if (isCommonDomain) {
		return { name_space, name: nameWithoutDots, domain: '' };
	} else {
		return { name_space, name: nameWithoutDots, domain };
	}
}
```

</details>

<details>
  <summary>The one for Google search (python, step c). Code below:</summary>

```python
from bs4 import BeautifulSoup
import requests
from lxml.html import html5parser
import html5lib


def main(name: str, domain: str, name_space: str):
  def search(query):
      url = "https://www.google.com/search?q={}".format(query)
      r = requests.get(url)
      data = r.text
      soup = BeautifulSoup(data, "lxml")
      titles = soup.find_all("h3")
      res = []
      for title in titles[:2]:
          h = html5parser.fromstring(str(title)).getchildren()[0].text
          res.append(h)
      return res

  infos = [name, domain]
  query = "+".join(map(lambda x: x.replace(" ", "+"), infos))
  try:
      res1 = search(query)
  except:
      res1 = []

  infos = [name_space, domain]
  query = "+".join(map(lambda x: x.replace(" ", "+"), infos))
  try:
      res2 = search(query)
  except:
      res2 = []

  return res1, res2
```

</details>

At last, since I made two different searches, I used a simple script to remove duplicates and empty values (not to make a further OpenAI prompt for nothing).

<details>
  <summary>The script I used for removing duplicates and empty values (step ak). Code below:</summary>

```js
// import * as wmill from "https://deno.land/x/windmill@v1.83.1/mod.ts"

export async function main(r1?: string, r2?: string, r3?: string, r4?: string) {
	// Assign empty strings to undefined inputs
	const inputs = [r1, r2, r3, r4].map((input) => input ?? '');

	const results = inputs.filter((result, index, array) => {
		// Remove empty values
		if (result.trim() === '') {
			return false;
		}
		// Remove duplicates
		return array.indexOf(result) === index;
	});

	return results;
}
```

</details>

As a reminder, all the scripts I made and that are not on the [hub](https://hub.windmill.dev/) were created with the help of Chat GPT and a bit of logic.

### 2. Qualifying search results

This whole step was made because my beloved OpenAI was not able to qualify search results and make sense of the relevant ones in a single completion (or at least I did not find the right prompt to be used only once in this worflow). So I had to first ask it to qualify results before later making sense of them. This section is made for qualyfing results.

First, I used a [for loop](/docs/flows/flow_loops) to iterate over the list of search results.

This this where we use an [OpenAI completion](https://hub.windmill.dev/scripts/openai/1452/create-completion-openai) for the first time. The parameters chosen are: model = text-davinci-003, max_toxens = 300, n = 1, prompt =

> "Here is a tagline of a business profile: " + flow_input.iter.value + ". If it somehow matches the email " + flow_input.email + ", just say 'Match', otherwise say 'Doesn't match'"

<br/>

Based on its response, we'll go through a [branch](/docs/flows/flow_branches):

- if 'Match', the search result will have professional websites mentions killed (LinkedIn, Indeed etc., in order not to overwhelm OpenAI with information) and then return result
- if 'Doesn't', the search result will return empty value

<details>
  <summary>Killing professional websites mentions (step ad). Code below:</summary>

```js
// import * as wmill from "https://deno.land/x/windmill@v1.82.0/mod.ts"

const websites = [
	'Indeed',
	'Glassdoor',
	'AngelList',
	'Hired',
	'Monster',
	'CareerBuilder',
	'SimplyHired',
	'Dice',
	'Upwork',
	'BEAMSTART'
];

export async function main(search_result: string) {
	for (let website of websites) {
		if (search_result.includes(website)) {
			search_result = search_result.replace(website, '');
		}
	}
	return search_result;
}
```

</details>

<details>
  <summary>Returning a result (default typescript on Windmill, steps ag & ah). Code below:</summary>

```js
// import * as wmill from "https://deno.land/x/windmill@v1.82.0/mod.ts"

export async function main(x: string) {
	return x;
}
```

</details>

We use this latest function to give the branch (af) and the loop (ac) the result of the qualified iteration. In step ag we return result of previous step (ad). In ah, since the result is not relevant we return an empty value.

### 3. Creating the record

Thanks to the previous steps we know have: 1. the user's email, 2. between 1 and 4 qualified titles of Google searches.

Making sense of this material is easy but time consuming: the perfect use case for AI. So, we use antoher [branch](/docs/flows/flow_branches) conditioned on the existence of at least one qualified search result and we go with a new [OpenAI completion](https://hub.windmill.dev/scripts/openai/1452/create-completion-openai). Using the same paramters as the last completion, this time we ask:

> "Give with the exact format 'Number. Category: Result + jump line' the 1. First Name, 2. Last Name, 3. Profession, 4. Company and 5. What the Company Does of: email = " + flow_input.email + ". Some infos: " + results.ac[0] + ". " + results.ac[1] + ". " + results.ac[2] + ". " + results.ac[3] + ". Say 'n/a' if not sure. Do not make up names but you can guess where to split first name and last name from email (but do not add just a letter as a name). You can take more risk for What the Company Does"

<br/>

This prompt is the result of a bit of prompt engineering. I am sure there are better and more token-efficient ways of asking it. What I wanted in priority was 1. clear split of categories (to later parse them as variables) and 2. **I don't want OpenAI to get too excited and make up things**, except for "What the Company Does" since it's less of a priority.

Once the completion is made, I'll use a simple parser to create variables.

<details>
  <summary>Parsing OpenAI completion into variables (step y), script written with ... OpenAI. Code below:</summary>

```js
export async function main(completion: string) {
	const regex =
		/1. First Name: (.+)\n2. Last Name: (.+)\n3. Profession: (.+)\n4. Company: (.+)\n5. What the Company Does: (.+)/;
	const matches = completion.match(regex);
	if (!matches) {
		throw new Error('Invalid completion string');
	}

	const [, value1, value2, value3, value4, value5] = matches;
	const first_name = value1.trim();
	const last_name = value2.trim();
	const profession = value3.trim();
	const company = value4.trim();
	const what_company_does = value5.trim();

	return { first_name, last_name, profession, company, what_company_does };
}
```

</details>

Now we have all the details about our contact, it's time to tell the world (or at least our CRM). For the sake of the example, we used Airtable with a simple [API call](https://hub.windmill.dev/scripts/airtable/302/create-single-record-airtable). In that specific case we forked this template and made minor changes to use our pre-set variables.

<details>
  <summary>Creating and Airtable record (step v, but also ≈ z and an in case of error). Code below:</summary>

```js
import * as wmill from 'https://deno.land/x/windmill@v1.70.1/mod.ts';
import { Airtable } from 'https://deno.land/x/airtable/mod.ts';

export async function main(
	at_con: wmill.Resource<'airtable'>,
	at_table: wmill.Resource<'airtable_table'>,
	first_name: string,
	last_name: string,
	email: string,
	company: string,
	role: string,
	what_company_does: string,
	automatic: boolean = true
) {
	const airtable = new Airtable({ ...at_con, ...at_table });

	const new_record = {
		'First name': first_name,
		'Last name': last_name,
		Email: email,
		Company: company,
		Role: role,
		'What company does': what_company_does,
		'Generated automatically': automatic
	};

	const createOne = await airtable.create(new_record);

	return { message: 'Created record in table' };
}
```

</details>

### 4. Handling errors

You probably saw throughout this workflow that we often used [branches](/docs/flows/flow_branches). In particular, branches al and aj are made for handling cases where key conditions are not made (no search result was found, no result was qualified by OpenAI). In that case, we asked Airtable to create a single record with just the email (that is an input of the flow) and "n/a" for other values.

In the case of unpredicted errors (e.g. if OpenAI randomly makes a completition that can't be read by our parsers) I also introduced an [error handler](/docs/flows/flow_error_handler) to be executed by default if an error occurs. Again, it fills an Airtable record with "n/a" for all categories but email.

## Scale the flow

You now have a workflow that works perfectly for a single email. You can now scale it by calling it from another workflow that executes an array of emails in a for loop (as in the introducing video).

You can even **link it it to your internal database** of signups, where the flow will trigger upon every new email entry.

## Customize the flow

With the present tutorial, I showed you how I built a workflow that automatically fills a CRM with details from just an email entry.

There is **a lot of room for customization**:

- Email formats: maybe your users have other email structures. Change the mail parser and the Google search.
- Prompts: maybe you want to tailor OpenAI's decisions on your use case. Change the prompt and tell it what kind of users you expect, the risks it can take etc.
- Resources: chances are high that your CRM is not Airtable. Use other scripts ([Hubspot](https://hub.windmill.dev/integrations/hubspot), [Gsheet](https://hub.windmill.dev/integrations/gsheets), update data on [Supabase etc.](https://hub.windmill.dev/integrations/supabase)). [Create a resource type](/docs/core_concepts/resources_and_types#create-a-resource-type). Or [ask us what you need](https://docs.windmill.dev/docs/misc/getting_help).

:::tip What's next?

On our side, we'll show you in a further article how to introduce a human-in-the-loop with [approval steps](/docs/flows/flow_approval) if you want more control on the flow.

<br/>

On your side, see the [details][wm-hub-flow] of the flow and fork it to [use it on Windmill](/docs/getting_started/how_to_use_windmill).

:::

<!-- Links -->

[wm-hub-flow]: https://hub.windmill.dev/flows/38/
