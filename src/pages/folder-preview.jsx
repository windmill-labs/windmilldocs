import React from 'react';
import Layout from '@theme/Layout';

const Halo = ({ id }) => (
	<radialGradient id={id} cx="50%" cy="55%" r="55%">
		<stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
		<stop offset="55%" stopColor="#1E40AF" stopOpacity="0.2" />
		<stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
	</radialGradient>
);

const Frame = ({ id, children }) => (
	<svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
		<defs>
			<Halo id={id} />
		</defs>
		<rect width="400" height="225" fill="#0B1220" />
		<circle cx="200" cy="112" r="180" fill={`url(#${id})`} />
		{children}
	</svg>
);

const LogoTile = ({ x, y, size = 40, href, bg = '#F8FAFC' }) => (
	<g transform={`translate(${x} ${y})`}>
		<rect width={size} height={size} rx={size * 0.2} fill={bg} stroke="#60A5FA" strokeOpacity="0.35" strokeWidth="1" />
		<image href={href} x={size * 0.18} y={size * 0.18} width={size * 0.64} height={size * 0.64} preserveAspectRatio="xMidYMid meet" />
	</g>
);

// Variant 1: scattered logos, larger ones center, smaller at edges
const Variant1 = () => (
	<Frame id="h1">
		<LogoTile x={55} y={40} size={34} href="/third_party_logos/slack.svg" />
		<LogoTile x={315} y={40} size={34} href="/third_party_logos/notion.svg" />
		<LogoTile x={40} y={150} size={34} href="/third_party_logos/linear.svg" />
		<LogoTile x={325} y={150} size={34} href="/third_party_logos/stripe.svg" />

		<LogoTile x={120} y={48} size={42} href="/third_party_logos/github.svg" />
		<LogoTile x={245} y={48} size={42} href="/third_party_logos/postgres.svg" />
		<LogoTile x={120} y={135} size={42} href="/third_party_logos/snowflake.svg" />
		<LogoTile x={245} y={135} size={42} href="/third_party_logos/openai.svg" />

		<LogoTile x={180} y={92} size={52} href="/third_party_logos/aws.svg" />
	</Frame>
);

// Variant 2: grid of logos (5x3) evenly distributed
const Variant2 = () => {
	const logos = [
		'/third_party_logos/github.svg',
		'/third_party_logos/slack.svg',
		'/third_party_logos/notion.svg',
		'/third_party_logos/postgres.svg',
		'/third_party_logos/openai.svg',
		'/third_party_logos/stripe.svg',
		'/third_party_logos/snowflake.svg',
		'/third_party_logos/linear.svg',
		'/third_party_logos/hubspot.svg',
		'/third_party_logos/discord.svg',
		'/third_party_logos/mongodb.svg',
		'/third_party_logos/redis.svg',
		'/third_party_logos/anthropic.svg',
		'/third_party_logos/aws.svg',
		'/third_party_logos/gsheets.svg'
	];
	const cols = 5;
	const rows = 3;
	const tileSize = 38;
	const gap = 12;
	const totalW = cols * tileSize + (cols - 1) * gap;
	const totalH = rows * tileSize + (rows - 1) * gap;
	const startX = (400 - totalW) / 2;
	const startY = (225 - totalH) / 2;
	return (
		<Frame id="h2">
			{logos.map((href, i) => {
				const col = i % cols;
				const row = Math.floor(i / cols);
				return <LogoTile key={i} x={startX + col * (tileSize + gap)} y={startY + row * (tileSize + gap)} size={tileSize} href={href} />;
			})}
		</Frame>
	);
};

// Variant 3: central hub with logos orbiting, connection lines
const Variant3 = () => {
	const logos = [
		{ href: '/third_party_logos/github.svg', angle: -90 },
		{ href: '/third_party_logos/slack.svg', angle: -30 },
		{ href: '/third_party_logos/postgres.svg', angle: 30 },
		{ href: '/third_party_logos/openai.svg', angle: 90 },
		{ href: '/third_party_logos/snowflake.svg', angle: 150 },
		{ href: '/third_party_logos/stripe.svg', angle: 210 }
	];
	const cx = 200;
	const cy = 112;
	const orbit = 78;
	const tileSize = 38;
	return (
		<Frame id="h3">
			{logos.map(({ angle }, i) => {
				const rad = (angle * Math.PI) / 180;
				const x = cx + orbit * Math.cos(rad);
				const y = cy + orbit * Math.sin(rad);
				return (
					<line
						key={`l-${i}`}
						x1={cx}
						y1={cy}
						x2={x}
						y2={y}
						stroke="#60A5FA"
						strokeOpacity="0.35"
						strokeWidth="1"
					/>
				);
			})}
			<g>
				<circle cx={cx} cy={cy} r="28" fill="#111C33" stroke="#93C5FD" strokeOpacity="0.6" strokeWidth="1.5" />
				<text
					x={cx}
					y={cy + 6}
					textAnchor="middle"
					fontFamily="ui-monospace, SFMono-Regular, monospace"
					fontSize="16"
					fontWeight="700"
					fill="#93C5FD"
				>
					{'W'}
				</text>
			</g>
			{logos.map(({ href, angle }, i) => {
				const rad = (angle * Math.PI) / 180;
				const x = cx + orbit * Math.cos(rad) - tileSize / 2;
				const y = cy + orbit * Math.sin(rad) - tileSize / 2;
				return <LogoTile key={i} x={x} y={y} size={tileSize} href={href} />;
			})}
		</Frame>
	);
};

// Variant 4: horizontal "marquee" rows, two rows offset
const Variant4 = () => {
	const row1 = [
		'/third_party_logos/github.svg',
		'/third_party_logos/slack.svg',
		'/third_party_logos/postgres.svg',
		'/third_party_logos/openai.svg',
		'/third_party_logos/snowflake.svg'
	];
	const row2 = [
		'/third_party_logos/notion.svg',
		'/third_party_logos/stripe.svg',
		'/third_party_logos/linear.svg',
		'/third_party_logos/hubspot.svg',
		'/third_party_logos/discord.svg'
	];
	const tileSize = 44;
	const gap = 18;
	const rowW = row1.length * tileSize + (row1.length - 1) * gap;
	const startX = (400 - rowW) / 2;
	return (
		<Frame id="h4">
			{row1.map((href, i) => (
				<LogoTile key={`r1-${i}`} x={startX + i * (tileSize + gap)} y={55} size={tileSize} href={href} />
			))}
			{row2.map((href, i) => (
				<LogoTile key={`r2-${i}`} x={startX + i * (tileSize + gap) + (tileSize + gap) / 2} y={125} size={tileSize} href={href} />
			))}
		</Frame>
	);
};

const variants = [
	{ label: '1. Scattered logos with larger center', render: Variant1 },
	{ label: '2. Clean 3x3 grid', render: Variant2 },
	{ label: '3. Central hub with orbiting logos', render: Variant3 },
	{ label: '4. Two offset rows (marquee-style)', render: Variant4 },
];

export default function FolderPreview() {
	return (
		<Layout title="Integrations illustration preview">
			<div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Do not reinvent the wheel — integration logo layouts
				</h1>
				<p className="text-gray-600 dark:text-gray-300 mb-10">
					Four layouts embedding real integration logos into the SVG, on the same dark navy + blue halo.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{variants.map(({ label, render: Render }) => (
						<div key={label}>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{label}</h3>
							<div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5">
								<div className="rounded-lg overflow-hidden aspect-video">
									<Render />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}
