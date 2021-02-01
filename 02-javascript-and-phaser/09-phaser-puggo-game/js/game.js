// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  this.playerSpeed = 3;
};

// load assets
gameScene.preload = function(){
  this.load.image('puggo', 'assets/puggo.jpg');
  this.load.image('falco', 'assets/falco.jpg');
};

// called once after the preload ends
gameScene.create = function() {
  // create the player
  this.player = this.add.sprite(100, 150, 'puggo');
  this.player.setScale(0.5);

  this.enemy = this.add.sprite(550, 200, 'falco');

  this.cursorKeys = this.input.keyboard.createCursorKeys();
};

// this is called up to 60 times per second
gameScene.update = function(){

  // check for active input
  if(this.cursorKeys.right.isDown) {
    this.player.x += this.playerSpeed;
  }
  if(this.cursorKeys.left.isDown) {
    this.player.x -= this.playerSpeed;
  }
  if(this.cursorKeys.up.isDown) {
    this.player.y -= this.playerSpeed;
  }
  if(this.cursorKeys.down.isDown) {
    this.player.y += this.playerSpeed;
  }

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let enemyRect = this.enemy.getBounds();

  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
    console.log('puggo died!');

    // restart the Scene
    this.scene.restart();

    // make sure we leave this method
    return;
  }

};

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
