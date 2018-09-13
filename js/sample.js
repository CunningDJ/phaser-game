'use strict';

// constants
var image = {
    STAR: 'star',
    BOMB: 'bomb',
    SKY: 'sky',
    GROUND: 'ground'
};

var sprite = {
    DUDE: 'dude'
};

var WALK_SPEED = 160;
var RUN_SPEED_BOOST = 2.5;
var JUMP_SPEED = 800;
var JUMP_SPEED_BOOST = 1.2;
var PLAYER_BOUNCE = 0.1;
var GRAVITY = 1100;

// globals
var platforms;
var player;
var cursors;

// game config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GRAVITY },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// initating Game
var game = new Phaser.Game(config);


// scene functions
function preload ()
{
    this.load.image(image.GROUND, ut.img('platform.png'));
    console.log('loading', ut.img('platform.png'))
    this.load.image(image.SKY, ut.img('sky.png'));
    this.load.image(image.BOMB, ut.img('bomb.png'));
    this.load.image(image.STAR, ut.img('star.png'));
    this.load.spritesheet(
        sprite.DUDE, 
        ut.spr('dude.png'),
        { frameWidth: 32, frameHeight: 48 }
    );
}


function create ()
{
    // Sky
    this.add.image(400, 300, image.SKY);
    //this.add.image(400, 300, image.STAR);


    // Platforms
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, image.GROUND).setScale(2).refreshBody();

    platforms.create(600, 400, image.GROUND);
    platforms.create(50, 250, image.GROUND);
    platforms.create(750, 220, image.GROUND);

    // Player
    player = this.physics.add.sprite(100, 450, sprite.DUDE);

    player.setBounce(PLAYER_BOUNCE);
    player.setCollideWorldBounds(true);

    // Player: animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(sprite.DUDE, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: sprite.DUDE, frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(sprite.DUDE, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Collision
    this.physics.add.collider(player, platforms);

    // cursors
    cursors = this.input.keyboard.createCursorKeys();

}


function update ()
{
    var playerVx;
    var playerVy;
    var jumping = (cursors.up.isDown && player.body.touching.down);

    if (cursors.left.isDown) {
        playerVx = -WALK_SPEED;
        //player.setVelocityX(-WALK_SPEED);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        playerVx = WALK_SPEED;
        //player.setVelocityX(WALK_SPEED);
        player.anims.play('right', true);
    } else {
        playerVx = 0;
        //player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (jumping) {
        playerVy = -JUMP_SPEED;
    }

    if (cursors.shift.isDown) {
        playerVx *= RUN_SPEED_BOOST;
        playerVy *= JUMP_SPEED_BOOST;
    }
    
    if (jumping) {
        player.setVelocityY(playerVy);
    }


    player.setVelocityX(playerVx);
}
