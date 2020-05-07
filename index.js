var motion = { //control ball motion
    DirX: 150,
    DirY: 275,
    speedDirX: 7,
    speedDirY: -3,
}
function setup() {
    createCanvas(800, 500);
    // noStroke();
}
function reset() {  //out of scope reset ball
    motion.DirX = 150;
    motion.DirY = 275;
    motion.speedDirX = 7;
    motion.speedDirY = -2;
}
var cartisian = {
    X: 0,
    Y: 0,
};
var physics = {

};
var i = 0;

colors = [
    [236, 43, 43],
    [50, 150, 255],//
    [255, 230, 0],
    [100, 168, 50]
];

class brick {
    constructor() {
        this.state = 1;
        this.color = Math.floor(Math.random() * 4);
    }
};

let b = [];

for (i = 0; i < 4; i++) {
    let x = [];
    for (j = 0; j < 9; j++) {
        x[j] = new brick();
    }
    b.push(x);
}



function draw() {
    background(45, 50, 60);
    var striker = { //control striker motion
        hei: 20,
        wid: 200,
        speed: mouseX,
    };
    if (i == 0) { //resetting ball for starting game
        reset();
        mouseX = width / 2.6;
        i++;
    }

    // breakout tiles
    // for (j = 10; j < 7 * 21; j = j + 29) {
    //     for (i = 7; i < width; i = i + 88.5) {
    //         fill(random(200), random(220), random(255));
    //         fill(100, 150, 220);
    //         // console.log(j,i);
    //         fill(b[j-10][i].color);
    //         rect(i, j, 80, 20, 5);
    //     }
    // }

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 9; j++) {
            c = b[i][j];
            if (c.state == 1) {
                fill(colors[c.color][0], colors[c.color][1], colors[c.color][2]);
                rect(7 + (j * 88), 10 + (i * 40), 80, 30, 2);
            }
        }
    }





    // Collission detect
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 9; j++) {
            c = b[i][j];
            if (c.state == 1) {
                if (
                    motion.DirX >= (7 + (j * 88)) && motion.DirX <= (7 + (j * 88) + 80) &&
                    motion.DirY >= (10 + (i * 40)) && motion.DirY <= (20 + (i * 40) + 30)
                ) {
                    c.state = 0;
                    // motion.speedDirX=motion.speedDirX*(-1);
                    motion.speedDirY = motion.speedDirY * (-1);
                }
            }
        }
    }




    //tiles ends
    // stroke(255, 204, 0);
    // strokeWeight(1);
    // line(0, 155, width, 155);
    noStroke();     //universal argument(not aplicable on canvas)

    //ball start(design only)
    fill(255, 255, 220);
    ellipse(motion.DirX, motion.DirY, 20, 20);
    //ball finished


    //ball constrains
    if (motion.DirX >= width || motion.DirX <= 0) {
        motion.speedDirX = motion.speedDirX * (-1);
    }
    if (motion.DirY <= 0) {
        motion.speedDirY = motion.speedDirY * (-1);
    }
    if (motion.DirY >= height) {
        setTimeout(function () { reset() }, 1000);
    }
    //constrains ends


    //ball hit
    if (motion.DirX >= striker.speed - 10 && motion.DirX <= striker.speed + striker.wid + 10 &&
        motion.DirY >= 469 && motion.DirY < height) {

        if (motion.DirX == striker.speed - 10 && motion.DirX == striker.speed + striker.wid + 10) {
            motion.speedDirX = motion.speedDirX * (-1);
            motion.speedDirY = motion.speedDirY * (-1.005);
        }
        else {
            motion.speedDirY = motion.speedDirY * (-1.005);
        }
    }
    //hit ends

    //striker start
    fill(180, 180, 180);
    if (striker.speed >= (width - striker.wid)) {
        striker.speed = (width - striker.wid);
    }
    if (striker.speed <= 0) {
        striker.speed = 0;
    }
    rect(striker.speed, 475, striker.wid, striker.hei, 3);
    motion.DirX = motion.DirX + motion.speedDirX;
    motion.DirY = motion.DirY + motion.speedDirY;
    //striker finished 

    if (motion.DirY <= 155) {    //breakout functionality

    }
}
function keyPressed(e) { //keyboard control
    if (e.keyCode === LEFT_ARROW) {
        mouseX = mouseX - 20;
    }
    if (e.keyCode === RIGHT_ARROW) {
        mouseX = mouseX + 20;
    }
}