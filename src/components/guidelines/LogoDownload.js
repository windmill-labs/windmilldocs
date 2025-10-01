import React from 'react';

const LogoDownload = ({ logos }) => {
	const downloadSVG = async (url, filename) => {
		try {
			const response = await fetch(url);
			const svgContent = await response.text();

			const blob = new Blob([svgContent], { type: 'image/svg+xml' });
			const downloadUrl = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			URL.revokeObjectURL(downloadUrl);
		} catch (error) {
			console.error('Error downloading SVG:', error);
		}
	};

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
				gap: '24px',
				marginBottom: '32px'
			}}
		>
			{logos.map((logo, index) => (
				<div
					key={index}
					style={{
						border: '1px solid #e2e8f0',
						borderRadius: '8px',
						padding: '24px',
						textAlign: 'center',
						backgroundColor: logo.background || '#ffffff'
					}}
				>
					<div
						style={{
							width: '120px',
							height: '120px',
							margin: '0 auto 16px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<img
							src={logo.url}
							alt={`Windmill logo ${logo.variant}`}
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
								objectFit: 'contain'
							}}
						/>
					</div>
					<div
						style={{
							fontSize: '14px',
							fontWeight: '600',
							marginBottom: '8px',
							color: '#2d3748'
						}}
					>
						{logo.variant}
					</div>
					<div
						style={{
							fontSize: '12px',
							color: '#718096',
							marginBottom: '16px'
						}}
					>
						{logo.description}
					</div>
					<button
						onClick={() => downloadSVG(logo.url, logo.filename)}
						style={{
							backgroundColor: '#758ff8',
							color: 'white',
							border: 'none',
							borderRadius: '6px',
							padding: '8px 16px',
							fontSize: '12px',
							fontWeight: '500',
							cursor: 'pointer',
							transition: 'background-color 0.2s'
						}}
						onMouseOver={(e) => e.target.style.backgroundColor = '#5074f6'}
						onMouseOut={(e) => e.target.style.backgroundColor = '#758ff8'}
					>
						Download SVG
					</button>
				</div>
			))}
		</div>
	);
};

export default LogoDownload;