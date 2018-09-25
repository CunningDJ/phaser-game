'use strict';

var Adventurer = {};

Adventurer.name = 'adventurer';

Adventurer.img = "/img/sprite/adv/adventurer-sheet.png";

Adventurer.action = {
    STAND: 'stand',
    KNEEL: 'kneel',
    RUN: 'run',
    JUMP: 'jump',

    ROLL_FALL: 'rollfall',
    FALL_DIAG: 'fall-diag',
    SLIDE: 'slide',
    FALL_STRAIGHT: 'fall-straight',
    LAND: 'land',

    STAND_SWORD: 'stand-sword',

    UPPERCUT: 'uppercut',
    SLASH: 'slash',
    SPIN_ATTACK: 'spin-attack',

    AIR_SLASH: 'air-slash',
    AIR_UPPERCUT: 'air-uppercut',
    AIR_DOWN_SLASH: 'air-down-slash'
}

// ATLAS

Aventurer.atlas = (function() {
    var atlas = {};
    map.meta = {
        "app": "https://github.com/CunningDJ/phaser-game",
        "version": "1.0",
        "image": "/img/sprite/adv/adventurer-sheet.png",
        "format": "RGBA8888",
        "size": {"w":354,"h":592},
        "scale": "1",
        //"smartupdate": "$TexturePacker:SmartUpdate:b6887183d8c9d806808577d524d4a2b9:1e240ffed241fc58aca26b0e5d350d80:71eda69c52f7d9873cb6f00d13e1e2f8$"
    };

    var frameW = 51;
    var frameH = 37;

    atlas.frames = [];

    // standing
    // -> r1;c1:4
    var standFrames = makeFrameObjects(Adventurer.action.STAND, frameH, frameW, 1, 1, 1, 4)
    atlas.frames.concat(standFrames);
    Adventurer.sprite = game.add.sprite(frameH, frameW, Adventurer.name, standFrames[0].filename);
    Adventurer.sprite.animations.add(Adventurer.action.STAND, Phaser.Animation.generateFrameNames(Adventurer.name, { prefix: Adventurer.action.STAND, start: 1, end: standFrames.length }), 30, true);
    //Adventurer.sprite.animations.play('swim');


    // kneeling
    // r1;c5:7, r2:c1
    var knl = makeFrameObjects(Adventurer.action.KNEEL, frameH, frameW, 1, 1, 5, 7);
    knl.concat(makeFrameObjects(Adventurer.action.KNEEL, frameH, frameW, 2, 2, 1, 1, knl.length+1));
    atlas.frames.concat(knl);
    Adventurer.sprite.animations.add(Adventurer.action.KNEEL, Phaser.Animation.generateFrameNames(Adventurer.name, { prefix: Adventurer.action.KNEEL, start: 1, end: knl.length }), 30, true);


    // running
    // r2;c2:7
    atlas.frames.concat(makeFrameObjects(Adventurer.action.RUN, frameH, frameW, 2, 2, 2, 7));


    // jump
    // r3;c1:4
    atlas.frames.concat(makeFrameObjects(Adventurer.action.JUMP, frameH, frameW, 3, 3, 1, 4));


    // roll fall
    // r3;c5:7,r4;c1
    var rf = makeFrameObjects(Adventurer.action.ROLL_FALL, frameH, frameW, 3, 3, 5, 7);
    rf.concat(makeFrameObjects(Adventurer.action.ROLL_FALL, frameH, frameW, 4, 4, 1, 1, rf.length+1));
    atlas.frames.concat(rf);


    // fall (diagonal)
    // r4;c2:3
    atlas.frames.concat(makeFrameObjects(Adventurer.action.FALL_DIAG, frameH, frameW, 4, 4, 2, 3));

    // slide
    // r4;4:7, r5;c1
    var sl = makeFrameObjects(Adventurer.action.SLIDE, frameH, frameW, 4, 4, 4, 7);
    sl.concat(makeFrameObjects(Adventurer.action.SLIDE, frameH, frameW, 5, 5, 1, 1, sl.length+1));
    atlas.frames.concat(sl);


    // fall (straight)
    // r5;c2:5
    atlas.frames.concat(makeFrameObjects(Adventurer.action.FALL_STRAIGHT, frameH, frameW, 5, 5, 2, 5));


    // landing (straight)
    // r5;c6:7, r6;c1:3
    var ls = makeFrameObjects(Adventurer.action.LAND, frameH, frameW, 5, 5, 6, 7);
    ls.concat(makeFrameObjects(Adventurer.action.LAND, frameH, frameW, 6, 6, 1, 3, ls.length+1));
    atlas.frames.concat(ls);


    // standing (sword)
    // r6;c4:7
    atlas.frames.concat(makeFrameObjects(Adventurer.action.STAND_SWORD, frameH, frameW, 6, 6, 4, 7));


    // uppercut
    // r7;c1:7
    atlas.frames.concat(makeFrameObjects(Adventurer.action.UPPERCUT, frameH, frameW, 7, 7, 1, 7));


    // slash
    // r8;c1:4
    atlas.frames.concat(makeFrameObjects(Adventurer.action.SLASH, frameH, frameW, 8, 8, 1, 4));


    // spin attack
    // r8;c5:7, r9;c1:3
    var spa = makeFrameObjects(Adventurer.action.SPIN_ATTACK, frameH, frameW, 8, 8, 5, 7);
    spa.concat(makeFrameObjects(Adventurer.action.SPIN_ATTACK, frameH, frameW, 9, 9, 1, 3, spa.length+1));
    atlas.frames.concat(spa);


    // air slash
    // r14;c6:7, r15;c1:2
    var ars = makeFrameObjects(Adventurer.action.AIR_SLASH, frameH, frameW, 14, 14, 6, 7);
    ars.concat(makeFrameObjects(Adventurer.action.AIR_SLASH, frameH, frameW, 15, 15, 1, 2, ars.length+1));
    atlas.frames.concat(ars);


    // air uppercut
    // r15;c3:5
    atlas.frames.concat(makeFrameObjects(Adventurer.action.AIR_UPPERCUT, frameH, frameW, 15, 15, 3, 5));


    // air down slash
    // r15;6:7,r16;c1:4
    var ads = makeFrameObjects(Adventurer.action.AIR_DOWN_SLASH, frameH, frameW, 15, 15, 6, 7);
    ads.concat(makeFrameObjects(Adventurer.action.AIR_DOWN_SLASH, frameH, frameW, 16, 16, 1, 4, ads.length+1));
    atlas.frames.concat(ads);

    return atlas;
})()


function makeFrameObjects(prefix, frameH, frameW, rowMin, rowMax, colMin, colMax, initialFrameNumber) {
    var frames = [];

    var frameNumber;
    if (initialFrameNumber !== undefined) {
        frameNumber = initialFrameNumber;
    } else {
        frameNumber = 1;
    }

    var x, y;
    for (var r = rowMin; r < rowMax + 1; r++) {
        for (var c = colMin; c < colMax + 1; c++) {
            x = (r-1)*frameH;
            y = (c-1)*frameW;

            frames.push({
                filename: prefix + String(frameNumber),
                frame: { x: x, y: y, h: frameH, w: frameW},
                rotated: false,
                trimmed: true,
                spriteSourceSize: { x:0, y:0, h:frameH, w:frameW }
                sourceSize: { h:frameH, w:frameW }
            });
            frameNumber++;
        }
    }
    return frames;
}

// Adventurer: Animations

/*
Adventurer.sprite = game.add.sprite(330, 100, 'seacreatures');
octopus.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
octopus.animations.play('swim');
*/
