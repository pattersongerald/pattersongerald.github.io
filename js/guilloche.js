/* S/O to https://gist.github.com/3n/803329 for the snippet */
var canvasElement = document.getElementById('guillocheDisplay');

var guilloche = function (canvas, opts) {
	var opts = opts || {};

	canvasElement.height = window.innerHeight;
	canvasElement.width = window.innerWidth;

	var ctx = canvas.getContext('2d'),
		size = {
			x: window.innerWidth,
			y: window.innerHeight
		},
		halfSize = {
			x: size.x / 2,
			y: size.y / 2
		},
		majorR = opts.majorR || 479.5,
		minorR = opts.minorR || 50,
		angleMultiplier = opts.angleMultiplier || 50,
		radiusEffectConstant = opts.radiusEffectConstant || 250,
		steps = opts.steps || 250,
		centerPoint = opts.centerPoint || {
			x: window.innerWidth,
			y: window.innerHeight
		},
		color = opts.color || '#391604',
		globalAlpha = opts.globalAlpha || 1;

	ctx.globalAlpha = globalAlpha;
	ctx.clearRect(0, 0, size.x, size.y);
	ctx.webkitImageSmoothingEnabled = true;


	var diff = majorR - minorR,
		s = diff / minorR,
		theta = 0,
		radiusEffect = radiusEffectConstant + minorR,
		oldX, oldY;

	for (var i = steps; i--;) {
		var new_theta = angleMultiplier * theta,
			x = diff * Math.sin(new_theta) + radiusEffect * Math.sin(new_theta * s) + (centerPoint.x),
			y = diff * Math.cos(new_theta) - radiusEffect * Math.cos(new_theta * s) + (centerPoint.y);

		theta += Math.PI * 4 / steps;

		if (oldX) {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(oldX, oldY);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.stroke();
		}

		oldX = x;
		oldY = y;
	}

};

var rendered = guilloche(canvasElement);