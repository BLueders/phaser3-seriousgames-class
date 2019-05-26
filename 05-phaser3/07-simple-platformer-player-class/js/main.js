let gameScene = new Phaser.Scene("Game");

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: gameScene
};

let score = 0;
let gameOver = false;

let game = new Phaser.Game(config);

gameScene.preload = function ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
};

gameScene.create = function ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    //  Input Events
    let cursors = this.input.keyboard.createCursorKeys();
    // The player and its settings
    this.player = new Player(this,100, 450, cursors);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = [];
    for(let i = 0; i < 12; i++){
        let star = this.physics.add.sprite(12 + i * 70, 0, 'star');
        let bounciness = Phaser.Math.FloatBetween(0.4, 0.8);
        star.setBounceY(bounciness);
        this.stars.push(star);
    }

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

};

gameScene.update = function ()
{
    if (gameOver)
    {
        return;
    }
    this.player.update();
};

function collectStar (player, star)
{
    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    this.scoreText.setText('Score: ' + score);

    // check if all stars are collected
    let hasActiveStars = false;
    this.stars.forEach(function(star){
       if(star.active){
           hasActiveStars = true;
       }
    });

    if (!hasActiveStars)
    {
        //  A new batch of stars to collect
        this.stars.forEach(function(star){
            star.enableBody(true, star.x, 0, true, true);
        });
    }
}
