var RPGWorld = {};
RPGWorld.playerCharacter = 'P';
RPGWorld.goalCharacter = 'g';
RPGWorld.wallCharacter = 'W';
RPGWorld.emptyCharacter = '.';
RPGWorld.enemyCharacter = 'E';

RPGWorld.playerColor = "#45DD45";
RPGWorld.goalColor = "#CDDC65";
RPGWorld.wallColor = "#889999";
RPGWorld.enemyColor = "#DD1111";
RPGWorld.backgroundColor = "#111111";

RPGWorld.cellsize = 40;

/**
 * Draws the given world.
 * @function RPGWorld.drawWorld
 * @param {Array} world - a 2D array of the world to draw. Default characters are:
 *                        "P" for the player.
 *                        "G" for the goal.
 *                        "W" for the walls.
 *                        "." for empty space.
 *                        "E" for the enemies.
 * @return {boolean} true if the world could be drawn. false if there was a problem.
 */
RPGWorld.drawWorld = function(world){

    if(!Array.isArray(world)){
        console.error("Given object world is not an array: " + world);
        return false;
    }
    if(!Array.isArray(world[0])){
        console.error("Given object world is not an 2d array: " + world);
        return false;
    }

    // resize canvas to world size.
    let canvaswidth = world.length * RPGWorld.cellsize;
    let canvasheight = world[0].length * RPGWorld.cellsize;
    RPGWorld.canvas.style.width = canvaswidth + "px";
    RPGWorld.canvas.style.height = canvasheight + "px";
    RPGWorld.canvas.width = canvaswidth;
    RPGWorld.canvas.height = canvasheight;

    // draw background
    RPGWorld.context.clearRect(0, 0, canvaswidth, canvasheight);
    RPGWorld.context.fillStyle = RPGWorld.backgroundColor;
    RPGWorld.context.fillRect(0, 0, canvaswidth, canvasheight);

	for (let x = 0; x < world.length; x++) {
		for (let y = 0; y < world[x].length; y++) {
            if(!(typeof world[x][y] == "string")){
                console.error("content in world array: " + world[x][y] + " of type: " +
                typeof world[x][y] + " at: " + x + ", " + y + " is not a string");
            }
			if(world[x][y] == RPGWorld.playerCharacter){
                drawPlayer(x * RPGWorld.cellsize, y * RPGWorld.cellsize);
            }
            else if(world[x][y] == RPGWorld.goalCharacter){
                drawGoal(x * RPGWorld.cellsize, y * RPGWorld.cellsize);
            }
            else if(world[x][y] == RPGWorld.wallCharacter){
                drawWall(x * RPGWorld.cellsize, y * RPGWorld.cellsize);
            }
            else if(world[x][y] == RPGWorld.enemyCharacter){
                drawEnemy(x * RPGWorld.cellsize, y * RPGWorld.cellsize);
            }
            else if(world[x][y] == RPGWorld.emptyCharacter){

            }
            else {
                console.error("unknown world character: " + world[x][y] + " at: " + x + ", " + y);
                return false;
            }
		}
	}
    return true;

    function drawPlayer(x, y){
        // draw a circle
        RPGWorld.context.fillStyle = RPGWorld.playerColor;
        RPGWorld.context.beginPath();
        RPGWorld.context.arc(x + RPGWorld.cellsize * 0.5,
                             y + RPGWorld.cellsize * 0.6,
                             RPGWorld.cellsize/3, 0, 2 * Math.PI);
        RPGWorld.context.arc(x + RPGWorld.cellsize * 0.5,
                          y + RPGWorld.cellsize * 0.3,
                          RPGWorld.cellsize/5, 0, 2 * Math.PI);
        RPGWorld.context.fill();
    }

    function drawGoal(x, y){
        // draw a circle
        RPGWorld.context.fillStyle = RPGWorld.goalColor;
        RPGWorld.context.beginPath();
        RPGWorld.context.arc(x, y, RPGWorld.cellsize/2, 0, 2 * Math.PI);
        RPGWorld.context.fill();
    }

    function drawWall(x, y){
        // draw a circle
        RPGWorld.context.fillStyle = RPGWorld.wallColor;
        RPGWorld.context.beginPath();
        RPGWorld.context.rect(x + RPGWorld.cellsize * 0.1,
                              y + RPGWorld.cellsize * 0.1,
                              RPGWorld.cellsize * 0.9,
                              RPGWorld.cellsize * 0.9);
        RPGWorld.context.fill();
    }

    function drawEnemy(x, y){
        // draw a circle
        RPGWorld.context.fillStyle = RPGWorld.enemyColor;
        RPGWorld.context.beginPath();
        RPGWorld.context.arc(x + RPGWorld.cellsize * 0.5,
                             y + RPGWorld.cellsize * 0.1,
                             RPGWorld.cellsize/3, Math.PI, 0);
        RPGWorld.context.fill();
        RPGWorld.context.beginPath();
        RPGWorld.context.rect(x + RPGWorld.cellsize * 0.4,
                              y + RPGWorld.cellsize * 0.1,
                              RPGWorld.cellsize * 0.2,
                              RPGWorld.cellsize * 0.6);
        RPGWorld.context.fill();
    }
}

/**
 * Initializes the RPGWOrld canvas
 * @function RPGWorld.init
 */
RPGWorld.init = function(){
    var canvaswidth = RPGWorld.canvasRPGWorld.canvas.width;
    var canvasheight = RPGWorld.canvas.height;

    // draw background
    RPGWorld.context.clearRect(0, 0, canvaswidth, canvasheight);
    RPGWorld.context.fillStyle = RPGWorld.backgroundColor;
    RPGWorld.context.fillRect(0, 0, canvaswidth, canvasheight);
}


// Set up RPG System and Canvas
RPGWorld.canvas = document.createElement("canvas");
RPGWorld.canvas.id = 'canvas_id';
RPGWorld.canvas.style.width = "400px";
RPGWorld.canvas.style.height = "400px";
document.body.appendChild(RPGWorld.canvas);
RPGWorld.context = RPGWorld.canvas.getContext("2d");
RPGWorld.init();
