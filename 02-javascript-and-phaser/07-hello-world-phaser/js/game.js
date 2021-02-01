// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // use WebGL if available, if not use Canvas
  width: 800,
  height: 480,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

gameScene.preload = function(){
     this.load.image('puggo', 'assets/puggo.jpg');
}

gameScene.create = function () {
    this.add.sprite(20,20,'puggo');
    this.add.sprite(50,50,'puggo');
}

gameScene.update = function(){

}
