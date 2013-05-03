var c = document.getElementById("lightsOutCanvas");
var ctx = c.getContext("2d");
c.addEventListener("click", clickHandler);
ctx.fillStyle = "#ff0000";
ctx.strokeStyle = "#ffffff";

function cell(x, y) { //yay for half-assed tuple-ish things
    this.x = x;
    this.y = y;
}

function Game() {
    this.board = [];
    this.width = 5;
    this.height = 5;
    this.cellSize = 64;
      
    this.moveCount = 0;
      
    //  seed board with random on/off values
    this.init = function () {
        for (var y = 0; y < this.height; y++) {
            var row = [];
            for (var x = 0; x < this.width; x++) {
                if (Math.random() < .2) {
                    row.push(true);
                } else {
                    row.push(false);
                }
            }
            this.board.push(row);
        }
        this.drawBoard(); //paint the board for the first time
    }
    this.init();
}

function clickHandler (event) {
    x = Math.floor((event.clientX - c.offsetLeft) / game.cellSize);
    y = Math.floor((event.clientY - c.offsetTop) / game.cellSize);
    game.moveCount++;
    game.flipCells(game.getNeighbors(x, y));
    game.drawBoard();
    game.checkWinCondition();
}

Game.prototype.drawBoard = function () {
    for (var y = 0; y < this.board.length; y++) {
        for (var x = 0; x < this.board[y].length; x++) {
            if (this.board[x][y] == true) {
            ctx.fillStyle = "#ff0000";
            } else {
            ctx.fillStyle = "#000000";
            }
            ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize); 
        }
    }
}

Game.prototype.flipCells = function (cells) {
    for (var i = 0; i < cells.length; i++) {
        var x = cells[i].x;
        var y = cells[i].y;
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.board[x][y] = !this.board[x][y];
        }
    }
}

Game.prototype.getNeighbors = function (x, y) {
    var cells = [];
    cells.push(new cell(x, y));
    cells.push(new cell(x + 1, y));
    cells.push(new cell(x - 1, y));
    cells.push(new cell(x, y + 1));
    cells.push(new cell(x, y - 1));

    return cells;
}

Game.prototype.checkWinCondition = function () {
    for (var y = 0; y < this.board.length; y++) {
        for (var x = 0; x < this.board[y].length; x++) {
            if (this.board[x][y] == true) {
                return;
             }
        }
    }
    alert("A winnar is you, in " + this.moveCount + " moves.");
    c.removeEventListener("click", clickHandler);
}

var game = new Game();