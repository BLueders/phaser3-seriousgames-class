

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y){
        super(scene, x, y, 'duck');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.speed = 100;
    }

    update(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        if(this.cursors.right.isDown){
            this.setVelocityX(this.speed);
        }
        else if(this.cursors.left.isDown){
            this.setVelocityX(-this.speed);
        }
        else if(this.cursors.up.isDown){
            this.setVelocityY(-this.speed);
        }
        else if(this.cursors.down.isDown){
            this.setVelocityY(this.speed);
        }
    }
}
