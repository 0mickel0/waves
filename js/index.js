var canvas,
    ctx,
    width,
    height,
    xCenter,
    yCenter,
    size,
    lines,
    line1,
    line2,
    line3,
    linesSec,
    linesThird,
    tick;
var backColor = 'rgb(233, 228, 231)';
var firstWave = {
    distance: 5,
    waveColor: '255, 255, 0',
    waveColor2: '360',
    positionX: 2,
    positionY: 2,
    elementSize: 0.5,
    lineWidth: 2,
    lineCount: 32
};
var secondWave = {
    distance: 5,
    waveColor: '0, 51, 204',
    waveColor2: '16',
    positionX: 3,
    positionY: 3,
    elementSize: 0.5,
    lineWidth: 1,
    lineCount: 16
};
var thirdWave = {
    distance: 10,
    waveColor: '62, 215, 0',
    waveColor2: '360',
    positionX: 3,
    positionY: 2,
    elementSize: 0.5,
    lineWidth: 3,
    lineCount: 3
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function Line(offset) {
    this.p1 = {x: size * 0.333, y: yCenter};
    this.p2 = {x: size * 0.333, y: yCenter};
    this.p3 = {x: size * 0.666, y: yCenter};
    this.p4 = {x: size, y: yCenter};
    this.offset = offset;
}

Line.prototype.step = function () {
    var base = ( this.offset + tick ) / 60;
    this.p1.x += Math.cos(base) * ( size / 250 );
    this.p2.x += Math.sin(base) * ( size / 250 );
    this.p3.x += Math.cos(base) * ( size / 250 );
    this.p4.x += Math.sin(base) * ( size / 250 );
    this.p2.y = yCenter + Math.cos(base) * size / 1;
    this.p3.y = yCenter + Math.sin(base) * size / 1;
};

Line.prototype.draw = function (i,c,c2) {
    // console.log(c2)
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.bezierCurveTo(
        this.p2.x,
        this.p2.y,
        this.p3.x,
        this.p3.y,
        this.p4.x,
        this.p4.y
    );
    var alpha = ( 0.55 + ( Math.sin( ( this.offset + tick ) / 50 ) * 0.85 ) );
    ctx.strokeStyle = 'hsla(' + ( i / c2 ) * c2 + ', 75%, 44%, ' + alpha + ')';
    // ctx.strokeStyle = 'rgb('+color+')';
    ctx.stroke();
}

function init() {
    lines = [line1,line2,line3]
    line1 = [];
    reset(firstWave,line1);
    loop();
    line2 = [];
    reset(secondWave,line2);
    loop2();
    line3 = [];
    reset(thirdWave,line3);
    loop3();
}

function reset(e,l) {
    xCenter = width / e.positionX;
    yCenter = height / e.positionY;
    size = Math.min(width, height) * e.elementSize;
    l.length = 0;
    tick = 0;
    ctx.lineWidth = e.lineWidth;
    for (var i = 0; i < e.lineCount; i++) {
        l.push(new Line(i * e.distance));
    }
}

function loop() {
    requestAnimationFrame(loop); // animation
    var i = line1.length;
    while (i--) {
        line1[i].step();
    }
    ctx.fillStyle = this.backColor;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(xCenter, yCenter);
    ctx.rotate(tick / 200);
    ctx.translate(-xCenter, -yCenter);
    ctx.translate(( width - size ) / 2, 0);
    var i = line1.length;
    while (i--) {
        line1[i].draw(i,firstWave.waveColor,firstWave.waveColor2);
    }
    ctx.restore();
    tick++;
}

function loop2() {
    requestAnimationFrame(loop2);
    var i = line2.length;
    while (i--) {
        line2[i].step();
    }
    //ctx.save();
    //ctx.translate(xCenter, yCenter);
    //ctx.rotate(tick / 200);
    //ctx.translate(-xCenter, -yCenter);
    //ctx.translate(( width - size ) / 2, 0);
    var i = line2.length;
    while (i--) {
        line2[i].draw(i,secondWave.waveColor,secondWave.waveColor2);
    }
    ctx.restore();
    //tick++;
}

function loop3() {
    requestAnimationFrame(loop3);
    var i = line3.length;
    while (i--) {
        line3[i].step();
    }
    ctx.save();
    //ctx.translate(xCenter, yCenter);
    //ctx.rotate(tick / 200);
    //ctx.translate(-xCenter, -yCenter);
    //ctx.translate(( width - size ) / 2, 0);
    var i = line3.length;
    while (i--) {
        line3[i].draw(i,thirdWave.waveColor,thirdWave.waveColor2);
    }
    ctx.restore();
    tick++;
}

window.addEventListener( 'resize', reset );
init();
