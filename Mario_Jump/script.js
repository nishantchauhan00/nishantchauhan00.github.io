let game_container = document.querySelector(".game_container");
let score_box = document.querySelector(".score");
// game_container.setAttribute(
//     "style", 
//     "flex: 0.7;"
// );
// document.querySelector(".score_board").setAttribute("style", "flex:0.3;");

let fruit_config = {
    amount: 8
}

let player_config = {
    score: 0,
    speed: 200,
    jump_speed: 260,
}

let config = {
    type: Phaser.AUTO,
    parent: "game_canvas_container",
    width: game_container.clientWidth,
    height: game_container.clientHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

let game = new Phaser.Game(config);


function preload() {
    this.load.spritesheet('background', "./assets/Backgrounds_Animated.png", {
        frameWidth: 513,
        frameHeight: 433
    });
    this.load.spritesheet('berries', "./assets/Berries.png", {
        frameWidth: 16,
        frameHeight: 16
    });
    this.load.spritesheet('player', "./assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
    });
    this.load.image('blue_brick', "./assets/Blue_Brick.png", );
    this.load.image('blue_block', "./assets/Blue_Block.png", );
}

function create() {
    const W = game.config.width;
    const H = game.config.height;

    // 
    //                  background
    let background = this.add.sprite(0, 0, 'background', 0);
    background.setOrigin(0, 0.1);
    background.displayWidth = W;
    background.displayHeight = H;
    background.depth = -1;
    this.anims.create({
        key: "background_animation",
        frames: this.anims.generateFrameNumbers('background', {
            start: 0,
            end: 3
        }),
        repeat: -1,
        frameRate: 8
    });
    background.anims.play("background_animation", true);

    // 
    //                  surface
    // brick is of 2:1 or 32*16px
    let ground = this.add.tileSprite(0, 0.9 * H, W, 0.1 * H, 'blue_brick');
    ground.scale = 1.5;
    ground.setOrigin(0, 0);
    ground.depth = 2;
    this.physics.add.existing(ground, true);

    // 
    //                  Blocks
    // block is of 1:1 or 14*14px
    let block = this.physics.add.staticGroup();
    block.create(0.4 * W, 0.65 * H, 'blue_block').setScale(10, 10).refreshBody();
    block.create(0.65 * W, 0.45 * H, 'blue_block').setScale(10, 10).refreshBody();
    block.create(0.9 * W, 0.25 * H, 'blue_block').setScale(10, 10).refreshBody();

    // 
    //                  Berries
    // block is of 1:1 or 14*14px
    const berry_colors = ["red", "pink", "green"]
    berry_colors.forEach((el, i) => {
        this.anims.create({
            key: `berries_animation_${el}`,
            frames: this.anims.generateFrameNumbers(
                "berries", {
                    frames: [0 + i, 3 + i, 6 + i, 9 + i]
                }
            ),
            // frames: [{key: "berries", frame:[]}]
            duration: 600,
            frameRate: 4,
            repeat: -1,
        });
    });
    let berries = [];
    for (let i = 0; i < fruit_config.amount; i++) {
        let berry_color_index = Math.floor(Phaser.Math.FloatBetween(0, 3));
        let berry_color = berry_colors[berry_color_index];
        let x = Math.floor(Phaser.Math.FloatBetween(150, W - 80));
        let y = Math.floor(Phaser.Math.FloatBetween(50, 100));
        let berry = this.physics.add.sprite(x, y, "berries", berry_color_index);

        berry.depth = 4
        berry.setScale(1.5, 1.5);
        berry.anims.play(`berries_animation_${berry_color}`, true);
        berries.push(berry);
    }
    berries.forEach(el => {
        el.setBounce(Phaser.Math.FloatBetween(0.35, 0.65));
    });

    // 
    //                  player
    // whole sprite of 288*48   and  single player of 32*48
    this.anims.create({
        key: "player_anim_left",
        frames: this.anims.generateFrameNumbers(
            "player", {
                start: 0,
                end: 3
            }
        ),
        duration: 500,
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: "player_anim_center",
        frames: this.anims.generateFrameNumbers(
            "player", {
                frames: [4]
            }
        ),
        frameRate: 1
    });
    this.anims.create({
        key: "player_anim_right",
        frames: this.anims.generateFrameNumbers(
            "player", {
                start: 5,
                end: 8
            }
        ),
        duration: 500,
        frameRate: 4,
        repeat: -1
    });
    this.player = this.physics.add.sprite(50, 20, "player", 4);
    this.player.depth = 5;
    this.player.setScale(1.4, 1.4);
    this.player.setBounce(0.3);
    this.player.setCollideWorldBounds(true);


    // 
    //                  for key inputs
    this.key_input = this.input.keyboard.createCursorKeys();


    // 
    //                  colliders
    this.physics.add.collider(block, berries);
    this.physics.add.collider(ground, berries);
    this.physics.add.collider(this.player, block);
    this.physics.add.collider(this.player, ground);

    // 
    //                  overlap
    this.physics.add.overlap(this.player, berries, scoreAdder, null, this);

}

function update() {
    if (this.key_input.up.isDown || this.key_input.space.isDown) {
        this.player.setVelocityY(-player_config.jump_speed);
        this.player.anims.play("player_anim_center");
    } else if (this.key_input.left.isDown) {
        this.player.setVelocityX(-player_config.speed);
        this.player.setVelocityY(player_config.jump_speed);
        this.player.anims.play("player_anim_left", true);

    } else if (this.key_input.right.isDown) {
        this.player.setVelocityX(player_config.speed);
        this.player.setVelocityY(player_config.jump_speed);
        this.player.anims.play("player_anim_right", true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play("player_anim_center");
    }
}

function scoreAdder(player, berry) {
    player_config.score++;
    score_box.innerHTML = player_config.score;
    berry.disableBody(true, true);
    if(player_config.score == fruit_config.amount){
        document.querySelector(".final_score").innerText = `Score - ${player_config.score}`;
        document.querySelector(".page").setAttribute('style', "opacity: 0.5; z-index: -5;");
        document.querySelector(".card").setAttribute('style', "z-index: 5;");
    }
}