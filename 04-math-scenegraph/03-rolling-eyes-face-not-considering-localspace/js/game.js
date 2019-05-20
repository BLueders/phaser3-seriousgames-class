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
    this.load.image('smiley', 'assets/smiley.png');
};

// called once after the preload ends
gameScene.create = function () {
    this.smiley = this.add.container(400, 240);
    this.smiley.face = this.add.sprite(0, 0, 'smiley');
    this.smiley.leftEye = this.add.container(-50, -25);
    this.smiley.rightEye = this.add.container(50, -25);
    this.smiley.add([this.smiley.face, this.smiley.leftEye, this.smiley.rightEye]);

    this.smiley.leftEye.eyeball = this.add.sprite(0, 0, 'eyeball');
    this.smiley.leftEye.pupil = this.add.sprite(25, 0, 'pupil');
    this.smiley.leftEye.add([this.smiley.leftEye.eyeball, this.smiley.leftEye.pupil]);

    this.smiley.rightEye.eyeball = this.add.sprite(0, 0, 'eyeball');
    this.smiley.rightEye.pupil = this.add.sprite(25, 0, 'pupil');
    this.smiley.rightEye.add([this.smiley.rightEye.eyeball, this.smiley.rightEye.pupil]);
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    let mousePos = new Phaser.Math.Vector2(game.input.mousePointer.x, game.input.mousePointer.y);
    let mouseDir;

    // eyes will use local space coordinates, resulting in error when displaying rotation
    mouseDir = mousePos.subtract(new Phaser.Math.Vector2(this.smiley.leftEye.x, this.smiley.leftEye.y));
    this.smiley.leftEye.angle = Phaser.Math.RadToDeg(Math.atan2(mouseDir.y, mouseDir.x));

    mouseDir = mousePos.subtract(new Phaser.Math.Vector2(this.smiley.rightEye.x, this.smiley.rightEye.y));
    this.smiley.rightEye.angle = Phaser.Math.RadToDeg(Math.atan2(mouseDir.y, mouseDir.x));
};

