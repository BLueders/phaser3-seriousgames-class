let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

//game variables
let fps = 30;
let imageLoaded = false;
let puggoPosX = 20;
let puggoPosY = 20;
let puggoSpeed = 4;
let puggoDirection = 1;

//Loading of the image
let puggo = new Image();
puggo.src = 'puggo.jpg';

puggo.onload = function () {
    imageLoaded = true;
};

puggo.onerror = function () {
    //draw red box on error
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, width, height);
};

setInterval(gameLoop, 1000 / fps);
function gameLoop() {
    update();
    draw();
}

function update() {
    if (puggoPosX > 600) {
        puggoDirection = -1;
    }
    if (puggoPosX < 100) {
        puggoDirection = 1;
    }
    puggoPosX += puggoSpeed * puggoDirection;
}

function draw() {
    // draw background
    ctx.fillStyle = "#339933";
    ctx.fillRect(0, 0, width, height);

    if(imageLoaded){
        ctx.drawImage(puggo, puggoPosX, puggoPosY);
    }
}
