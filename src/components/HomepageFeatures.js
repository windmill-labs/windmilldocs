import React from 'react';
import Postgres from '../../static/third_party_logos/postgres.svg';
import Mysql from '../../static/third_party_logos/mysql.svg';
import Mongo from '../../static/third_party_logos/mongo.svg';
import Slack from '../../static/third_party_logos/slack.svg';
import Link from '@docusaurus/Link';
import
{
	ClockIcon,
	CloudUploadIcon,
	CogIcon,
	LightningBoltIcon,
	LockClosedIcon,

	ShieldCheckIcon,

	SwitchHorizontalIcon,
} from '@heroicons/react/outline'

const features = [
	{
		name: 'User and groups Granular Permissions',
		description: <span>Every item is personal by default. Change ownership or share (read-only or not) with specific users, groups or your entire org</span>,
		icon: LockClosedIcon,
	},
	{
		name: 'Immutable scripts and versioning',
		description: <span>Scripts are never overwritten, they are versioned using our simplified and integrated git scheme. Each version of a script
			has its own hash so that you can edit script without worries.</span>,
		icon: ClockIcon,
	},
	{
		name: 'Push to Deploy',
		description: <span>Deploy from Github and use it as partial or complete source control using our github action</span>,
		icon: CloudUploadIcon,
	},
	{
		name: 'No lock-in: exportable workspace',
		description: 'Workspaces are exportable as tarball so that you can freely switch to an external source control tool or leave us altogether.',
		icon: SwitchHorizontalIcon,
	},
	{
		name: 'Secrets & Variables are safe with us',
		description: `Secrets have an additional layer of security by being encrypted with a public key (your own for self-hosted agents)
		 so that even windmill cannot see them if needed. Secrets compared to variables are sensitive and as such can only be used within scripts.`,
		icon: ShieldCheckIcon,
	},
	{
		name: 'Trigger from UI, Slack command, Schedules, Webhooks or other scripts.',
		description: 'Trigger your scripts from the generated UI, the /windmill command of our slack bot, cron-like schedule, from external services using your API tokens or from other scripts themselves!',
		icon: LightningBoltIcon,
	},

]

