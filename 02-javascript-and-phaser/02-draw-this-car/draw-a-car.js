let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

// draw background
ctx.fillStyle = "#339933";
ctx.fillRect(0, 0, width, height);

// draw car
// body
ctx.fillStyle = "#FF3333";
ctx.fillRect(200, 300, 400, 100);

// left wheel
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(300, 400, 40, 0, 2 * Math.PI);
ctx.fill();

// right wheel
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(500, 400, 40, 0, 2 * Math.PI);
ctx.fill();

// windows
ctx.fillStyle = "#3333FF";
ctx.fillRect(300, 200, 200, 100);


