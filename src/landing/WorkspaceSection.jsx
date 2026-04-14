import React from 'react';
import Link from '@docusaurus/Link';

export default function WorkspaceSection() {
	return (
		<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
			<div className="mb-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Shared workspaces to orchestrate, scope and secure your team's work
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Everything your team builds lives in <Link to="/platform/rbac">workspaces</Link> with granular permissions, shared resources and built-in databases.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Roles and permissions
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Built-in roles from operator to superadmin. Organize with groups and folders, control who can build or execute thanks to <Link to="/platform/rbac" className="text-blue-600 dark:text-blue-400 hover:underline">path-based ACLs</Link>.
					</p>
					<div className="rounded-lg overflow-hidden aspect-video">
						<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
							<defs>
								<radialGradient id="rbacHalo" cx="50%" cy="55%" r="55%">
									<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
									<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
									<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
								</radialGradient>
								<linearGradient id="rbacBack" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#1E3A8A" />
									<stop offset="100%" stopColor="#0F172A" />
								</linearGradient>
								<linearGradient id="rbacFront" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#3B82F6" />
									<stop offset="100%" stopColor="#1E40AF" />
								</linearGradient>
								<radialGradient id="rbacGlow" cx="50%" cy="50%" r="50%">
									<stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.9" />
									<stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
								</radialGradient>
								<linearGradient id="rbacChip" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#DBEAFE" />
									<stop offset="100%" stopColor="#60A5FA" />
								</linearGradient>
							</defs>

							<rect width="400" height="225" fill="#0B1220" />
							<circle cx="200" cy="112" r="180" fill="url(#rbacHalo)" />

							<g transform="translate(127 55)">
								<path
									d="M 8 18 Q 8 8 18 8 L 48 8 Q 53 8 56 12 L 63 20 L 128 20 Q 138 20 138 30 L 138 92 L 8 92 Z"
									fill="url(#rbacBack)"
									stroke="#93C5FD"
									strokeOpacity="0.6"
									strokeWidth="1"
								/>
								<circle cx="73" cy="50" r="42" fill="url(#rbacGlow)" />
								<g transform="translate(46 34)">
									<rect width="54" height="30" rx="6" fill="url(#rbacChip)" />
									<circle cx="12" cy="15" r="5" fill="#1E40AF" opacity="0.55" />
									<rect x="22" y="10" width="26" height="3" rx="1.5" fill="#1E40AF" opacity="0.5" />
									<rect x="22" y="17" width="18" height="3" rx="1.5" fill="#1E40AF" opacity="0.4" />
								</g>
								<path
									d="M 2 54 L 144 54 Q 149 54 148 60 L 136 104 Q 134 112 124 112 L 22 112 Q 12 112 10 104 L -2 60 Q -3 54 2 54 Z"
									fill="url(#rbacFront)"
									stroke="#93C5FD"
									strokeWidth="1"
								/>
							</g>
						</svg>
					</div>
				</div>
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Resources
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Share API keys, credentials and connections across your team. Encrypted at rest, scoped by folder, accessible only to authorized users.
					</p>
					<div className="rounded-lg overflow-hidden aspect-video">
						<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
							<defs>
								<radialGradient id="resHalo" cx="50%" cy="55%" r="55%">
									<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
									<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
									<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
								</radialGradient>
								<linearGradient id="resLock" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#DBEAFE" />
									<stop offset="100%" stopColor="#60A5FA" />
								</linearGradient>
							</defs>

							<rect width="400" height="225" fill="#0B1220" />
							<circle cx="200" cy="112" r="180" fill="url(#resHalo)" />

							<g transform="translate(110 54) scale(0.55)">
								<path d="M 10 24 Q 10 6 28 6 Q 46 6 46 24 L 46 38" fill="none" stroke="url(#resLock)" strokeWidth="6" strokeLinecap="round" />
								<rect x="0" y="34" width="56" height="44" rx="10" fill="url(#resLock)" />
								<circle cx="28" cy="52" r="5" fill="#0B1220" />
								<rect x="26" y="52" width="4" height="14" rx="1.5" fill="#0B1220" />
							</g>
							{Array.from({ length: 10 }).map((_, i) => (
								<circle key={`r1-${i}`} cx={155 + i * 14} cy={78} r={4} fill="#93C5FD" />
							))}

							<g transform="translate(110 129) scale(0.55)">
								<path d="M 10 24 Q 10 6 28 6 Q 46 6 46 24 L 46 38" fill="none" stroke="url(#resLock)" strokeWidth="6" strokeLinecap="round" />
								<rect x="0" y="34" width="56" height="44" rx="10" fill="url(#resLock)" />
								<circle cx="28" cy="52" r="5" fill="#0B1220" />
								<rect x="26" y="52" width="4" height="14" rx="1.5" fill="#0B1220" />
							</g>
							{Array.from({ length: 10 }).map((_, i) => (
								<circle key={`r2-${i}`} cx={155 + i * 14} cy={153} r={4} fill="#93C5FD" opacity="0.75" />
							))}
						</svg>
					</div>
				</div>
				<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Databases
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Set up <Link to="/platform/datatables" className="text-blue-600 dark:text-blue-400 hover:underline">PostgreSQL databases</Link> at the workspace level so team members can build scripts, workflows and apps on top of shared data.
					</p>
					<div className="rounded-lg overflow-hidden aspect-video">
						<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
							<defs>
								<radialGradient id="dbHalo" cx="50%" cy="55%" r="55%">
									<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
									<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
									<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
								</radialGradient>
								<linearGradient id="dbTable" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.85" />
									<stop offset="100%" stopColor="#111827" stopOpacity="0.95" />
								</linearGradient>
							</defs>

							<rect width="400" height="225" fill="#0B1220" />
							<circle cx="200" cy="112" r="180" fill="url(#dbHalo)" />

							<g transform="translate(130 52)">
								<rect width="140" height="120" rx="10" fill="url(#dbTable)" stroke="#3B82F6" strokeWidth="1" />
								<rect width="140" height="24" rx="10" fill="#3B82F6" opacity="0.25" />
								<rect y="14" width="140" height="10" fill="#3B82F6" opacity="0.25" />

								<line x1="60" y1="0" x2="60" y2="120" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />
								<line x1="100" y1="0" x2="100" y2="120" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />

								<line x1="0" y1="48" x2="140" y2="48" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />
								<line x1="0" y1="72" x2="140" y2="72" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />
								<line x1="0" y1="96" x2="140" y2="96" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />

								<circle cx="30" cy="60" r="2.5" fill="#93C5FD" />
								<rect x="70" y="58" width="20" height="4" rx="2" fill="#60A5FA" opacity="0.7" />
								<rect x="108" y="58" width="24" height="4" rx="2" fill="#60A5FA" opacity="0.5" />

								<circle cx="30" cy="84" r="2.5" fill="#93C5FD" />
								<rect x="70" y="82" width="16" height="4" rx="2" fill="#60A5FA" opacity="0.7" />
								<rect x="108" y="82" width="18" height="4" rx="2" fill="#60A5FA" opacity="0.5" />

								<circle cx="30" cy="108" r="2.5" fill="#93C5FD" />
								<rect x="70" y="106" width="22" height="4" rx="2" fill="#60A5FA" opacity="0.7" />
								<rect x="108" y="106" width="20" height="4" rx="2" fill="#60A5FA" opacity="0.5" />
							</g>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
