import React from 'react';

interface Point {
	x: number;
	y: number;
}

interface Dimensions {
	width: number;
	height: number;
}

interface BezierCurveProps {
	start: Point;
	end: Point;
	p1: Point; // Control Point 1
	p2: Point; // Control Point 2
	dimensions: Dimensions;
}

export default function BezierCurve({ start, end, p1, p2, dimensions }: BezierCurveProps) {
	// Scale points
	const scaleX = (point: Point) => point.x * dimensions.width;
	const scaleY = (point: Point) => point.y * dimensions.height;

	// Define path
	const pathData = `M${scaleX(start)} ${scaleY(start)} 
									C${scaleX(p1)} ${scaleY(p1)}, 
									 ${scaleX(p2)} ${scaleY(p2)}, 
									 ${scaleX(end)} ${scaleY(end)}`;

	return (
		<svg width={dimensions.width} height={dimensions.height} xmlns="http://www.w3.org/2000/svg">
			<path d={pathData} stroke="#222" strokeWidth="1" fill="none" />
		</svg>
	);
}
