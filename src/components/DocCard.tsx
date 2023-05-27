import React from 'react';
export default function DocCard({ title, description, href }) {
	return (
		<a href={href} className="windmill-documentation-card" target="_blank">
			<div className="text-lg font-semibold text-gray-900">{title}</div>
			<div className="text-sm text-gray-500">{description}</div>
		</a>
	);
}
