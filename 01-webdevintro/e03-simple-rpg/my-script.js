window.addEventListener("keydown", keyDownFunction, false);

let playerPosX = 2;
let playerPosY = 2;
let backgroundChar = ",";
let playerChar = "8";

let world = new Array(10);
for (let i = 0; i < world.length; i++) {
	world[i] = new Array(10);
}

function drawWorld(){
	console.clear();
	for (let i = 0; i < world.length; i++) {
		let line = "";
		for (let j = 0; j < world.length; j++) {
			if(playerPosX === j && playerPosY === i){
				line += playerChar;
			} else {
				line += backgroundChar;
			}
		}
		console.log(line);
	}
}

function keyDownFunction(event){
	if(event.key === "ArrowDown"){
		playerPosY++;
	}
	if(event.key === "ArrowUp"){
		playerPosY--;
	}
	if(event.key === "ArrowLeft"){
		playerPosX--;
	}
	if(event.key === "ArrowRight"){
		playerPosX++;
	}
	drawWorld();
}

drawWorld();



