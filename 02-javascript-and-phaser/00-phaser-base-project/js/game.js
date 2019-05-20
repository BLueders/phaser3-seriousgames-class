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
    this.load.image('background', 'assets/background.png');
};

// called once after the preload ends
gameScene.create = function () {
    // create and position background
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayHeight = config.height;
    this.background.displayWidth = config.width;

    // create the player and scene objects
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {

};

function restart(){
    // restart the Scene
    gameScene.scene.restart();
}

