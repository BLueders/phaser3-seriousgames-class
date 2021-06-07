let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 1
            }
        }
    },
    title: 'Physics Example',
    backgroundColor: '#000000'
};

let game = new Phaser.Game(config);

gameScene.preload = function () {
    this.load.image('duck', 'assets/images/rubber_duck.png');
};

gameScene.create = function () {
    this.duck = this.matter.add.sprite(400, 100, 'duck');
    this.duck.setBody({type:"circle", radius:20});

    this.duck.setBounce(1);
    this.duck.setFrictionAir(0);
    this.duck.setFriction(0);
    this.matter.world.setBounds();

    //var bottomWall = this.matter.bodies.rectangle(400, 400, 810, 30, { isStatic: true });
    var bottomWall = this.matter.bodies.rectangle(400, 400, 500, 30, { ignoreGravity: true });
    bottomWall.restitution = 1;
    bottomWall.friction = 0;
    this.matter.body.setAngularVelocity(bottomWall, 0.01);
    this.matter.world.add(bottomWall);


};

gameScene.update = function () {
    this.duck.flipX = this.duck.body.velocity.x > 0;
};
