let gameScene = new Phaser.Scene('Game');
let winScene = new Phaser.Scene('Win');

let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 400,
    height: 400,
    scene: [gameScene, winScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {y: 200}
        }
    }
};
let game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('duck', 'assets/rubber_duck.png');
    this.load.image('coin', 'assets/coin-20dkk.png');
};

gameScene.init = function () {

};

gameScene.create = function () {
    this.cameras.main.setBackgroundColor("#000000");

    this.player = new Player(this, 100, 100);

    this.coin = this.physics.add.sprite(200,200, 'coin');
    this.coin.setImmovable(true);
    this.coin.body.allowGravity = false;
    this.coin.winsGame = true;

    this.physics.add.overlap(this.player, this.coin, winGame);
};

function winGame(objectA, objectB){
    if(objectA.winsGame || objectB.winsGame){
        //gameScene.scene.start('Win');
        gameScene.scene.launch('Win');
    }
}

gameScene.update = function (time, delta) {
    this.player.update();
};

// Win Scene
winScene.create = function (){
    this.add.text(100,100,"YOU WIN!");
}
