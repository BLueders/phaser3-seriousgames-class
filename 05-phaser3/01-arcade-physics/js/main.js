let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto,
    width: 800,
    height: 600,
    scene: gameScene,
    backgroundColor: "#000000",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 200}
        }
    }
};

let game = new Phaser.Game(config);

gameScene.preload = function () {
   this.load.image('duck', 'assets/images/rubber_duck.png');
};

gameScene.create = function () {
    let duck = this.physics.add.sprite(435, 300, 'duck');
    duck.setCollideWorldBounds(true);
    duck.setBounce(1,1);

    let duck2 = this.physics.add.sprite(400, 100, 'duck');
    duck2.setCollideWorldBounds(true);
    duck2.setBounce(1,1);

    this.physics.add.collider(duck, duck2);
};

gameScene.update = function () {

};

// let config = {
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: true,
//             gravity: {y: 200}
//         }
//     },
//     title: 'Physics Example',
//     backgroundColor: '#000000'
// };
//
//
// gameScene.preload = function () {
//     this.load.image('duck', 'assets/images/rubber_duck.png');
// };
//
// gameScene.create = function () {
//     this.duck = this.physics.add.sprite(400, 100, 'duck');
//
//     this.duck.setVelocity(100, 200);
//     this.duck.setBounce(1, 1);
//     this.duck.setCollideWorldBounds(true);
//
// };
//
// gameScene.update = function () {
//     this.duck.flipX = this.duck.body.velocity.x > 0;
// };
//
//
//
//
//
