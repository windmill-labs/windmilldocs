import React, { useRef, useEffect, useCallback } from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCTAButtons from '../components/products/HeroCTAButtons';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import LaunchWeekList from '../components/LaunchWeekList';

function ParticleField() {
	const canvasRef = useRef(null);
	const animRef = useRef(null);
	const particlesRef = useRef([]);
	const mouseRef = useRef({ x: -1000, y: -1000 });
	const { colorMode } = useColorMode();

	const initParticles = useCallback((width, height) => {
		const count = Math.floor((width * height) / 8000);
		return Array.from({ length: Math.min(count, 200) }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.2 : -0.2),
			vy: (Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.2 : -0.2),
			r: Math.random() * 2 + 0.5,
			opacity: Math.random() * 0.5 + 0.2,
		}));
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');

		const resize = () => {
			const rect = canvas.parentElement.getBoundingClientRect();
			canvas.width = rect.width * window.devicePixelRatio;
			canvas.height = rect.height * window.devicePixelRatio;
			canvas.style.width = rect.width + 'px';
			canvas.style.height = rect.height + 'px';
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			particlesRef.current = initParticles(rect.width, rect.height);
		};

		const onMouse = (e) => {
			const rect = canvas.getBoundingClientRect();
			mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		};
		const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

		resize();
		window.addEventListener('resize', resize);
		canvas.addEventListener('mousemove', onMouse);
		canvas.addEventListener('mouseleave', onLeave);

		const draw = () => {
			const w = canvas.width / window.devicePixelRatio;
			const h = canvas.height / window.devicePixelRatio;
			ctx.clearRect(0, 0, w, h);

			const particles = particlesRef.current;
			const isDark = colorMode === 'dark';
			const baseColor = isDark ? [96, 165, 250] : [59, 130, 246]; // blue-400 / blue-500
			const mouse = mouseRef.current;
			const connectionDist = 120;

			// Update positions
			for (const p of particles) {
				// Mouse repulsion
				const dx = p.x - mouse.x;
				const dy = p.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 150 && dist > 0) {
					const force = (150 - dist) / 150 * 0.8;
					p.vx += (dx / dist) * force;
					p.vy += (dy / dist) * force;
				}

				p.x += p.vx;
				p.y += p.vy;

				// Wrap
				if (p.x < 0) p.x = w;
				if (p.x > w) p.x = 0;
				if (p.y < 0) p.y = h;
				if (p.y > h) p.y = 0;
			}

			// Draw connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < connectionDist) {
						const alpha = (1 - dist / connectionDist) * 0.15;
						ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha})`;
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			// Draw particles
			for (const p of particles) {
				// Glow
				const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
				gradient.addColorStop(0, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${p.opacity * 0.3})`);
				gradient.addColorStop(1, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`);
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
				ctx.fill();

				// Core
				ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${p.opacity})`;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}

			animRef.current = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			cancelAnimationFrame(animRef.current);
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('mousemove', onMouse);
			canvas.removeEventListener('mouseleave', onLeave);
		};
	}, [colorMode, initParticles]);

	return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = (delay = 0) => ({
	...fadeIn,
	transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const days = [
	{
		day: 1,
		weekday: 'Monday',
		date: 'Mar 30',
		releaseDate: new Date('2026-03-30T00:00:00'),
		title: 'Full code apps',
		description: 'Build complete applications with React and Svelte frontends connected to backend logic.',
		href: '/blog/launch-week-full-code-apps',
	},
	{
		day: 2,
		weekday: 'Tuesday',
		date: 'Mar 31',
		releaseDate: new Date('2026-03-31T00:00:00'),
		title: 'Data tables & Ducklake',
		description: 'Store and query relational data with managed SQL, powered by Ducklake.',
		href: '/blog/launch-week-data-tables-ducklake',
	},
	{
		day: 3,
		weekday: 'Wednesday',
		date: 'Apr 1',
		releaseDate: new Date('2026-04-01T00:00:00'),
		title: 'AI sandboxes',
		description: 'Run Claude Code, Codex, or custom agents in isolated environments with persistent volumes.',
		href: '/blog/launch-week-ai-sandboxes',
	},
	{
		day: 4,
		weekday: 'Thursday',
		date: 'Apr 2',
		releaseDate: new Date('2026-04-02T00:00:00'),
		title: 'Git sync & workspace forks',
		description: 'Sync with Git, stage workspaces, and deploy via CI/CD with an improved deploy interface.',
		href: '/blog/launch-week-git-sync',
	},
	{
		day: 5,
		weekday: 'Friday',
		date: 'Apr 3',
		releaseDate: new Date('2026-04-03T00:00:00'),
		title: 'Workflow-as-code',
		description: 'Define complex workflows entirely in code with the next generation of our SDK.',
		href: '/blog/launch-week-workflow-as-code',
	},
];

const cardVisuals = [
	// Day 1: Full code apps - layered rectangles
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.15" />
				</linearGradient>
			</defs>
			<rect x="25" y="40" width="130" height="90" rx="10" fill="none" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<rect x="45" y="60" width="130" height="90" rx="10" fill="none" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="1.5" />
			<rect x="65" y="80" width="130" height="90" rx="10" fill="url(#g1)" />
		</svg>
	),
	// Day 2: Data tables - grid pattern
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
				</linearGradient>
			</defs>
			{Array.from({ length: 5 }, (_, i) =>
				Array.from({ length: 5 }, (_, j) => (
					<rect key={`${i}-${j}`} x={25 + j * 32} y={25 + i * 32} width="24" height="24" rx="4" fill="url(#g2)" />
				))
			)}
		</svg>
	),
	// Day 3: Sandboxes - concentric circles
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<radialGradient id="g3" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
				</radialGradient>
			</defs>
			{[80, 60, 40, 20].map((r, i) => (
				<circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#3b82f6" strokeOpacity={0.2 + i * 0.15} strokeWidth="1.5" />
			))}
			<circle cx="100" cy="100" r="10" fill="url(#g3)" />
		</svg>
	),
	// Day 4: Git sync - branching lines
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<path d="M100 20 L100 180" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="2" fill="none" />
			<path d="M100 60 Q135 60 145 95 L145 135" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
			<path d="M100 110 Q65 110 55 140 L55 170" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
			<circle cx="100" cy="60" r="6" fill="#3b82f6" fillOpacity="0.5" />
			<circle cx="100" cy="110" r="6" fill="#3b82f6" fillOpacity="0.5" />
			<circle cx="145" cy="135" r="6" fill="#60a5fa" fillOpacity="0.4" />
			<circle cx="55" cy="170" r="6" fill="#60a5fa" fillOpacity="0.4" />
			<circle cx="100" cy="180" r="6" fill="#3b82f6" fillOpacity="0.3" />
		</svg>
	),
	// Day 5: Workflow-as-code - connected nodes
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.25" />
				</linearGradient>
			</defs>
			<line x1="55" y1="45" x2="145" y2="45" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="145" y1="45" x2="145" y2="100" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="145" y1="100" x2="55" y2="100" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="55" y1="100" x2="55" y2="155" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="55" y1="155" x2="145" y2="155" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			{[[55, 45], [145, 45], [145, 100], [55, 100], [55, 155], [145, 155]].map(([x, y], i) => (
				<rect key={i} x={x - 10} y={y - 10} width="20" height="20" rx="4" fill="url(#g5)" />
			))}
		</svg>
	),
];

