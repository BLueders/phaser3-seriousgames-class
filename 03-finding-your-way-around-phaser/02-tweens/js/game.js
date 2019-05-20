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

    makeInteractive(this.coin);

};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
};

function makeInteractive(item){
    item.setInteractive();
    item.on('pointerdown', function(pointer){

        gameScene.plingSound.play();
        resetItemState(item);
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
    });
    item.on('pointerover', function(pointer){
        resetItemState(item);
        item.hoverTweenIn = gameScene.tweens.add({
            targets: item,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 1,
            duration: 200,
        });
    });
    item.on('pointerout', function(pointer){
        resetItemState(item);
        item.hoverTweenOut = gameScene.tweens.add({
            targets: item,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 200,
            onUpdate: function() {
            }
        });
    });
}

function resetItemState(item){
    if(item.hoverTweenOut){
        item.hoverTweenOut.remove();
    }
    if(item.onClickTween){
        item.onClickTween.remove();
    }
    if(item.hoverTweenIn){
        item.hoverTweenIn.remove();
    }
}


