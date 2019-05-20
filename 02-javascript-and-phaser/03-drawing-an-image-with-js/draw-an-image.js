let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// draw background
ctx.fillStyle = "#339933";
ctx.fillRect(0, 0, width, height);

//Loading of the image
let img1 = new Image();
img1.src = 'puggo.jpg';

img1.onload = function () {
    //draw image
    ctx.drawImage(img1, 20, 20);
};

img1.onerror = function () {
    //draw red box on error
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, width, height);
};


