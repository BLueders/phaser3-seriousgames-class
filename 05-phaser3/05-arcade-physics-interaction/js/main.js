let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 200}
        }
    },
    title: 'Physics Example',
    backgroundColor: '#000000'
};

let game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('duck', 'assets/images/rubber_duck.png');
    this.load.image('metalblock', 'assets/images/metalblock.png');
    this.load.image('metalblock2', 'assets/images/metalblock2.png');
    this.load.image('woodblock', 'assets/images/woodblock.png');
};

gameScene.create = function () {
    this.duck = this.physics.add.sprite(100, 100, 'duck');
    this.duck.setVelocity(50, 200);
    this.duck.setBounce(1, 1);
    this.duck.setCollideWorldBounds(true);

    this.blocks = this.physics.add.staticGroup();
    this.blocks.create(400, 300, 'metalblock');

    for (let i = 0; i < 20; i++) {
        let xPos = Phaser.Math.Between(0, config.width);
        let yPos = Phaser.Math.Between(0, config.height);
        this.blocks.create(xPos, yPos, 'metalblock');
    }

    // tell the physics objects to resolve collisions

    this.physics.add.overlap(this.duck, this.blocks, onBlockCollision, null, this);
};

gameScene.update = function () {
    this.duck.flipX = this.duck.body.velocity.x > 0;
};

function onBlockCollision(duck, block){
    block.disableBody(true, true);
}




