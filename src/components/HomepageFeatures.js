import React from 'react';
import clsx from 'clsx';
import Postgres from '../../static/third_party_logos/postgres.svg';
import Mysql from '../../static/third_party_logos/mysql.svg';
import Mongo from '../../static/third_party_logos/mongo.svg';
import Slack from '../../static/third_party_logos/slack.svg';
import Link from '@docusaurus/Link';
import { InboxIcon, SparklesIcon } from '@heroicons/react/outline'

export default function HomepageFeatures() {
	return (
		<div>
			<div className="relative bg-white pt-16 pb-32 overflow-hidden">
				<div className="relative">
					<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense ">
						<div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
							<div>
								<div className="mt-6">
									<h2 className="text-3xl font-boldtext-gray-900">
										UI is automatically generated from your script parameters
									</h2>
									<p className="mt-4 text-lg text-gray-500">
										The arguments of your main function are parsed with their names, types 
										and default parameters to build an App UI automatically. An argument without a default parameter
										is inferred to be required. All python types have dedicated form fields, even complex ones like bytes,
										(generate a file upload field), datetimes or lists.<br/><br/>

										The automatically generated UI can then be customised with description and extra form field narrowing. <br/><br/>
										<span className='font-bold'>The generated UI makes it very simple to expose your app to non-technical users while 
										not requiring any effort from the script author.</span>
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12 sm:mt-16 lg:mt-0">
							<div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
								<img
									className="w-full  lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
									src="/img/parser.png"
									alt="UI parser"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex py-12 sm:py-16 px-16 bg-opacity-20 flex-shrink">
				<div className="flex flex-col md:grid md:grid-rows-none md:grid-cols-2 gap-3">
					<div className="flex flex-col items-center text-center md:mt-0">
						<h3 className="text-2xl font-medium">Production grade workflows</h3>
						<p className="py-3">
							Windmill is a single source of truth to develop, share, and run your internal apps.
						</p>
						<ul>
							<li>
								<Link to="/docs/reference#variable">Variables</Link> &{' '}
								<Link to="/docs/reference#secret-variable">Secrets</Link>
							</li>
							<li>
								<Link to="/docs/reference#permissions-and-acl">Permissions</Link>
							</li>
							<li>
								<Link to="/docs/reference#versioning">Versioning</Link>
							</li>
							<li>
								<Link to="/docs/reference#audit-log">Audit logs</Link>
							</li>
							<li>
								<Link to="/docs/reference#schedule">Schedule scripts</Link>
							</li>
							<li>
								<Link to="/docs/reference#webhook">Expose scripts as webhooks</Link>
							</li>
							<li>
								<Link to="/docs/reference">And many more!</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col items-center text-center mt-2 md:mt-0">
						<h3 className="text-2xl font-medium">Connect to any API</h3>
						<p className="py-3">
							Any python library becomes a connector. <br />
							Common connectors are available by default, write your own in minutes. Windmill is
							generic and powerful: replace many niche tooling that only few truly masters with one
							that can do everything, that require no knowledge as an app user and that has an easy
							learning curve for script authors, it only require to know the basics of{' '}
							<a href="https://www.python.org/">Python</a>.
						</p>
						<div className="flex flex-row gap-4">
							<Postgres />
							<Mysql />
							<Mongo />
							<Slack />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