export default function HomepageFeatures() {
	return (
		<div>
			<div className="relative py-10 overflow-hidden">
				<div className="relative">
					<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-flow-col-dense ">
						<div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
							<div>
								<div className="mt-6">
									<h2 className="text-3xl font-extrabold tracking-tight font-boldtext-gray-900">
										Build simple and complex workflows in minutes, no more UI tech debt
									</h2>
									<p className="mt-4 text-lg text-gray-500">
										Apps and their UI are automatically generated and continuously updated from your script parameters.
										<br /><br />
										The arguments of your main function are parsed with their names, types 
										and default parameters to build an App UI automatically. All python types have dedicated form fields, even complex ones.<br/><br/>
										<br /><br />
										The automatically generated UI can then be, if desired, customised and specialized with information that is impossible to infer from a script.<br/><br/>
										<span className='font-bold'>The generated UI makes it very simple to expose your app to non-technical users while 
										not requiring any effort from the script author.</span>
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-2">
							<div className="flex p-4 lg:-ml-4 sm:pr-6 lg:px-0  lg:h-full ">
								<img
									className="w-full lg:max-w-none m-auto"
									src="/img/parser.png"
									alt="UI parser"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-4">
				<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-10">
					<div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
						<div>
							<div className="mt-6">
								<h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
									Make your internal operations production grade with ease
								</h2>
								<p className="mt-4 text-lg text-gray-500">
									By relying on windmill.dev, you ensure that your team never has to worry about deploying and managing
									the deployment of your internal operations.
									<br /><br />
									Your secrets are tightly permissioned, no more sending passwords as DM on slack.
									<br /><br />
									All operations are auditable thanks to the exhaustive audit logs.
									<br /><br />
									Visibility of all items is personally private by default, share it with all your teams or select persons using our groups and user granular permissioned ACLs.
									<br /><br />
									Windmill.dev makes it natural to uses the best practice of software engineering from the get go, upskill your team without efforts.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
						<div className="flex p-4 lg:-ml-4 sm:pr-6 lg:px-0  lg:h-full ">
							<img
								className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5  lg:w-auto m-auto"
								src="/img/run_script.png"
								alt="Run UI"
							/>
						</div>
					</div>
				</div>
			</div>
			

					<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-flow-col-dense lg:gap-10">
						<div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0 lg:col-span-2">
							<div>
								<div className="mt-6">
									<h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
										Replace all your sparely used niche tools, we do it all and to any API
									</h2>
									<p className="mt-4 text-lg text-gray-500">
										Windmill.dev is extremely generic, it uses simple but powerful abstractions. if you can script it, then windmill can do it.
										<br /><br />
										A script with a main function that works locally will work on windmill. In addition, we extend the scripts capabilities by having them able to use secrets as environment variables.
									 They can be scheduled for later or perdiodically, triggered from a slack command, 
										from an UI or using their dedicated webhook, with their input as the entire JSON payload. If the script return items that are images, files or tables, they are properly rendered.
										<br /><br />
										Many tools do only one thing, and are focused on one specific problem. You need to setup many different niche tools that only a few of your org members will end up using.
										<br /><br />
										By reducing the number of tools you use, you standardize and make it easier for your whole team to master the one tool to rule them all (and in darkness, bind them ... as API connector).
										<br /><br />
										We do not reinvent the wheel, connect to any API using its standard python client available in Pypi.
										Any python library becomes a connector.<br />
										<div className="flex flex-row gap-4 mt-4 justify-center">
											<Postgres />
											<Mysql />
											<Mongo />
											<Slack />
									<span className='text-xs font-mono my-auto'>... anything with a python client</span>
										</div>
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-1">
					<div className="flex flex-col justify-center p-4 lg:-ml-4 sm:pr-6 lg:px-0 mx-auto lg:h-full ">
						<div class="my-auto">
						<img
							className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:w-auto object-scale-down"
							src="/img/schedule.png"
							alt="Schedule"
						/>
							<div className="object-scale-down w-full lg:w-auto ">
						<img
								className="m-auto mt-10 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 "

							src="/img/slack_command.png"
							alt="Slack commandr"
						/>
						</div>
						</div>
							</div>
						</div>
					</div>


			<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-flow-col-dense lg:gap-10">
						<div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
							<div>
								<div className="mt-6">
									<h2 className="text-3xl font-extrabold tracking-tight font-boldtext-gray-900">
										Coding is never the issue, it is almost always everything else
									</h2>
									<p className="mt-4 text-lg text-gray-500">
										Not just for developers, the generated Apps are meant to be used by all, and the included Webeditor makes it easy and  gratifying to learn the basics of python scripts
										<br />
										As a dev, you will feel right at home with Windmill. Indeed, most of the concepts used throughout windmill are the ones you are already familiar as a developer:
										- scripts are versioned with their hash with a simplified git lineage<br />
										- deploy from github as part of your CI/CD<br />
										- groups (similar to unix groups)<br />
										- jsonschema to for payload and resources validation/definition<br />
										- permissions are read and write
										- every item is uniquely identified by a clear hierarchic path
										<br />
										Our webeditor is based on Visual Studio code. It uses monaco. In addition, we provide smart assistants such as black, autocompletion and flycheck (with pyright) through our own LSP servers.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1 lg:col-span-2">
							<div className="flex p-4 lg:-ml-4 sm:pr-6 lg:px-0  lg:h-full ">
								<img
									className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5  lg:w-auto m-auto"
									src="/img/editor.png"
									alt="editor"
								/>
							</div>
						</div>
					</div>


			<div className="relative py-16 sm:py-24 lg:py-32">
				<div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
					<h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">Everything in one-platform</h2>
					<p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
						Windmill is a single source of truth to develop, share, and run your internal apps.
					</p>
					<div className="mt-12">
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{features.map((feature) => (
								<div key={feature.name} className="pt-6">
									<div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
										<div className="-mt-6">
											<div>
												<span className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg">
													<feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
												</span>
											</div>
											<h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
											<p className="mt-5 text-base text-gray-500">{feature.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			</div>
	)}


