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
    this.smiley = this.add.container(100, 100);
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

    // smiley movement
    this.tweens.add({
        targets: this.smiley,
        angle: { value: 360, duration: 6000 },
        x: { value: 700, duration: 2000, yoyo: true, ease: 'Quad.easeInOut' },
        y: { value: 380, duration: 4500, yoyo: true, ease: 'Quad.easeInOut' },
        repeat: -1 // repeat endlessly
    });
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    let mousePos = new Phaser.Math.Vector2(game.input.mousePointer.x, game.input.mousePointer.y);
    // transform mousePos to local space of smiley object
    this.smiley.getWorldTransformMatrix().invert().transformPoint(mousePos.x, mousePos.y, mousePos);

    // copy object values of dir for later use when calculating directions
    let mouseDirRight = mousePos.clone();
    let mouseDirLeft = mousePos.clone();

    // smiley rotation from local eye position to local coordinates of mouse position
    mouseDirLeft.subtract(new Phaser.Math.Vector2(this.smiley.leftEye.x, this.smiley.leftEye.y));
    this.smiley.leftEye.angle = Phaser.Math.RadToDeg(Math.atan2(mouseDirLeft.y, mouseDirLeft.x));

    mouseDirRight.subtract(new Phaser.Math.Vector2(this.smiley.rightEye.x, this.smiley.rightEye.y));
    this.smiley.rightEye.angle = Phaser.Math.RadToDeg(mouseDirRight.angle()); // does the same as atan2
};

