import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import LazyVideo from '../products/LazyVideo';

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5 }
};

const stagger = (delay = 0) => ({
	...fadeIn,
	transition: { duration: 0.5, delay }
});

export default function BuiltForProduction({ variant = 'script' }) {
	const label = variant === 'agent' ? 'agent' : variant === 'app' ? 'app' : variant === 'workflow' ? 'workflow' : 'script';
	const labelCap = variant === 'agent' ? 'Agent' : variant === 'app' ? 'App' : variant === 'workflow' ? 'Workflow' : 'Script';

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
			<motion.div {...fadeIn} className="mb-16">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Built for production
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Every {label} runs within a platform built for enterprise requirements: immutable versioning, role-based access control, full audit trails, SSO and self-hosting. No extra setup needed.
				</p>
			</motion.div>

			{/* Versioning and deploy */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
				<motion.div {...fadeIn}>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Versioning and deploy</h3>
					<p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
						Every {label} version is immutable and addressable by hash. Deploy from the UI, the <Link to="/docs/advanced/cli" className="text-blue-600 dark:text-blue-400 hover:underline">CLI</Link> or <Link to="/docs/advanced/git_sync" className="text-blue-600 dark:text-blue-400 hover:underline">Git sync</Link>. Roll back to any previous version instantly. Sync your workspace with <Link to="/docs/advanced/deploy_gh_gl" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub or GitLab</Link> and use your existing code review workflows.
					</p>
					<Link to="/platform/deployment-versioning" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline">
						<BookOpen className="w-4 h-4" /> Learn more about deployment and versioning
					</Link>
				</motion.div>
				<motion.div {...stagger(0.1)}>
					<LazyVideo
						className="rounded-2xl border border-gray-200 dark:border-gray-700 w-full shadow-lg"
						src="/img/platform/deployment-versioning/platform-deployment-deployment-history.webm"
					/>
				</motion.div>
			</div>

			{/* Observability (reversed) */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
				<motion.div {...stagger(0.1)} className="order-2 md:order-1">
					<LazyVideo
						className="rounded-2xl border border-gray-200 dark:border-gray-700 w-full shadow-lg"
						src="/img/platform/observability/platform-observability-runs-dashboard.webm"
					/>
				</motion.div>
				<motion.div {...fadeIn} className="order-1 md:order-2">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Full observability</h3>
					<p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
						Every run is logged with inputs, outputs, duration and status. Real-time <Link to="/docs/core_concepts/jobs" className="text-blue-600 dark:text-blue-400 hover:underline">execution logs</Link> stream as your {label} runs. Set up <Link to="/docs/core_concepts/error_handling" className="text-blue-600 dark:text-blue-400 hover:underline">error handlers</Link> to send alerts on failure. <Link to="/docs/core_concepts/audit_logs" className="text-blue-600 dark:text-blue-400 hover:underline">Audit trails</Link> track who ran what and when.
					</p>
					<Link to="/platform/observability" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline">
						<BookOpen className="w-4 h-4" /> Learn more about observability
					</Link>
				</motion.div>
			</div>

			{/* RBAC and permissions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
				<motion.div {...fadeIn}>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">RBAC and permissions</h3>
					<p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
						Control who can view, edit and run each {label} with <Link to="/docs/core_concepts/roles_and_permissions" className="text-blue-600 dark:text-blue-400 hover:underline">role-based access control</Link>. Organize {label}s into <Link to="/docs/core_concepts/groups_and_folders" className="text-blue-600 dark:text-blue-400 hover:underline">folders</Link> with group-level permissions. Authenticate users with SSO. Every action is recorded in the audit log.
					</p>
					<Link to="/platform/rbac" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline !no-underline">
						<BookOpen className="w-4 h-4" /> Learn more about RBAC
					</Link>
				</motion.div>
				<motion.div {...stagger(0.1)}>
					<LazyVideo
						className="rounded-2xl border border-gray-200 dark:border-gray-700 w-full shadow-lg"
						src="/img/platform/rbac/platform-rbac-path-based-acl.webm"
					/>
				</motion.div>
			</div>
		</div>
	);
}
