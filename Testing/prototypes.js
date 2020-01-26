function Board() {
    this.board = 
    [' ',' ',' ',
    ' ',' ',' ',
    ' ',' ',' ']
}

Board.prototype.addinput = function(number, type) {
    if (this.board[number] == ' ') {
        this.board[number] = type;
        this.check(number, type)
    } else {
        console.log("This index has already been taken.");
    }
};

Board.prototype.check = function(number, type) {
    console.log(number + type);
};

Board.prototype.display = function() {
    let toDisplay = this.board.map((char, index) => {
        if (index == 0) {
            return '|' + char + '|';
        } else if (index % 3 == 0) {
            return '\n|' + char + '|';
        } else {
            return char + '|';
        }
    }).join("");
    console.log(toDisplay);
}

let board1 = new Board;
board1.addinput(1, 'x');
board1.display();
board1.addinput(1, 'x');