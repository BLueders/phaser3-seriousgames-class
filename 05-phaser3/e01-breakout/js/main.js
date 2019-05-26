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
    scene: [bootScene, loadingScene, homeScene, gameScene],
    backgroundColor: '#000000'
};

let score = 0;
let gameOver = false;

let game = new Phaser.Game(config);

gameScene.create = function ()
{
    //  Input Events
    let cursors = this.input.keyboard.createCursorKeys();

    // The paddle
    this.paddle = new Paddle(this,100, config.height-100, cursors);

    this.ball = this.add.existing(new Ball(this,config.width/2, config.height/2));
    // this.ball = this.physics.add.sprite(config.width/2, config.height/2, 'ball');
    // this.ball.setBounce(1,1);
    // this.ball.setVelocity(200, 400);
    // this.ball.setCollideWorldBounds(true);

    this.blocks = [];
    makeBlocks(3, this.blocks);
    //  The score
    this.scoreText = this.add.text(16, config.height - 48, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    this.physics.add.collider(this.ball, this.blocks, onHitBlock, null, this);
    this.physics.add.collider(this.ball, this.paddle);
};

gameScene.update = function (time, delta)
{
    if (gameOver)
    {
        return;
    }
    this.paddle.update(time, delta);
    this.ball.update(time, delta);
};

function onHitBlock (ball, block)
{
    block.disableBody(true, true);
    //  Add and update the score
    score += 10;
    this.scoreText.setText('Score: ' + score);

    // check if all stars are collected
    let hasActiveStars = false;
    this.blocks.forEach(function(b){
       if(b.active){
           hasActiveStars = true;
       }
    });

    if (!hasActiveStars)
    {
        makeBlocks(3,this.blocks);
    }
}

function makeBlocks(lines, blocksArray){

    blocksArray.forEach( function (block) {
        block.destroy();
    });
    blocksArray.length = 0;

    let blockHeight = 60;
    let blockWidth = 80;
    let blocksPerLine = config.width / blockWidth;
    let images = ["metalblock", "metalblock2", "woodblock", "redblock"];
    for(let i = 0; i < lines; i++){
        for(let j = 0; j < blocksPerLine; j++) {
            let image = images[Math.floor(Math.random()*images.length)];
            let block = gameScene.physics.add.image(blockWidth/2 + j * blockWidth, blockHeight/2 + i * blockHeight, image);
            block.body.allowGravity = false;
            block.setImmovable();
            blocksArray.push(block);
        }
    }
}
