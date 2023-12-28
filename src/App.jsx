import { useEffect, useRef } from 'react';
import {
	canvasWidth,
	canvasHeight,
	centerX,
	centerY,
	radius,
	innerRadius,
	accentColor,
} from './CONSTANTS.js';
import './App.css';

function App() {
	const backgroundRef = useRef(null);

	const drawHand = (
		ctx,
		rotateAngle = 0,
		length = 100,
		width = 5,
		color = accentColor,
		capStyle = 'round'
	) => {
		ctx.translate(centerX, centerY);
		ctx.rotate(rotateAngle);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(length, 0);
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.lineCap = capStyle;
		ctx.stroke();
		ctx.setTransform();
	};

	const drawClockFace = (ctx) => {
		const whitePadding = 20;
		const gradient = ctx.createRadialGradient(
			centerX,
			centerY,
			innerRadius + whitePadding,
			centerX,
			centerY,
			radius
		);
		gradient.addColorStop(0, 'white');
		gradient.addColorStop(1, 'grey');

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();

		ctx.beginPath();
		ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
		ctx.fillStyle = accentColor;
		ctx.fill();
	};

	const drawNumbers = (ctx) => {
		ctx.fillStyle = accentColor;
		ctx.font = radius * 0.15 + 'px arial';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';

		const del1 = Math.sin(Math.PI / 3) * innerRadius; // greater
		const del2 = Math.sin(Math.PI / 6) * innerRadius; // smaller

		ctx.fillText(1, centerX + del2, centerY - del1);
		ctx.fillText(2, centerX + del1, centerY - del2);
		ctx.fillText(3, centerX + innerRadius, centerY);
		ctx.fillText(5, centerX + del1, centerY + del2);
		ctx.fillText(4, centerX + del2, centerY + del1);
		ctx.fillText(6, centerX, centerY + innerRadius);
		ctx.fillText(11, centerX - del2, centerY - del1);
		ctx.fillText(10, centerX - del1, centerY - del2);
		ctx.fillText(9, centerX - innerRadius, centerY);
		ctx.fillText(8, centerX - del1, centerY + del2);
		ctx.fillText(7, centerX - del2, centerY + del1);
		ctx.fillText(12, centerX, centerY - innerRadius);
	};

	const drawHands = (ctx) => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const secondAngle = (Math.PI / 30) * (seconds - 15);
		const minuteAngle = (Math.PI / 30) * (minutes - 15);
		const hourAngle = (Math.PI / 6) * (hours - 3);

		const secondLength = 0.9 * innerRadius;
		const minuteLength = 0.85 * innerRadius;
		const hourLength = 0.6 * innerRadius;

		drawHand(ctx, secondAngle, secondLength, 1, 'red', 'round');
		drawHand(ctx, minuteAngle, minuteLength, 5, accentColor, 'round');
		drawHand(ctx, hourAngle, hourLength, 7, accentColor, 'round');
	};

	const drawClock = () => {
		const ctx = backgroundRef.current.getContext('2d');

		drawClockFace(ctx);
		drawNumbers(ctx);
		drawHands(ctx);
	};

	useEffect(() => {
		const interval = setInterval(drawClock, 1000);

		return () => clearInterval(interval);
	}, []);
	return (
		<div id='app'>
			<canvas
				id='ctx'
				width={canvasWidth}
				height={canvasHeight}
				ref={backgroundRef}
			/>
		</div>
	);
}

export default App;
