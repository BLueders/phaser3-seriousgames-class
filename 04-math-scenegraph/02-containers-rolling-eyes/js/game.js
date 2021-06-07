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
    this.load.image('eyeball', 'assets/eyeball.png');
    this.load.image('pupil', 'assets/pupil.png');
};

// called once after the preload ends
gameScene.create = function () {

    this.eye = this.add.container(400, 240);
    this.eye.setScale(2,1)
    this.eye.eyeball = this.add.sprite(0, 0, 'eyeball');
    this.eye.eyeball.setScale(2,1);
    this.eye.pupil = this.add.sprite(25, 0, 'pupil');
    this.eye.add([this.eye.eyeball, this.eye.pupil]);
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    let mousePos = new Phaser.Math.Vector2(game.input.mousePointer.x, game.input.mousePointer.y);
    let mouseDir = mousePos.subtract(new Phaser.Math.Vector2(this.eye.x, this.eye.y));
    this.eye.angle = Phaser.Math.RadToDeg(Math.atan2(mouseDir.y, mouseDir.x));
};
