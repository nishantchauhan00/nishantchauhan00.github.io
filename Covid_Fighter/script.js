function game() {
    canvas = document.getElementById("game_box");
    score_chart = document.querySelector(".score");
    left_arrow = document.querySelector(".left");
    right_arrow = document.querySelector(".right");

    gamec_context = canvas.getContext('2d');
    parent_canvas = document.querySelector(".game_container");
    gamec_context.canvas.width = parent_canvas.clientWidth;
    gamec_context.canvas.height = parent_canvas.clientHeight;
    score = 0;
    image_size = 50;
    game_over = false;
    canvas_width = canvas.width;
    canvas_height = canvas.height;
    toggle_flash = 1;
    game_won = false;
    re_render_time = 100 //millisecond

    fighter = {
        fighter_coords: {
            X: image_size, // for now only horizontal movement allowed
            Y: canvas_height / 2
        },
        speed: 10,
        germs_coords: [{
                x: canvas_width / 5,
                y: image_size,
                speed: image_size / 3
            },
            {
                x: 2 * canvas_width / 5,
                y: image_size,
                speed: 2 * image_size / 3
            },
            {
                x: 3 * canvas_width / 5,
                y: image_size,
                speed: 3 * image_size / 3
            },
            {
                x: 4 * canvas_width / 5,
                y: image_size,
                speed: 4 * image_size / 3
            }
        ],
        gem: {
            x: canvas_width - 1.5 * image_size,
            y: canvas_height / 2
        },
        printFighter: function () {
            gamec_context.drawImage(fighter_image, this.fighter_coords.X, this.fighter_coords.Y, image_size, image_size);
        },
        printGem: function () {
            gamec_context.drawImage(gem_image, this.gem.x, this.gem.y, image_size, image_size);
        },
        printGerms: function () {
            this.germs_coords.forEach(el => {
                gamec_context.drawImage(germ_image, el.x, el.y, image_size, image_size);
            });
        },
        moveSnake: function () {
            if (this.fighter_coords.X > image_size && this.direction === "left") {
                this.fighter_coords.X -= this.speed;
            }
            if (this.fighter_coords.X < this.gem.x && this.direction === "right") {
                this.fighter_coords.X += this.speed;
            }
        },
        updateCoords: function () {
            this.germs_coords.forEach((el, index) => {
                if (score < index + 1 &&
                    (el.x < this.fighter_coords.X)) {
                    score = index + 1;
                    document.querySelector(".score").innerText = score;
                }
                if ((Math.abs(el.x - this.fighter_coords.X) < (4 * image_size / 5)) &&
                    (Math.abs(el.y - this.fighter_coords.Y) < (4 * image_size / 5))) {
                    game_over = true;
                    game_won = false;
                    return;
                }
            });
            if (this.gem.x - 2 <= this.fighter_coords.X) {
                game_over = true;
                game_won = true;
                return;
            }
        }
    };

    function load_images() {
        fighter_image = new Image();
        fighter_image.src = "./assets/superhero.png";
        germ_image = new Image();
        germ_image.src = "./assets/germ.png";
        gem_image = new Image();
        gem_image.src = "./assets/gem.svg";
        fighter_image.onload = () => {
            fighter.printFighter();
        }
        gem_image.onload = () => {
            fighter.printGem();
        }
        germ_image.onload = () => {
            fighter.printGerms();
        }
    };
    load_images();

    function arrowDefault() {
        left_arrow.setAttribute('style', `filter: invert(0.5);`);
        right_arrow.setAttribute('style', `filter: invert(0.5);`);
    }

    function changeDirectionAndArrow(event) {
        if (toggle_flash === 0) {
            // // for flash arrow remain same
            arrowDefault();
        }

        if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            fighter.direction = "right";
            fighter.moveSnake();
            right_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
            fighter.direction = "left";
            fighter.moveSnake();
            left_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "t") {
            toggle_flash = toggle_flash === 0 ? 1 : 0;
        }

        if (toggle_flash === 1) {
            // // for flashing once
            setTimeout(arrowDefault, 300);
        }
    };
    document.addEventListener("keydown", changeDirectionAndArrow);
};

function renderCanvas() {
    gamec_context.clearRect(
        0, 0, canvas_width, canvas_height
    );
    fighter.printFighter();
    fighter.printGem();
    fighter.printGerms();
}


function updateCoords() {
    fighter.updateCoords();
    updateGermsCoords();
}

function updateGermsCoords() {
    fighter.germs_coords.forEach((el, index) => {
        fighter.germs_coords[index].y += el.speed;
        if (fighter.germs_coords[index].y < image_size / 3 || fighter.germs_coords[index].y > canvas_height - (4 * image_size) / 3) {
            fighter.germs_coords[index].speed *= -1;
        }
    });
}

function gameLoop() {
    if (game_over) {
        clearInterval(loop);
        document.querySelector(".final_score").innerText = `Score - ${score}`;
        document.querySelector(".page").setAttribute('style', "opacity: 0.5; z-index: -5;");
        document.querySelector(".card").setAttribute('style', "z-index: 5;");
        if (game_won == true) {
            document.querySelector(".card_head").innerText = "You Won"
            document.querySelector(".try_again").innerText = "Play Again"
        }
        return;
    }
    updateCoords();
    renderCanvas();
}

var loop;
document.addEventListener("DOMContentLoaded", function () {
    game();
    loop = setInterval(gameLoop, re_render_time);
}, true);