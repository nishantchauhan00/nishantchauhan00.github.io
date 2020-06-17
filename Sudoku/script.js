let sudoku = [
    [6, 0, 3, 0, 0, 0, 0, 0, 4],
    [9, 2, 0, 6, 1, 0, 7, 0, 3],
    [0, 0, 0, 9, 0, 0, 2, 5, 0],
    [5, 0, 0, 0, 0, 8, 0, 0, 2],
    [0, 8, 0, 4, 3, 1, 0, 7, 0],
    [7, 0, 0, 5, 0, 0, 0, 0, 8],
    [0, 5, 1, 0, 0, 9, 0, 0, 0],
    [3, 0, 7, 0, 5, 2, 0, 6, 1],
    [8, 0, 0, 0, 0, 0, 9, 0, 5]
];

var solved = [];
var puzzles = [];

var remaining = 0;
var filled = 0;
var remaining_box = document.querySelector(".score_remaining");
var filled_box = document.querySelector(".score_filled");
var game_container = document.querySelector(".game_container");
var game_box = document.querySelector("#game_box");

const fetchSudoku = async () => {
    const response = await fetch("./assets/sudoku_puzzles.json");
    return response.json();
};

function updateFilledRemainingandCheckInput(sudoku, filled, remaining) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let x = row * 3 + i;
                    let y = col * 3 + j;
                    if (sudoku[x][y] == 0) {
                        let box_input = document.querySelector(`.input_${row}_${col}_${i}_${j}`);
                        if (!(box_input.value > 0 && box_input.value < 10)) {
                            box_input.value = "";
                        }
                        if (box_input.value == "") {
                            remaining++;
                        }
                    }
                }
            }
        }
    }
    filled = 81 - remaining;
    remaining_box.innerText = remaining;
    filled_box.innerText = filled;
}

function renderSudokuAnswer(sudoku, answers) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let x = row * 3 + i;
                    let y = col * 3 + j;
                    if (sudoku[x][y] == 0) {
                        document.querySelector(`.box_${row}_${col}_${i}_${j}`).innerText = answers[x][y];
                    }
                }
            }
        }
    }
}

function renderSudokuCheckAnswer(sudoku, answers) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let x = row * 3 + i;
                    let y = col * 3 + j;
                    if (sudoku[x][y] == 0) {
                        let box = document.querySelector(`.box_${row}_${col}_${i}_${j}`);
                        let box_input = document.querySelector(`.input_${row}_${col}_${i}_${j}`);
                        box.innerText = answers[x][y];
                        if (box_input.value == answers[x][y]) {
                            box.setAttribute("style", "background-color: #24b153b4;");
                        } else {
                            box.setAttribute("style", "background-color: #a82222b4;");
                        }
                    }
                }
            }
        }
    }
}

function renderSudoku(board) {
    let W = game_container.clientWidth;
    let H = game_container.clientHeight;
    let big_box = "";

    for (let row = 0; row < 3; row++) {
        let big_box_2 = "";
        for (let col = 0; col < 3; col++) {
            let medium_box = "";
            for (let i = 0; i < 3; i++) {
                let small_row = "";
                for (let j = 0; j < 3; j++) {
                    let x = row * 3 + i;
                    let y = col * 3 + j;
                    if (board[x][y] == 0) {
                        small_row += `<div class="small_box  box_${row}_${col}_${i}_${j}">
                        <input type="text" autocomplete="off"
                        maxlength="1" 
                        class="input_box input_${row}_${col}_${i}_${j}"></input>
                         </div>`;
                    } else {
                        small_row += `<div class="small_box filled_small_box">${board[x][y]}</div>`;
                    }
                }
                small_row = `<div class="small_row">${small_row}</div>`
                medium_box += small_row;
            }
            big_box_2 += `<div class="medium_box">${medium_box}</div>`;
        }
        big_box += `<div class="big_box_2">${big_box_2}</div>`;
    }
    game_box.innerHTML = `<div class="big_box">${big_box}</div>`;
}


function isSafe(board, row, col, val) {
    // check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == val || board[i][col] == val) {
            return false;
        }
    }

    let box_x = Math.floor(row / 3) * 3;
    let box_y = Math.floor(col / 3) * 3;
    // check box
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[box_x + i][box_y + j] == val) {
                return false;
            }
        }
    }

    return true;
}

function sudokuSolver(board, row, col) {
    // when game ends, as accouding to our indexes, rows are from 0 to 8
    // not 1 to 9, therefore when row = 9 it ends
    if (row == 9) {
        // ======= fill the board here =======
        return true;
    }

    // at the end of column of any row
    if (col == 9) {
        return sudokuSolver(board, row + 1, 0);
    }

    // if box is not 0, then it means it is already filled
    if (board[row][col] !== 0) {
        return sudokuSolver(board, row, col + 1);
    }

    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (sudokuSolver(board, row, col + 1)) {
                // if current num value works, then do not go for next num
                // value, leave it there. Thats how it is different from
                // naive approach. Although it save a lot much time but
                // upper bound time complexty is same as brute-force or naive
                return true;
            } else {
                // backtrack if num do not fit
                board[row][col] = 0;
            }
        }
    }
    // unsolvable
    return false;
}

function solve(sudoku) {
    sudokuSolver(sudoku, 0, 0);
}

// 
function newSudoku() {
    let found = false;
    while (!found) {
        let puzzle_num = Math.floor(Math.random() * puzzles.length);
        if (!solved.includes(puzzle_num)) {
            solved.push(puzzle_num);
            sudoku = puzzles[puzzle_num];
            found = true;
        } else if (puzzles.length == solved.length) {
            sudoku = puzzles[puzzle_num];
            found = true;
        }
    }
    startGame();
}

var new_board = [];
function startGame() {
    renderSudoku(sudoku);
    new_board = []
    new_board = sudoku.map(el => {
        return el.slice(0);
    });
    updateFilledRemainingandCheckInput(sudoku, filled, remaining);
    solve(new_board);
    update_interval = setInterval(() => {
        updateFilledRemainingandCheckInput(sudoku, filled, remaining)
    }, 1000);
}

function finish() {
    clearInterval(update_interval);
}

async function loadSudoku() {
    await fetchSudoku(sudoku).then(results => {
        puzzles = results.puzzle;
        puzzle_num = Math.floor(Math.random() * puzzles.length);
        solved.push(puzzle_num);
        sudoku = puzzles[puzzle_num];
    }).catch(err => {
        puzzles = sudoku;
        console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadSudoku();
    startGame();
    document.querySelector(".solve_text").addEventListener("click", () => {
        finish();
        renderSudokuAnswer(sudoku, new_board);
        return;
    }, once=true);
    document.querySelector(".submit_text").addEventListener("click", () => {
        finish();
        renderSudokuCheckAnswer(sudoku, new_board);
        return;
    }, once=true);
    document.querySelector(".new_text").addEventListener("click", () => {
        finish();
        newSudoku();
        return;
    }, once=true);
}, true);