import React from 'react';
import Layout from '@theme/Layout';

const Halo = ({ id }) => (
	<radialGradient id={id} cx="50%" cy="55%" r="55%">
		<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
		<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
		<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
	</radialGradient>
);

const KeyGradDef = () => (
	<linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
		<stop offset="0%" stopColor="#DBEAFE" />
		<stop offset="100%" stopColor="#60A5FA" />
	</linearGradient>
);

const Dots = ({ startX, y, count = 8, r = 4.5, spacing = 16 }) =>
	Array.from({ length: count }).map((_, i) => (
		<circle key={i} cx={startX + i * spacing} cy={y} r={r} fill="#93C5FD" />
	));

const Frame = ({ id, children }) => (
	<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<defs>
			<Halo id={id} />
			<KeyGradDef />
		</defs>
		<rect width="400" height="225" fill="#0B1220" />
		<circle cx="200" cy="112" r="180" fill={`url(#${id})`} />
		{children}
	</svg>
);

// Design A: vertical key (head on top)
const KeyA = () => (
	<g transform="translate(118 60)">
		<circle cx="22" cy="22" r="18" fill="url(#keyGrad)" />
		<circle cx="22" cy="22" r="7" fill="#0B1220" />
		<rect x="17" y="40" width="10" height="52" rx="5" fill="url(#keyGrad)" />
		<rect x="27" y="62" width="10" height="6" rx="2" fill="url(#keyGrad)" />
		<rect x="27" y="74" width="14" height="6" rx="2" fill="url(#keyGrad)" />
	</g>
);

// Design B: rounded-square head key (modern, boxy)
const KeyB = () => (
	<g transform="translate(95 90)">
		<rect x="0" y="0" width="44" height="44" rx="12" fill="url(#keyGrad)" />
		<circle cx="22" cy="22" r="7" fill="#0B1220" />
		<rect x="44" y="17" width="56" height="10" rx="5" fill="url(#keyGrad)" />
		<rect x="88" y="27" width="8" height="14" rx="4" fill="url(#keyGrad)" />
	</g>
);

// Design C: outline-only traditional key (no fills, just strokes)
const KeyC = () => (
	<g transform="translate(100 92)" fill="none" stroke="url(#keyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="20" cy="20" r="16" />
		<line x1="36" y1="20" x2="96" y2="20" />
		<line x1="82" y1="20" x2="82" y2="32" />
		<line x1="94" y1="20" x2="94" y2="30" />
	</g>
);

// Design D: padlock
const KeyD = () => (
	<g transform="translate(115 78)">
		<path d="M 10 24 Q 10 6 28 6 Q 46 6 46 24 L 46 38" fill="none" stroke="url(#keyGrad)" strokeWidth="5" strokeLinecap="round" />
		<rect x="0" y="34" width="56" height="44" rx="10" fill="url(#keyGrad)" />
		<circle cx="28" cy="52" r="5" fill="#0B1220" />
		<rect x="26" y="52" width="4" height="14" rx="1.5" fill="#0B1220" />
	</g>
);

// Design E: keychain tag (luggage-tag style)
const KeyE = () => (
	<g transform="translate(105 78)">
		<path d="M 12 0 L 70 0 Q 78 0 82 6 L 96 26 Q 100 32 96 38 L 82 58 Q 78 64 70 64 L 12 64 Q 2 64 2 54 L 2 10 Q 2 0 12 0 Z" fill="url(#keyGrad)" />
		<circle cx="78" cy="32" r="6" fill="#0B1220" />
	</g>
);

const variants = [
	{ label: 'A. Vertical key (head on top)', key: KeyA },
	{ label: 'B. Rounded-square head key (modern)', key: KeyB },
	{ label: 'C. Outline-only traditional key', key: KeyC },
	{ label: 'D. Padlock', key: KeyD },
	{ label: 'E. Keychain tag', key: KeyE }
];

export default function FolderPreview() {
	return (
		<Layout title="Resources illustration preview">
			<div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Resources card — credential icon options
				</h1>
				<p className="text-gray-600 dark:text-gray-300 mb-10">
					Five alternative credential icons, each paired with the same masked dots.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{variants.map(({ label, key: KeyDesign }, i) => (
						<div key={label}>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{label}</h3>
							<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
								<div className="rounded-lg overflow-hidden aspect-video">
									<Frame id={`halo-${i}`}>
										<KeyDesign />
										<Dots startX={225} y={112} count={8} />
									</Frame>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
