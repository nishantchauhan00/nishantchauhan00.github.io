let game_container = document.querySelector("#phaser_game");

let config = {
    type: Phaser.AUTO,
    parent: "phaser_game",
    width: game_container.clientWidth,
    height: game_container.clientHeight,
    scene: {
        preload: preload,
        create,
        update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('pointer', './assets/pointer.png');
    this.load.image('wheel', './assets/wheel.png');
    this.load.audio('rotate', "./assets/rotate_single.mp3");
    this.load.audio('end', 'assets/end.mp3');
}

function create() {
    let height = game.config.height;
    let width = game.config.width;
    this.wheel = this.add.image(width / 2, height / 2, 'wheel');
    if (width < 400) {
        this.pointer = this.add.image(width / 2, 23, 'pointer');
        this.wheel.setScale(0.43);
        this.pointer.setScale(0.45);
    } else {
        this.pointer = this.add.image(width / 2, 43, 'pointer');
        this.wheel.setScale(0.9);
        this.pointer.setScale(0.9);
    }
    this.rotate_audio = this.sound.add('rotate');
    // this.rotate_audio.setLoop(true);
    this.end_audio = this.sound.add('end');

    this.rotating_currently = false;
    this.score = 0;
    this.score_selector = document.querySelector(".score");
    document.querySelector(".spin_btn_text").addEventListener("click", spinner.bind(this));
}

function update() {}

function spinner() {

    if (!this.rotating_currently) {
        let n = 10;
        let x = (Math.floor(Math.random() * (n))) + 1;
        let counter_audio = 0;
        this.rotating_currently = true;
        this.tweens.add({
            targets: this.wheel,
            duration: 3500,
            angle: 720 + x * (360 / n),
            ease: "Cubic",
            onUpdate: (initialize) => {
                counter_audio++;
                let random_num = Math.floor(Math.random() * 20);
                if (counter_audio % 7 === 0 && random_num < (3500 - Math.floor(initialize.elapsed)) / 100) {
                    this.rotate_audio.play();
                }
            },
            onComplete: () => {
                this.rotate_audio.stop();
                this.score += n - x + 1;
                this.score_selector.innerText = this.score;
                this.rotating_currently = false;
                this.end_audio.play();
            }
        });
    }
}