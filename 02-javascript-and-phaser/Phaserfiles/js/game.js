// create new scene
let gameScene = new Phaser.Scene("Game");

// set the configuration of the game
let config = {
    type: Phaser.AUTO, //user WebGL if available, else use Canvas
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

gameScene.init = function(){
    this.playerSpeed = 2;
    this.enemyMinSpeed = 0.5;
    this.enemyMaxSpeed = 2;
    this.isTerminated = false;
};

gameScene.preload = function(){
    // preload all assets
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};

gameScene.create = function(){
    // grab width and height for later use
    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    // create background
    let bg = this.add.sprite(0,0, 'background');
    bg.setPosition(0 ,0);
    bg.setOrigin(0,0);
    bg.depth = 0;

    // create player
    this.player = this.add.sprite(50, this.gameH/2, 'player');
    this.player.setScale(0.7);
    this.player.depth = 10;

    // create treasure chest (goal)
    this.goal = this.add.sprite(this.gameW - 80, this.gameH / 2, 'goal');
    this.goal.setScale(0.7);
    this.goal.depth = 5;

    // create a single enemy
    // this.enemy = this.add.sprite(120, this.gameH / 2, 'enemy');
    // this.enemy.flipX = true;
    // this.enemy.setScale(0.7);
    // let dir = Math.random() < 0.5? 1 : -1;
    // let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    // this.enemy.speed = speed * dir;

    // create a group of enemies
    this.enemies = this.add.group({
        key:'enemy',
        repeat: 3,
        setXY: {
            x: 130,
            y: 100,
            stepX: 120,
            stepY: 20
        }
    });

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        enemy.flipX = true;
        enemy.setScale(0.7);
        let dir = Math.random() < 0.5? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = speed * dir;
    }, this);

    //add the first sample enemy
    //this.enemies.add(this.enemy);
    this.cameras.main.fadeIn(500);
};

gameScene.update = function(){

    if(this.isTerminated)
    {
        return;
    }
    
    // player movement
    if(this.input.activePointer.isDown){
        this.player.x += this.playerSpeed;
    }

    // collision detection for goal
    // let playerRect = this.player.getBounds();
    // let goalRect = this.goal.getBounds();

    let playerCircle = new Phaser.Geom.Circle(this.player.x, this.player.y, this.player.width/3);
    let goalCircle = new Phaser.Geom.Circle(this.goal.x, this.goal.y, this.goal.width/3);

    if(Phaser.Geom.Intersects.CircleToCircle(playerCircle, goalCircle)){
        return this.gameOver();
    }

    let enemyArray = this.enemies.getChildren();

    // enemy movement
    for (var i = 0; i < enemyArray.length; i++) {
        if(enemyArray[i].y >= this.gameH - 80){
            enemyArray[i].speed = -1 * Math.abs(enemyArray[i].speed);
        }
        if(enemyArray[i].y <= 80){
            enemyArray[i].speed = Math.abs(enemyArray[i].speed);
        }

        enemyArray[i].y += enemyArray[i].speed;
        // let enemyRect = enemyArray[i].getBounds();
        let enemyCircle = new Phaser.Geom.Circle(enemyArray[i].x, enemyArray[i].y, enemyArray[i].width/3);
        if(Phaser.Geom.Intersects.CircleToCircle(playerCircle, enemyCircle)){
            return this.gameOver();
        }
    }

    // enemy movement
    // if(this.enemy.y >= this.gameH - 80){
    //     this.enemy.speed = -1 * Math.abs(this.enemy.speed);
    // }
    // if(this.enemy.y <= 80){
    //     this.enemy.speed = Math.abs(this.enemy.speed);
    // }
    //
    // this.enemy.y += this.enemy.speed;
};

gameScene.gameOver = function(){

    this.isTerminated = true;

    this.cameras.main.shake(200, 0.01);
    this.cameras.main.on('camerashakecomplete', function(camera, context){
        this.cameras.main.fadeOut(500);
        // pass in context of the scene;
    }, this);

    this.cameras.main.on('camerafadeoutcomplete', function(camera, context){
        this.scene.restart();
        // pass in context of the scene;
    }, this);
};
