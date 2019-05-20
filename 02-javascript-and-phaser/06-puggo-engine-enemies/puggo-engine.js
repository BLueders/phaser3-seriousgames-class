let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

//game variables
let fps = 30;
let puggoLoaded = false;
let falcoLoaded = false;
let puggoPosX = 20;
let puggoPosY = 20;
let falcoPosX = 550;
let falcoPosY = 350;
let puggoSpeed = 4;
let puggoDead = false;

//Loading of the puggo
let puggo = new Image();
puggo.src = 'puggo.jpg';

puggo.onload = function () {
    puggoLoaded = true;
};

//Loading of the puggo
let falco = new Image();
falco.src = 'falco.jpg';

falco.onload = function () {
    falcoLoaded = true;
};

setInterval(gameLoop, 1000 / fps);
function gameLoop() {
    update();
    draw();
}

function update() {
    checkOverlap();
    if(puggoDead){
        return;
    }

    if (keyMap.ArrowLeft) {
        puggoPosX -= puggoSpeed;
    }
    if (keyMap.ArrowRight) {
        puggoPosX += puggoSpeed;
    }
    if (keyMap.ArrowUp) {
        puggoPosY -= puggoSpeed;
    }
    if (keyMap.ArrowDown) {
        puggoPosY += puggoSpeed;
    }
}

function draw() {
    // draw background
    if(!puggoDead){
        ctx.fillStyle = "#339933";
    } else {
        ctx.fillStyle = "#991726";
    }

    ctx.fillRect(0, 0, width, height);

    if(puggoLoaded){
        ctx.drawImage(puggo, puggoPosX, puggoPosY);
    }

    if(falcoLoaded){
        ctx.drawImage(falco, falcoPosX, falcoPosY);
    }
}

function checkOverlap(){
    if(Math.abs(puggoPosX - falcoPosX) < puggo.width){
        if(Math.abs(puggoPosY - falcoPosY) < puggo.height){
            puggoDead = true;
        }
    }
}

// process input
let keyMap = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

function keydown(event) {
    keyMap[event.key] = true;
}

function keyup(event) {
    keyMap[event.key] = false;
}


