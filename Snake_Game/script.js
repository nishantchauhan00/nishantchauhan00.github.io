// time in which canvas rerenders and coords get updated
snake_speed = {
    speed: 160,
    snake_speed_max: 90,
    single_change: 3
}
let cookies = document.cookie.split(';');

let max_score = 0;
if (cookies) {
    var fetched_max_score = (cookies.map(cookie => {
        if (cookie.startsWith("max_score")) {
            return cookie.split("=")[1]
        }
    }))[0];
    if (fetched_max_score) {
        max_score = fetched_max_score;
    }
}

function game() {
    max_score_box = document.querySelector(".max_score");
    canvas = document.getElementById("game_box");
    score_chart = document.querySelector(".score");
    snake_len = document.querySelector(".slen");
    up_arrow = document.querySelector(".up");
    left_arrow = document.querySelector(".left");
    right_arrow = document.querySelector(".right");
    down_arrow = document.querySelector(".down");

    // context is an object that exposes an API for drawing on the 
    // canvas. Currently, only the CanvasRenderingContext2D object is 
    // supported, and for that the contextId is '2d'. The result of this 
    // call will be null if the given context ID is not supported
    gamec_context = canvas.getContext('2d');
    parent_canvas = document.querySelector(".game_container");
    gamec_context.canvas.width = parent_canvas.clientWidth;
    gamec_context.canvas.height = parent_canvas.clientHeight;
    score = 0;
    game_over = false;
    canvas_width = canvas.width;
    canvas_height = canvas.height;
    toggle_flash = 0;

    snake = {
        len: 4,
        coords: [],
        ball_coords: {
            X: 0,
            Y: 0
        },
        size: 27,
        direction: "right",
        createSnake: function () {
            for (let i = this.len; i > 0; --i) {
                this.coords.push({
                    x: i,
                    y: 1
                });
            }
        },
        printSnake: function () {
            gamec_context.fillStyle = "#2c7002";
            for (let i = 0; i < this.len; i++) {
                gamec_context.fillRect(
                    this.coords[i].x * this.size,
                    this.coords[i].y * this.size,
                    this.size - 2,
                    this.size - 2
                );
            }
        },
        printBall: function () {
            // gamec_context.save();
            // gamec_context.globalCompositeOperation = 'destination-out';
            gamec_context.beginPath();
            gamec_context.arc(
                snake.ball_coords.X * this.size,
                snake.ball_coords.Y * this.size,
                snake.size / 2,
                0,
                2 * Math.PI
            );
            gamec_context.fillStyle = 'red';
            gamec_context.fill();
            // gamec_context.restore();
        },
        updateCoords: function () {
            var boundary_x = Math.round((canvas_width - 2 * this.size) / this.size);
            var boundary_y = Math.round((canvas_height - 2 * this.size) / this.size);
            // console.log(boundary_x, boundary_y);

            var headX = this.coords[0].x,
                headY = this.coords[0].y;
            // check for snake head hit ball
            if (this.ball_coords.X - 1 <= headX && headX <= this.ball_coords.X &&
                this.ball_coords.Y - 1 <= headY && headY <= this.ball_coords.Y) {
                updateBallCoords();
                changeSpeed();
                score++;
                this.len++;
                score_chart.innerText = score;
                snake_len.innerText = this.len;
                updateMaxScore();
            } else {
                this.coords.pop();
            }
            // check if snake hit itself
            this.coords.slice(1, -1).forEach(el => {
                if (el.x == headX && el.y == headY) {
                    game_over = true;
                    return;
                }
            });
            var nextX, nextY;
            if (this.direction === "up") {
                nextX = headX;
                nextY = headY - 1;
            } else if (this.direction === "down") {
                nextX = headX;
                nextY = headY + 1;
            } else if (this.direction === "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction === "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            this.coords = [{
                x: nextX,
                y: nextY
            }, ...this.coords];
            if (this.coords[0].y < 0 || this.coords[0].x < 0 || this.coords[0].x > boundary_x || this.coords[0].y > boundary_y) {
                game_over = true;
                return;
            }
        }
    };

    snake.createSnake();
    updateBallCoords();
    snake_len.innerText = snake.len;

    function arrowDefault() {
        up_arrow.setAttribute('style', `filter: invert(0.5);`);
        left_arrow.setAttribute('style', `filter: invert(0.5);`);
        right_arrow.setAttribute('style', `filter: invert(0.5);`);
        down_arrow.setAttribute('style', `filter: invert(0.5);`);
    }

    function changeDirection(event) {
        if (toggle_flash === 0) {
            // // for flash arrow remain same
            arrowDefault();
        }
        if (event.key === "ArrowUp") {
            snake.direction = "up";
            up_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "ArrowDown") {
            snake.direction = "down";
            down_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "ArrowLeft") {
            snake.direction = "left";
            left_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "ArrowRight") {
            snake.direction = "right";
            right_arrow.setAttribute('style', `filter: invert(0);`);
        } else if (event.key === "t") {
            toggle_flash = toggle_flash === 0 ? 1 : 0;
        }

        if (toggle_flash === 1) {
            // // for flashing once
            setTimeout(arrowDefault, 300);
        }
    };
    document.addEventListener("keydown", changeDirection);
};

function renderCanvas() {
    gamec_context.clearRect(
        0, 0, canvas_width, canvas_height
    );
    snake.printSnake();
    snake.printBall();
}


function updateCoords() {
    snake.updateCoords();
}

function updateBallCoords() {
    var ballX, ballY;
    ballX = Math.floor(Math.random() * ((canvas_width - 1.4 * snake.size) / snake.size));
    ballY = Math.floor(Math.random() * ((canvas_height - 1.4 * snake.size) / snake.size));
    if (ballX < 2) {
        ballX += 1;
    }
    if (ballY < 2) {
        ballY += 1;
    }
    snake.ball_coords.X = ballX;
    snake.ball_coords.Y = ballY;
}

function gameLoop() {
    if (game_over) {
        clearInterval(loop);
        document.querySelector(".final_score").innerText = `Score - ${score}`;
        document.querySelector(".page").setAttribute('style', "opacity: 0.5; z-index: -5;");
        document.querySelector(".card").setAttribute('style', "z-index: 5;");

        const expire_time = 60 * 60 * 24 * 365;
        document.cookie = `max_score=${max_score};max-age=${expire_time};`;
        return;
    }
    updateCoords();
    renderCanvas();
}

function updateMaxScore() {
    if (max_score < score) {
        max_score = score;
        max_score_box.innerText = score;
    }
}

function changeSpeed() {
    if (snake_speed.speed > snake_speed.snake_speed_max) {
        snake_speed.speed -= snake_speed.single_change;
        clearInterval(loop);
        loop = setInterval(gameLoop, snake_speed.speed);
    }
}

var loop;
document.addEventListener("DOMContentLoaded", function () {
    game();
    max_score_box.innerText = max_score;
    loop = setInterval(gameLoop, snake_speed.speed);
}, true);