import React, { useEffect } from 'react';
import './CardStyles.css'; // Assuming the css is stored in a file called CardStyles.css

const Card = ({ icon, title, subtitle, gridArea }) => {
	const cardStyle = gridArea ? gridArea : {};

	return (
		<div className="card border shadow-none" style={cardStyle}>
			<div className="card-content">
				<div className="card-image">
					<div className={`fa-duotone ${icon}`}></div>
				</div>
				<div className="card-info-wrapper">
					<div className="card-info">
						<div className={`fa-duotone ${icon}`}></div>
						<div className="card-info-title">
							<h3>{title}</h3>
							<h4>{subtitle}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CardsContainer = () => {
	useEffect(() => {
		const mouseMoveHandler = (e) => {
			for (const card of document.getElementsByClassName('card')) {
				const rect = card.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;

				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
			}
		};

		document.getElementById('cards').addEventListener('mousemove', mouseMoveHandler);

		// Cleanup on unmount
		return () => {
			document.getElementById('cards').removeEventListener('mousemove', mouseMoveHandler);
		};
	}, []);

	return (
		<div className={`w-full h-full  py-16 `}>
			<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full flex-col gap-2">
				<div id="cards">
					<Card icon="fa-apartment" title="Apartments" subtitle="Places to be apart. Wait, what?" />
					<Card
						icon="fa-unicorn"
						title="Unicorns"
						subtitle="A single corn. Er, I mean horn."
						gridArea={{
							gridColumn: '1 / 3',
							gridRow: '1 / 7 '
						}}
					/>
					<Card
						icon="fa-blender-phone"
						title="Blender Phones"
						subtitle="These absolutely deserve to exist."
					/>
					<Card icon="fa-apartment" title="Apartments" subtitle="Places to be apart. Wait, what?" />
					<Card icon="fa-unicorn" title="Unicorns" subtitle="A single corn. Er, I mean horn." />
				</div>
			</div>
		</div>
	);
};

export default CardsContainer;
