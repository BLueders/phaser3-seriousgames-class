// create a new scene
let gameScene = new Phaser.Scene('Game');

const gameVars = {
    coins: 0,
    stock: {
        count: 0,
        price: 100,
        currency: 1
    }
};

// set the configuration of the game
const config = {
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
    this.load.image('stockbutton', 'assets/buy-danskebank-stock.png');
    this.load.audio('pling', 'assets/pling.wav');
};

// called once after the preload ends
gameScene.create = function () {
    // create and position background
    this.cameras.main.setBackgroundColor("#000000");
    this.coin = this.add.sprite(600, 240, 'coin');
    this.plingSound = this.sound.add('pling');
    makeInteractive(this.coin, function(){
        gameScene.addCoins(20);
        gameScene.plingSound.play();
    });

    this.coinLabel = this.add.text(10, 10, "DKK: ", { fontFamily: '"Roboto Condensed"', fontSize: 20 });
    this.coinText = this.add.text(100, 10, "0", { fontFamily: '"Roboto Condensed"', fontSize: 20 });
    this.addCoins = function (numCoins){
        gameVars.coins += numCoins;
        this.coinText.text = "" + gameVars.coins;
    };

    this.updateUpgrades = function() {
        this.addCoins(gameVars.stock.count * gameVars.stock.currency);
    };

    this.time.addEvent({
        delay: 1000,  // ms
        callback:  this.updateUpgrades,
        //args: [],
        callbackScope: this,
        loop: true
    });

    this.stockLabel = this.add.text(10, 50, "Danske Bank Stock: ", { fontFamily: '"Roboto Condensed"', fontSize: 20 });
    this.stockText = this.add.text(180, 50, "0", { fontFamily: '"Roboto Condensed"', fontSize: 20 });
    this.tryAddStock = function (){
        if(gameVars.coins >= gameVars.stock.price) {
            gameVars.stock.count += 1;
            gameVars.coins -= gameVars.stock.price;
            this.stockText.text = "" + gameVars.stock.count;
            this.coinText.text = "" + gameVars.coins;
            return true;
        }
        return false;
    };

    this.buyStockButton = this.add.sprite(150, 240, 'stockbutton');

    makeInteractive(this.buyStockButton, function(){
        if(gameScene.tryAddStock()){
            gameScene.plingSound.play();
        }
    });
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
};

function makeInteractive(item, onClickCallback){
    item.setInteractive();
    item.on('pointerdown', function(pointer){
        onClickCallback();
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


