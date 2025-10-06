import React, { useState } from 'react';

const LogoDownload = ({ logos }) => {
	const [downloadStatus, setDownloadStatus] = useState({});

	const downloadSVG = async (url, filename) => {
		setDownloadStatus(prev => ({ ...prev, [filename]: 'downloading' }));

		try {
			// First, try the modern fetch + blob approach
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'image/svg+xml,*/*'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const svgContent = await response.text();

			// Create blob with explicit MIME type
			const blob = new Blob([svgContent], {
				type: 'image/svg+xml;charset=utf-8'
			});

			// Try modern download API first (Chrome supports this)
			if (window.showSaveFilePicker) {
				try {
					const fileHandle = await window.showSaveFilePicker({
						suggestedName: filename,
						types: [{
							description: 'SVG files',
							accept: { 'image/svg+xml': ['.svg'] }
						}]
					});
					const writable = await fileHandle.createWritable();
					await writable.write(blob);
					await writable.close();
					setDownloadStatus(prev => ({ ...prev, [filename]: 'success' }));
					return;
				} catch (err) {
					// User cancelled the save dialog
					if (err.name === 'AbortError') {
						setDownloadStatus(prev => ({ ...prev, [filename]: null }));
						return; // Don't proceed with fallback if user cancelled
					}
					// API failed, fall back to traditional method
					console.log('File System API failed, using fallback:', err);
				}
			}

			// Fallback: Traditional blob download (works in Chrome)
			const downloadUrl = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = filename;
			link.style.display = 'none';

			// Ensure the link is properly attached before clicking
			document.body.appendChild(link);

			// Use setTimeout to ensure Chrome processes the DOM change
			setTimeout(() => {
				try {
					link.click();
					setDownloadStatus(prev => ({ ...prev, [filename]: 'success' }));
				} catch (clickError) {
					console.error('Click failed:', clickError);
					// Final fallback: open in new tab
					window.open(downloadUrl, '_blank');
					setDownloadStatus(prev => ({ ...prev, [filename]: 'opened' }));
				}

				// Cleanup
				setTimeout(() => {
					document.body.removeChild(link);
					URL.revokeObjectURL(downloadUrl);
				}, 100);
			}, 50);

		} catch (error) {
			console.error('Error downloading SVG:', error);
			setDownloadStatus(prev => ({ ...prev, [filename]: 'error' }));

			// Ultimate fallback: direct navigation to file
			try {
				window.open(url, '_blank');
				setDownloadStatus(prev => ({ ...prev, [filename]: 'opened' }));
			} catch (fallbackError) {
				console.error('All download methods failed:', fallbackError);
			}
		}

		// Reset status after a delay
		setTimeout(() => {
			setDownloadStatus(prev => ({ ...prev, [filename]: null }));
		}, 3000);
	};

	const getButtonColor = (status) => {
		switch (status) {
			case 'downloading':
				return '#9CA3AF';
			case 'success':
				return '#10B981';
			case 'error':
				return '#EF4444';
			case 'opened':
				return '#F59E0B';
			default:
				return '#758ff8';
		}
	};

	const getButtonText = (status) => {
		switch (status) {
			case 'downloading':
				return 'Downloading...';
			case 'success':
				return 'Downloaded!';
			case 'error':
				return 'Failed - Try Again';
			case 'opened':
				return 'Opened in Tab';
			default:
				return 'Download SVG';
		}
	};

	const getTextColors = (background) => {
		// Determine if background is dark based on color value
		const isDarkBackground = background === '#2d3748' ||
								 background.toLowerCase().includes('dark') ||
								 (background.startsWith('#') && parseInt(background.slice(1), 16) < 0x808080);

		if (isDarkBackground) {
			return {
				title: '#f3f4f6',     // text-emphasis for dark backgrounds
				description: '#aab0bb' // text-secondary for dark backgrounds
			};
		} else {
			return {
				title: '#2d3748',     // text-emphasis for light backgrounds
				description: '#718096' // text-secondary for light backgrounds
			};
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
			{logos.map((logo, index) => {
				const textColors = getTextColors(logo.background);
				return (
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
								color: textColors.title
							}}
						>
							{logo.variant}
						</div>
						<div
							style={{
								fontSize: '12px',
								color: textColors.description,
								marginBottom: '16px'
							}}
						>
							{logo.description}
						</div>
					<button
						onClick={() => downloadSVG(logo.url, logo.filename)}
						disabled={downloadStatus[logo.filename] === 'downloading'}
						style={{
							backgroundColor: getButtonColor(downloadStatus[logo.filename]),
							color: 'white',
							border: 'none',
							borderRadius: '6px',
							padding: '8px 16px',
							fontSize: '12px',
							fontWeight: '500',
							cursor: downloadStatus[logo.filename] === 'downloading' ? 'not-allowed' : 'pointer',
							transition: 'background-color 0.2s',
							opacity: downloadStatus[logo.filename] === 'downloading' ? 0.7 : 1
						}}
						onMouseOver={(e) => {
							if (downloadStatus[logo.filename] !== 'downloading') {
								e.target.style.backgroundColor = '#5074f6';
							}
						}}
						onMouseOut={(e) => {
							if (downloadStatus[logo.filename] !== 'downloading') {
								e.target.style.backgroundColor = getButtonColor(downloadStatus[logo.filename]);
							}
						}}
					>
						{getButtonText(downloadStatus[logo.filename])}
					</button>
					</div>
				);
			})}
		</div>
	);
};

export default LogoDownload;