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
    this.load.image('coin', 'assets/coin-20dkk.png');
    this.load.audio('pling', 'assets/pling.wav');

};

// called once after the preload ends
gameScene.create = function () {
    // create and position background
    this.cameras.main.setBackgroundColor("#000000");
    this.coin = this.add.sprite(0, 0, 'coin');
    this.plingSound = this.sound.add('pling');
    this.coin.x = config.width/2;
    this.coin.y = config.height/2;

    // add tweens
    this.coin.onClickTween = gameScene.tweens.add({
        targets: gameScene.coin,
        scaleX: 1.4,
        scaleY: 1.4,
        duration: 200,
        yoyo: true,
        ease: 'Quad.easeIn',
        onStart: function(){
            gameScene.coin.setScale(1.2, 1.2);
        }
    });
    this.coin.onClickTween.stop();

    this.coin.hoverTweenIn = gameScene.tweens.add({
        targets: gameScene.coin,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 200,
        onStart: function(){
            gameScene.coin.setScale(1, 1);
        }
    });
    this.coin.hoverTweenIn.stop();

    this.coin.hoverTweenOut = gameScene.tweens.add({
        targets: gameScene.coin,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        onStart: function(){
            gameScene.coin.setScale(1.2, 1.2);
        }
    });
    this.coin.hoverTweenOut.stop();

    this.coin.setInteractive();

    this.coin.on('pointerdown', function(pointer){
        gameScene.plingSound.play();
        gameScene.coin.hoverTweenOut.stop(0);
        gameScene.coin.hoverTweenIn.stop(0);
        gameScene.coin.onClickTween.restart();
    });

    this.coin.on('pointerover', function(pointer){
        gameScene.coin.hoverTweenOut.stop(0);
        gameScene.coin.onClickTween.stop(0);
        gameScene.coin.hoverTweenIn.restart();
        console.log("pointerout");
    });

    this.coin.on('pointerout', function(pointer){
        gameScene.coin.onClickTween.stop(0);
        gameScene.coin.hoverTweenIn.stop(0);
        gameScene.coin.hoverTweenOut.restart();
        console.log("pointerover");
    });
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {

};

function makeTweens(item){
    item.onClickTween = gameScene.tweens.add({
        targets: item,
        scaleX: 1.4,
        scaleY: 1.4,
        duration: 200,
        yoyo: true,
        ease: 'Quad.easeIn',
        onStart: function(){
            item.setScale(1.2, 1.2);
        }
    });
    item.onClickTween.stop();
}
