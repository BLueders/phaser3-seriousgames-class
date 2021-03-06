// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');

gameScene.gameData = {
    value: 5,
    playerPosX: 0,
    playerPosY: 0
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [bootScene, loadingScene, gameScene],
  title: 'Phaser3 Project',
  pixelArt: false, //Use anti-aliasing
  backgroundColor: '#ffffff'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

// some parameters for our scene
gameScene.init = function() {
    console.log("executing init() of game scene");
};
// ass all objects active from the start in the game in create
gameScene.create = function() {
    console.log("executing create() of game scene");
    // store width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    this.gameData.value += 1;

    console.log("data: " + this.gameData.value);

    // for now that is just the background
    this.background = this.add.sprite(0,0,'background');
    this.background.setOrigin(0,0);
    this.background.depth = -10;
    this.background.width = config.width;
    this.background.height = config.height;

    this.player = this.add.sprite(this.gameData.playerPosX, this.gameData.playerPosY, "duck");

    let text = this.add.text(gameWidth/2, gameHeight - 150, 'All done, ready to start!', {
        font: '40px Arial',
        fill: '#ffffff'
    });

    text.setOrigin(0.5, 0.5);
    text.depth = 10;

    this.input.keyboard.once("keydown", (event) => {
        this.gameData.playerPosX = this.player.x;
        this.gameData.playerPosY = this.player.y;
        this.scene.start("Loading");
    });
};
