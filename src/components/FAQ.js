import React from 'react';
import clsx from 'clsx';
import styles from './FAQ.module.css';

export default function FAQ() {
	return (
		<div className="w-full items-center m-auto mb-12">
			<h2 className="pb-3 text-2xl font-medium align-middle text-center">FAQ</h2>
			<div className="flex flex-col px-16 md:px-42 lg:px-56">
				<h3 className={styles.question}>
					I'm not a developer. What does Windmill bring to my business?
				</h3>
				<p className={styles.answer}>
					Businesses need to automate internal workflows (for example, renewing a user license key
					and sending an email) to be efficient and scalable. In many companies, developers write
					quick and dirty scripts to automate repetitive tasks, but these scripts never make it to
					production and never get widespread adoption. <br /> <br />
					Developers face a choice : keep the script for themselves - creating bottlenecks for the
					business - or spend a lot of time to make it usable by other employees - a big waste of
					developer productivity. What if you could immediately turn these quick and dirty scripts
					into internal apps with user interfaces, workflows and permissioning? <br />
					<br />
					What if automation could flow from developers to the entire company? Windmill is a
					developer-first platform that quickly turns scripts into user-friendly internal apps,
					enabling companies to automate and scale internal workflows.
				</p>

				<h3 className={styles.question}>Is Windmill a no-code platform?</h3>
				<p className={styles.answer}>
					No. We believe that writing code is the most efficient way to build internal apps, for
					several reasons:
					<ul className="list-disc mx-12">
						<li>
							It is maintainable, versioned, and standard (any developer can read and fix a script).
							That's not the case with UI builders, that tend do create tech debt.
						</li>
						<li>
							It is not bottlenecked by the limitations of a platform (missing connectors, etc).
						</li>
						<li>
							Developers can rely on a gigantic amount of open source libraries to write code.
						</li>
					</ul>
					However, there are part of building internal apps that are painful and not worth a
					developer's time: building UI, workflows, permissions. Windmill removes those time sinks.
				</p>
			</div>
		</div>
	);
}
