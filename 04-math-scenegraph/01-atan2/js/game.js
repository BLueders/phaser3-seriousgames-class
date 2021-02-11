// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800,
    height: 480,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

// initiate scene parameters
gameScene.init = function () {
};

// load assets
gameScene.preload = function () {
    this.load.image('chicken', 'assets/chicken.png');
};

// called once after the preload ends
gameScene.create = function () {
    // create and position background
    this.chicken = this.add.sprite(400, 240, 'chicken');
    // create the player and scene objects
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    let mousePos = new Phaser.Math.Vector2(game.input.mousePointer.x,
                                           game.input.mousePointer.y);

    let mouseDir = mousePos.subtract(this.chicken.getCenter());

    this.chicken.angle = Phaser.Math.RadToDeg(Math.atan2(mouseDir.y,
                                                         mouseDir.x));
};
