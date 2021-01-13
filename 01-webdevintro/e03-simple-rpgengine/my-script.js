window.addEventListener("keydown", keyDownFunction, false);

let playerPosX = 2;
let playerPosY = 2;
let backgroundChar = ".";
let playerChar = "P";

let world = new Array(10);
for (let i = 0; i < world.length; i++) {
	world[i] = new Array(10);
}

function drawWorld(){
	console.clear();
	for (let x = 0; x < world.length; x++) {
		let line = "";
		for (let y = 0; y < world.length; y++) {
			if(playerPosX === x && playerPosY === y){
				line += playerChar;
                world[x][y] = playerChar;
			} else {
				line += backgroundChar;
                world[x][y] = backgroundChar;
			}
		}
		console.log(line);
	}
    RPGWorld.drawWorld(world);
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
