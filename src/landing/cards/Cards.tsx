import { Aperture, Activity, Smartphone, ArrowLeft, ArrowRight, Octagon } from 'lucide-react';
import React from 'react';

import './CardStyles.css';

const cards = [
	{
		title: 'Apartments',
		subtitle: 'Places to be apart. Wait, what?',
		icon: <Aperture size={80} />
	},
	{
		title: 'Unicorns',
		subtitle: 'A single corn. Er, I mean horn.',
		icon: <Activity size={80} />
	},
	{
		title: 'Blender Phones',
		subtitle: 'These absolutely deserve to exist.',
		icon: <Smartphone size={80} />
	},
	{
		title: 'Adios',
		subtitle: 'See you...',
		icon: <ArrowLeft size={80} />
	},
	{
		title: 'I mean hello',
		subtitle: '...over here.',
		icon: <ArrowRight size={80} />
	},
	{
		title: 'Otters',
		subtitle: 'Look at me, imma cute lil fella.',
		icon: <Octagon size={80} />
	}
];

const LandingPage = () => {
	const handleMouseMove = (e, index) => {
		const card = document.getElementById(`card-${index}`);
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	};

	return (
		<div id="cards">
			{cards.map((card, index) => (
				<div
					key={index}
					id={`card-${index}`}
					className="landing-page-card"
					onMouseMove={(e) => handleMouseMove(e, index)}
				>
					<div className="card-content">
						<div className="card-image">{card.icon}</div>
						<div className="card-info-wrapper">
							<div className="card-info">
								{card.icon}
								<div className="card-info-title">
									<h3>{card.title}</h3>
									<h4>{card.subtitle}</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default LandingPage;
