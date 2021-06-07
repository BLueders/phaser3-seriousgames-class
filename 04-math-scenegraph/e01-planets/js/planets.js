"Use Strict";
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
    this.load.image('planetA00', 'assets/A00.png');
    this.load.image('planetC00', 'assets/C00.png');
    this.load.image('planetD00', 'assets/D00.png');
    this.load.image('planetG00', 'assets/G00.png');
    this.load.image('planetH00', 'assets/H00.png');
    this.load.image('planetI00', 'assets/I00.png');
    this.load.image('planetJ00', 'assets/J00.png');
};

// called once after the preload ends
gameScene.create = function () {
    this.planetSystem = gameScene.add.container(config.width/2, config.height/2);
    this.planetSystem.sun = this.add.sprite(0,0,'planetA00');
    this.planetSystem.add(this.planetSystem.sun);

    this.planetSystem.planet1 = this.add.sprite(200,0,'planetC00');
    this.planetSystem.planet1.setScale(0.5, 0.5);
    this.planetSystem.add(this.planetSystem.planet1);
}

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    this.planetSystem.rotation += delta/1000;
};
