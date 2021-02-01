// create a new scene
let gameScene = new Phaser.Scene('Game');

// load assets
gameScene.preload = function(){
  // load images
  this.load.image('puggo', 'assets/puggo.jpg');
};

// called once after the preload ends
gameScene.create = function() {
  // create bg sprite
  let bg = this.add.sprite(20, 20, 'puggo');

  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;
};

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 800,
  height: 480,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
