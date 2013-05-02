var c = document.getElementById("lightsOutCanvas");
var ctx = c.getContext("2d");
c.addEventListener("click", clickHandler);
ctx.fillStyle = "#ff0000";

function Game() {
    this.board = [];
    this.width = 5;
    this.height = 5;
    this.cellSize = 64;
    
    
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
}


var game = new Game();

function cell(x, y) {
    this.x = x;
    this.y = y;
}
    
function flipCells(cells) {
    for (var i = 0; i < cells.length; i++) {
        x = cells[i].x;
        y = cells[i].y;
        if (x >= 0 && x < game.width && y >= 0 && y < game.height) {
            game.board[x][y] = !game.board[x][y];
        }
    }
}

function getNeighbors(x, y) {
    var cells = [];
    cells.push(new cell(x, y));
    cells.push(new cell(x + 1, y));
    cells.push(new cell(x - 1, y));
    cells.push(new cell(x, y + 1));
    cells.push(new cell(x, y - 1));
    
    return cells;
}

function clickHandler(event) {
    x = Math.floor((event.clientX - c.offsetLeft) / game.cellSize);
    y = Math.floor((event.clientY - c.offsetTop) / game.cellSize);
    flipCells(getNeighbors(x, y));
    drawBoard();
}

function drawBoard() {
    for (var y = 0; y < game.board.length; y++) {
        for (var x = 0; x < game.board[y].length; x++) {
            if (game.board[x][y] == true) {
            ctx.fillStyle = "#ff0000";
            } else {
            ctx.fillStyle = "#000000";
            }
            ctx.fillRect(x * game.cellSize, y * game.cellSize, game.cellSize, game.cellSize); 
        }
    }
}

drawBoard();