let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// draw background
ctx.fillStyle = "#111111";
ctx.fillRect(0, 0, width, height);
// draw a rectangle
ctx.fillStyle = "#FF3333";
ctx.beginPath();
ctx.rect(150, 300, 250, 200);
ctx.fill();
// draw a circle
ctx.fillStyle = "#3333FF";
ctx.beginPath();
ctx.arc(400, 250, 100, 0, 2 * Math.PI);
ctx.fill();
