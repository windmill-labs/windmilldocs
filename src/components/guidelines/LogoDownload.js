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

	const getButtonClasses = (status) => {
		switch (status) {
			case 'downloading':
				return 'bg-gray-400';
			case 'success':
				return 'bg-feedback-success';
			case 'error':
				return 'bg-feedback-error';
			case 'opened':
				return 'bg-feedback-warning';
			default:
				return 'bg-accent-primary hover:bg-accent-hover';
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

	const getTextClasses = (background) => {
		// Determine if background is dark based on color value
		const isDarkBackground = background === '#2d3748' ||
								 background.toLowerCase().includes('dark') ||
								 (background.startsWith('#') && parseInt(background.slice(1), 16) < 0x808080);

		if (isDarkBackground) {
			return {
				title: 'text-text-emphasis-dark',
				description: 'text-text-secondary-dark'
			};
		} else {
			return {
				title: 'text-text-emphasis-light',
				description: 'text-text-secondary-light'
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
				const textClasses = getTextClasses(logo.background);
				return (
					<div
						key={index}
						className="border border-border-light-light rounded-lg p-6 text-center"
						style={{
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
						<div className={`text-sm font-semibold mb-2 ${textClasses.title}`}>
							{logo.variant}
						</div>
						<div className={`text-xs mb-4 ${textClasses.description}`}>
							{logo.description}
						</div>
					<button
						onClick={() => downloadSVG(logo.url, logo.filename)}
						disabled={downloadStatus[logo.filename] === 'downloading'}
						className={`text-white border-none rounded-md px-4 py-2 text-xs font-medium transition-colors duration-200 ${
							downloadStatus[logo.filename] === 'downloading'
								? 'cursor-not-allowed opacity-70'
								: 'cursor-pointer'
						} ${getButtonClasses(downloadStatus[logo.filename])}`}
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