class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, cursorInput) {
        super(scene, x, y, 'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.cursorInput = cursorInput;
        //  Our player animations, turning, walking left and walking right.
        scene.anims.create({
            key: 'playerLeft',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'playerTurn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'playerRight',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(time, delta){
        if (this.cursorInput.left.isDown)
        {
            this.setVelocityX(-160);
            this.anims.play('playerLeft', true);
        }
        else if (this.cursorInput.right.isDown)
        {
            this.setVelocityX(160);
            this.anims.play('playerRight', true);
        }
        else
        {
            this.setVelocityX(0);
            this.anims.play('playerTurn');
        }

        if (this.cursorInput.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-330);
        }
    }
}