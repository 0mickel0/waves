var canvas,ctx,width,height,xCenter,yCenter,size,
    lines,
    line1,
    line2,
    line3,
    line4,
    tick;
var backColor = 'rgb(233, 228, 231)';
//orange
var firstWave = {
    distance: 15,
    const: true,
    r: 230,
    g: 122,
    b: 14,
    waveColor: '230, 122, 14',
    waveColor2: '360',
    positionX: 2,
    positionY: 5,
    elementSize: 0.5,
    lineWidth: 1,
    lineCount: 12,
    update: 12
};
//red
var secondWave = {
    distance: 6,
    const: true,
    r: 230,
    g: 47,
    b: 14,
    waveColor: '230, 47, 14',
    waveColor2: '16',
    positionX: 3,
    positionY: 3,
    elementSize: 0.5,
    lineWidth: 2,
    lineCount: 22,
    update: 12
};
//yellow
var thirdWave = {
    distance: 12,
    const: true,
    r: 251,
    g: 242,
    b: 3,
    waveColor: '251, 242, 3',
    waveColor2: '360',
    positionX: 3,
    positionY: 5,
    elementSize: 0.3,
    lineWidth: 1,
    lineCount: 30,
    update: 12
};
//blue
var fourthWave = {
    distance: 25,
    const: true,
    r: 92,
    g: 131,
    b: 250,
    waveColor: '92,131,250',
    waveColor2: '360',
    positionX: 3,
    positionY: 5,
    elementSize: 0.3,
    lineWidth: 1,
    lineCount: 15,
    update: 120
};

img=new Image();
img.src="./waveR.png";

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
    var base = ( this.offset + tick ) / 120;
    this.p1.x += Math.cos(base) * ( size / 250 );
    this.p2.x += Math.sin(base) * ( size / 250 );
    this.p3.x += Math.cos(base) * ( size / 250 );
    this.p4.x += Math.sin(base) * ( size / 250 );
    this.p2.y = yCenter + Math.cos(base) * size / 1;
    this.p3.y = yCenter + Math.sin(base) * size / 1;
};

Line.prototype.draw = function (i,c,c2,con,r,g,b) {
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
    var alpha = ( 0.35 + ( Math.sin( ( this.offset + tick ) / 50 ) * 0.85 ) );
    if (con) {
        ctx.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        ctx.strokeStyle = 'hsla(' + ( i / c2 ) * c2 + ', 75%, 44%, ' + alpha + ')';
    }
    ctx.stroke();
}

function init() {
    lines = [line1,line2,line3,line4]
    line1 = [];
    reset(firstWave,line1);
    loop();
    line2 = [];
    reset(secondWave,line2);
    loop2();
    line3 = [];
    reset(thirdWave,line3);
    loop3();
    line4 = [];
    reset(fourthWave,line4);
    loop4();
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
        line1[i].step(firstWave.update);
    }
    var my_gradient=ctx.createLinearGradient(0,0,width,0);
    my_gradient.addColorStop(0,"white");
    my_gradient.addColorStop(0.5,"white");
    my_gradient.addColorStop(1,"white");
    ctx.fillStyle=my_gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(xCenter, yCenter);
    //ctx.rotate(tick / 700);
    ctx.rotate(150);
    ctx.translate(-xCenter, -yCenter);
    //ctx.translate(( width - size ) / 10, 0);
    ctx.translate(( width - size ) / 10, 120);
    ctx.scale(1.4,1);
    var i = line1.length;
    while (i--) {
        line1[i].draw(i,firstWave.waveColor,firstWave.waveColor2,firstWave.const,firstWave.r,firstWave.g,firstWave.b);
    }
    ctx.restore();
    tick++;
}

function loop2() {
    requestAnimationFrame(loop2);
    var i = line2.length;
    while (i--) {
        line2[i].step(secondWave.update);
    }
    //ctx.save();
    //ctx.translate(xCenter, yCenter);
    //ctx.rotate(tick / 200);
    //ctx.translate(-xCenter, -yCenter);
    //ctx.translate(( width - size ) / 2, 0);

    //drawImage(tick)

    var i = line2.length;
    while (i--) {
        line2[i].draw(i,secondWave.waveColor,secondWave.waveColor2,secondWave.const,secondWave.r,secondWave.g,secondWave.b);
    }
    ctx.restore();
    ctx.globalAlpha = 0.2;
    //tick++;
}
function loop3() {
    requestAnimationFrame(loop3);
    var i = line3.length;
    while (i--) {
        line3[i].step(thirdWave.update);
    }
    ctx.save();
    ctx.translate(width/2, (height/2)-500);
    ctx.rotate(20);
    var i = line3.length;
    while (i--) {
        line3[i].draw(i,thirdWave.waveColor,thirdWave.waveColor2,thirdWave.const,thirdWave.r,thirdWave.g,thirdWave.b);
    }
    ctx.restore();
    tick++;
}

function loop4() {
    requestAnimationFrame(loop4);
    var i = line4.length;
    while (i--) {
        line4[i].step(fourthWave.update);
    }
    ctx.save();
    ctx.translate(xCenter, yCenter);
    ctx.translate(( width - size ) / 10, 120);
    ctx.rotate(-50);
    ctx.scale(1.6,1);
    var i = line4.length;
    while (i--) {
        line4[i].draw(i,fourthWave.waveColor,fourthWave.waveColor2,fourthWave.const,fourthWave.r,fourthWave.g,fourthWave.b);
    }
    ctx.restore();
    tick++;
}

function drawImage(degrees){
    ctx.save();
    ctx.translate(400, 300);
    ctx.rotate(degrees/30*(Math.PI / 310));
    ctx.translate(-500, -400);
    //console.log(degrees)
    var alpha = ( 0.5 * (1+ Math.sin( ( degrees ) / 50 ) * 0.85 ) ).toFixed(2);
    ctx.globalAlpha = alpha;
    //console.log(alpha)
    ctx.drawImage(img,400,300);
    ctx.restore();
}
window.addEventListener( 'resize', reset );
init();
