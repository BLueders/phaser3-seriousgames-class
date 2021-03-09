// Movement class to enclapsulate all of the movement variables for easy access.
PlayerMovement = class {
    horizontalSpeed;
    verticalSpeed;
    flapSpeed;
    gravity;

    constructor() {
        this.horizontalSpeed = 100;
        this.verticalSpeed = 0;
        this.flapSpeed = 400;
        this.gravity = 800;
    }

    flap() {
        this.verticalSpeed = -this.flapSpeed;
    }
};

// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800,
    height: 480,
    scene: gameScene
};

// load assets
gameScene.preload = function () {
    this.load.image('background', 'assets/background.png');
    this.load.image('chickenUp', 'assets/chicken-fly-up.png');
    this.load.image('chickenDown', 'assets/chicken-fly-down.png');
    this.load.image('spike', 'assets/spike.png');
};

// called once after the preload ends
gameScene.create = function () {
    // create and position background
    this.background = this.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayHeight = config.height;
    this.background.displayWidth = config.width;

    // create the player
    this.player = this.add.sprite(0, 150, 'chickenDown');
    this.player.setScale(0.5);
    this.player.movement = new PlayerMovement();
    // create the enemies
    this.enemies = new Array(3);
    this.enemies[0] = this.add.sprite(250, config.height - 100, 'spike');
    this.enemies[1] = this.add.sprite(450, 0, 'spike');
    this.enemies[1].setFlipY(true);
    this.enemies[2] = this.add.sprite(650, config.height - 100, 'spike');
    for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].setScale(0.5);
    }
    this.cursorKeys = this.input.keyboard.createCursorKeys();
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    // check for active input and move player
    if (this.cursorKeys.space.isDown) {
        this.player.setTexture('chickenUp');
        this.player.movement.flap();
    }
    this.player.movement.verticalSpeed += this.player.movement.gravity * delta/1000.0;

    this.player.x += this.player.movement.horizontalSpeed * delta/1000;
    this.player.y += this.player.movement.verticalSpeed * delta/1000;

    // enemy overlap check
    let playerRect = this.player.getBounds();

    for (let i = 0; i < this.enemies.length; i++) {
        let enemyRect = this.enemies[i].getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            restart();
        }
    }

    if(this.player.movement.verticalSpeed > 0){
        this.player.setTexture('chickenDown');
    }

    if(this.player.x > config.width || this.player.y > config.height || this.player.y < 0){
        restart();
    }
};

function restart(){
    console.log('you died!');
    // restart the Scene
    gameScene.scene.restart();
}

// create a new game, pass the configuration
let game = new Phaser.Game(config);
