const MyRateOnCanvas = ($selector, data) => {
	const myCanvas = document.getElementById($selector)

	let ctx = myCanvas.getContext('2d');
	ctx.height = myCanvas.getAttribute('height') || 150;
	ctx.width = myCanvas.getAttribute('width') || 150;

	draw(ctx, data)
}

const draw = (ctx, data) => {
	let totalValue = totalCount(data.rates)
	let endAngle = -Math.PI / 2;
	let canvas = { start: ctx.height / 2, end: ctx.height / 2, radiusIn: ctx.height / 2 - 4, radiusOut: ctx.height / 2 }

	data.rates.forEach((rate) => {
		if (rate.value) {
			startAngle = endAngle;
			endAngle -= 2 * Math.PI / totalValue * rate.value;

			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle, startAngle - data.conva * Math.PI / 360, true);
			ctx.closePath();
			ctx.fill();

			let linerGradient = ctx.createLinearGradient(canvas.start, canvas.end - canvas.radiusOut, canvas.start, canvas.end + canvas.radiusOut);
			linerGradient.addColorStop(0, rate.colors1);
			linerGradient.addColorStop(1, rate.colors2);
			ctx.fillStyle = linerGradient;
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, startAngle - data.conva * Math.PI / 360, endAngle + data.conva * Math.PI / 360, true);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.moveTo(canvas.start, canvas.end);
			ctx.arc(canvas.start, canvas.end, canvas.radiusOut, endAngle + data.conva * Math.PI / 360, endAngle, true);
			ctx.closePath();
			ctx.fill();
		}
	});

	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(canvas.start, canvas.end);
	ctx.arc(canvas.start, canvas.end, canvas.radiusIn, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

const totalCount = (arr) => arr.reduce((count, acc) => (+acc.value + count), 0);