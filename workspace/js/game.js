var gameScene = new Phaser.Scene('Game');

var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800,
    height: 600,
    scene: gameScene
};

var game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('duck', 'assets/rubber_duck.png');
    this.load.image('coin', 'assets/coin-20dkk.png');
};

gameScene.create = function () {
    this.duck = this.add.sprite(200,100,'duck');
    this.duck.setScale(2,2);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.evilDuck = this.add.sprite(600,500,'duck');

    this.evilDuck.tint = 0xff0000; // rrggbb

};

gameScene.update = function () {
    if(this.cursorKeys.up.isDown){
        this.duck.y -= 1;
    }
    if(this.cursorKeys.down.isDown){
        this.duck.y += 1;
    }
    if(this.cursorKeys.right.isDown){
        this.duck.x += 1;
    }
    if(this.cursorKeys.left.isDown){
        this.duck.x -= 1;
    }

    let duckRect = this.duck.getBounds();
    let evilDuckRect = this.evilDuck.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(duckRect, evilDuckRect)){
        this.duck.destroy();
    }

};
