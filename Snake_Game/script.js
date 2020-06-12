function game() {
    canvas = document.getElementById("game_box");
    score_chart = document.querySelector(".score");
    snake_len = document.querySelector(".slen");
    // context is an object that exposes an API for drawing on the 
    // canvas. Currently, only the CanvasRenderingContext2D object is 
    // supported, and for that the contextId is '2d'. The result of this 
    // call will be null if the given context ID is not supported
    gamec_context = canvas.getContext('2d');
    score = 0;
    game_over = false;
    canvas_width = canvas.width;
    canvas_height = canvas.height;

    snake = {
        len: 4,
        coords: [],
        ball_coords: {
            X: 0,
            Y: 0
        },
        size: 10,
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
            if (this.coords[0].y < 0 || this.coords[0].x < 0 || this.coords[0].x > boundary_x || this.coords[0].y > boundary_y) {
                game_over = true;
                return;
            }
            var headX = this.coords[0].x,
                headY = this.coords[0].y;
            if (this.ball_coords.X - 1 <= headX && headX <= this.ball_coords.X &&
                this.ball_coords.Y - 1 <= headY && headY <= this.ball_coords.Y) {
                updateBallCoords();
                score++;
                this.len++;
                score_chart.innerText = score;
                snake_len.innerText = this.len;
            } else {
                this.coords.pop();
            }
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
        }
    };

    snake.createSnake();
    updateBallCoords();
    snake_len.innerText = snake.len;

    function changeDirection(event) {
        if (event.key === "ArrowUp") {
            snake.direction = "up";
        } else if (event.key === "ArrowDown") {
            snake.direction = "down";
        } else if (event.key === "ArrowLeft") {
            snake.direction = "left";
        } else if (event.key === "ArrowRight") {
            snake.direction = "right";
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
        document.querySelector(".page").setAttribute('style', "opacity: 0.3; z-index: -5;");
        document.querySelector(".card").setAttribute('style', "z-index: 5;");
        return;
    }
    updateCoords();
    renderCanvas();
}

var loop;
document.addEventListener("DOMContentLoaded", function () {
    game();
    loop = setInterval(gameLoop, 200);
}, true);