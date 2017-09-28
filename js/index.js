var canvas,
	ctx,
	width,
	height,
	xCenter,
	yCenter,
	size,
	lines,
	tick;
var backColor = 'rgb(233, 228, 231)';
var firstWave = {
	distance: 6,
	waveColor: 'rgba(244, 67, 54, 0.2)',
	positionX : 2,
	positionY : 2,
	elementSize : 0.5,
	lineWidth : 2,
	lineCount : 20
};
var secondWave = {
	distance: 3,
	waveColor: 'rgba(2 67, 54, 0.9)',
	positionX : 2,
	positionY : 2,
	elementSize : 1,
	lineWidth : 3,
	lineCount : 15
};

var canvas = document.getElementById( 'canvas' );
var ctx = canvas.getContext( '2d' );
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener( 'resize', initWindow );
window.onload = function () {
	initWindow()
};
function initWindow(){
	  createAnim(firstWave)
	  debugger;
	  createAnim(secondWave)
}
function createAnim(wave){
	function init() {
		lines = [];
		reset();
		loop();
	}

	function reset() {
		xCenter = width / wave.positionX;
		yCenter = height / wave.positionY;
		size = Math.min( width, height ) * wave.elementSize;
		lines.length = 0;
		tick = 0;
		ctx.lineWidth = wave.lineWidth;
		for( var i = 0; i < wave.lineCount; i++ ) {
			lines.push( new Line( i * wave.distance ) );
		}
	}

	function loop() {
		requestAnimationFrame( loop ); // animation
		var i = lines.length;
		while( i-- ) {
			lines[ i ].step();
		}
		ctx.fillStyle = this.backColor;
		ctx.fillRect( 0, 0, width, height );
		ctx.save();
		ctx.fillStyle = wave.backColor;
		ctx.fillRect( 0, 0, width, height );
		ctx.save();
		ctx.translate( xCenter, yCenter );
		ctx.rotate( tick / 200 );
		ctx.translate( -xCenter, -yCenter );
		ctx.translate( ( width - size ) / 2, 0 );
		var i = lines.length;
		while( i-- ) {
			lines[ i ].draw( i );
		}
		ctx.restore();
		tick++;
	}

	function Line( offset ) {
	this.p1 = { x: 0, y: yCenter };
	this.p2 = { x: size * 0.333, y: yCenter };
	this.p3 = { x: size * 0.666, y: yCenter };
	this.p4 = { x: size, y: yCenter };
	this.offset = offset;
	}

	Line.prototype.step = function() {
		var base = ( this.offset + tick ) / 60;
		this.p1.x += Math.cos( base ) * ( size / 250 );
		this.p2.x += Math.sin( base ) * ( size / 250 );
		this.p3.x += Math.cos( base ) * ( size / 250 );
		this.p4.x += Math.sin( base ) * ( size / 250 );
		this.p2.y = yCenter + Math.cos( base ) * size / 1;
		this.p3.y = yCenter + Math.sin( base ) * size / 1;
	};

	Line.prototype.draw = function( i ) {
		ctx.beginPath();
		ctx.moveTo( this.p1.x, this.p1.y );
		ctx.bezierCurveTo(
			this.p2.x,
			this.p2.y,
			this.p3.x,
			this.p3.y,
			this.p4.x,
			this.p4.y
		);
		ctx.strokeStyle = wave.waveColor;
		ctx.stroke();
	}
	init();
}