function DayCard({ item, index }) {
	const Visual = cardVisuals[index];
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const disabled = item.releaseDate > now;

	const content = (
		<>
			<div className={`flex items-center justify-center p-8 aspect-square ${disabled ? 'opacity-40 grayscale' : ''}`}>
				<Visual />
			</div>
			<div className="mt-auto p-5">
				<span className="text-sm text-gray-400 dark:text-gray-500 mb-2 block">
					{item.weekday}
				</span>
				<h3 className={`text-base font-semibold leading-snug min-h-[2.5rem] ${disabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>
					{disabled ? item.title : `Introducing ${item.title}`}
				</h3>
			</div>
		</>
	);

	return (
		<motion.div className="flex" {...stagger(index * 0.08)}>
			{disabled ? (
				<div className="flex flex-col w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-hidden cursor-default">
					{content}
				</div>
			) : (
				<Link
					to={item.href}
					className="group flex flex-col w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 !no-underline hover:text-current hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
				>
					{content}
				</Link>
			)}
		</motion.div>
	);
}

export default function LaunchWeekPage() {
	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: 'Windmill launch week',
		description:
			'Five major releases in one week: full code apps, data tables, AI sandboxes, Git sync v2, and workflow-as-code v2.',
		startDate: '2026-03-30',
		endDate: '2026-04-03',
		eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
		location: {
			'@type': 'VirtualLocation',
			url: 'https://www.windmill.dev/launch-week-march-2026',
		},
		organizer: {
			'@type': 'Organization',
			name: 'Windmill',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.windmill.dev/img/windmill.svg',
			},
		},
	};

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Launch week | Windmill</title>
					<meta name="title" content="Launch week | Windmill" />
					<meta
						name="description"
						content="What is new in Windmill? Five major releases in one week: full code apps, data tables, AI sandboxes, Git sync v2, and workflow-as-code v2."
					/>
					<link rel="icon" href="/img/logo.svg" />
					<script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
				</Head>

				<div className="pt-32">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
						{/* Hero with particle animation */}
						<div className="relative mb-20">
							<div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden" style={{ height: '100%' }}>
								<BrowserOnly fallback={<div />}>
									{() => <ParticleField />}
								</BrowserOnly>
							</div>
							<motion.div className="relative z-10 py-8" {...fadeIn}>
								<p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
									March 30 to April 3, 2026
								</p>
								<div className="font-bold tracking-tighter text-gray-900 dark:text-white" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.9 }}>
									Launch week #2
								</div>
								<p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
									Five days, five releases. Full-code apps, data tables, AI sandboxes, Git sync and workflow-as-code.
								</p>
							</motion.div>
						</div>

						{/* Highlighted features */}
						<motion.div className="mb-6" {...stagger(0.1)}>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">
								Highlighted features
							</div>
						</motion.div>

						{/* Day cards */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
							{days.map((day, index) => (
								<DayCard key={day.day} item={day} index={index} />
							))}
						</div>

						{/* Other features */}
						<motion.div className="mt-24" {...stagger(0.3)}>
							<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
								<div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
										Other features
									</div>
									<p className="text-sm text-gray-400 dark:text-gray-500">
										A collection of recent releases and improvements.
									</p>
								</div>
								<div className="border-t border-gray-200 dark:border-gray-800">
									{[
										{ title: 'GitHub Enterprise app integration', href: '/changelog/github-enterprise-app' },
										{ title: 'Private registries for npm, Maven and Cargo', href: '/changelog/private-registries-npm-maven-cargo' },
										{ title: 'Native triggers', href: '/changelog/native-triggers' },
										{ title: 'Infrastructure as code', href: '/changelog/infrastructure-as-code' },
									].map((item, i) => (
										<Link
											key={i}
											to={item.href}
											className="group flex items-center gap-3 py-4 border-b border-gray-200 dark:border-gray-800 !no-underline hover:text-current"
										>
											<span className="w-1.5 h-1.5 rounded-sm bg-gray-300 dark:bg-gray-600 shrink-0" />
											<span className="text-base text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
												{item.title}
											</span>
										</Link>
									))}
								</div>
							</div>
						</motion.div>

						<LaunchWeekList current="/launch-week-march-2026" />

						{/* CTA */}
						<motion.div className="mt-24 text-center" {...stagger(0.6)}>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
								Try these features today
							</h2>
							<div className="flex justify-center">
								<HeroCTAButtons />
							</div>
						</motion.div>
					</div>
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
