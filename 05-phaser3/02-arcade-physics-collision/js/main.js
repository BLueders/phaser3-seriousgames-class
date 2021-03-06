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
    this.load.image('metalblock', 'assets/images/metalblock2.png');
    this.load.image('woodblock', 'assets/images/woodblock.png');
};

gameScene.create = function () {
    this.duck = this.physics.add.sprite(400, 100, 'duck');
    this.duck.setVelocity(0, 200);
    this.duck.setBounce(0, 1);
    this.duck.setCollideWorldBounds(true);

    this.block = this.physics.add.sprite(400, 300, 'woodblock');
    this.block.setBounce(0, 1);
    this.block.setCollideWorldBounds(true);

    // tell the physics objects to resolve collisions
    this.physics.add.collider(this.block, this.duck);
};

gameScene.update = function () {
    this.duck.flipX = this.duck.body.velocity.x > 0;
};




