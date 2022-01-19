import React from 'react';
import clsx from 'clsx';
import Postgres from '../../static/third_party_logos/postgres.svg';
import Mysql from '../../static/third_party_logos/mysql.svg';
import Mongo from '../../static/third_party_logos/mongo.svg';
import Slack from '../../static/third_party_logos/slack.svg';
import Link from '@docusaurus/Link';

export default function HomepageFeatures() {
	return (
		<div className="flex py-12 sm:py-16 px-16 bg-opacity-20 flex-shrink">
			<div className="flex flex-col md:grid md:grid-rows-none md:grid-cols-3 gap-3">
				<div className="flex flex-col items-center text-center md:mt-0">
					<h3 className="text-2xl font-medium">Production grade workflow</h3>
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
				<div className="flex flex-col items-center text-center md:mt-0">
					<h3 className="text-2xl font-medium">UI? Done.</h3>
					<p className="py-3">
						Windmill automatically generates from your code a UI for apps to take in user input and
						makes it very simple to expose your app to non-technical users.
					</p>
				</div>
			</div>
		</div>
	);
}
