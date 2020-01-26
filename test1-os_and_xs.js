const readline = require('readline');

class Board {
    constructor() {
        // Create empty board
        this.board = [
            ' ',' ',' ',
            ' ',' ',' '
            ,' ',' ',' '
        ]
    }
    display() {
    // Display board
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
}

class VerifyBoard extends Board {
    constructor() {
        super([arguments]);
        // Winning combinations to check
        this.winningCombos = {
            0: {1:2, 3:6, 4:8},
            1: {0:2, 4:7},
            2: {1:0, 4:7},
            3: {0:6, 4:5},
            4: {0:8, 1:7, 2:6, 3:5},
            5: {2:8, 4:3},
            6: {3:0, 4:2, 7:8},
            7: {4:1, 6:8},
            8: {4:0, 5:2, 7:6}
        };
    }
    check(number, type) {
        // Check for possible wins
        const secondPositions = Object.keys(this.winningCombos[number]);
        for (const secondPosition of secondPositions) {
            if (this.board[secondPosition] == type) {
                let thirdPosition = this.winningCombos[number][secondPosition];
                if (this.board[thirdPosition] == type) {
                    return true;
                }
            }
        }
        return false;
    }
}

class Game extends VerifyBoard {
    constructor() {
        super([arguments]);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }
    async startGame() {
    // Main loop
        this.startMessage()
        let turnCount = 1;
        let type = 'x';
        // Use readline to take in input in the terminal
        for await (const input of this.rl) {
            console.log("You entered " + input);
            let index = input - 1;
            // Where turnCount is even, type is x; where turnCount is odd, type is o
            // Check that the index hasn't already been filled
            if (this.board[index] == ' ') {
                this.board[index] = type;
                // Check if any of the winning combinations are true
                if (turnCount >= 5) {
                    if (this.check(index, type)) {
                        this.display();
                        console.log("You win!");
                        break;
                    } else if (turnCount >= 9) {
                        this.display();
                        console.log("Board is full and nobody has won. The result is a draw.");
                        break;
                    }
                }
                this.display();
                turnCount++;
                turnCount % 2 == 0 ? type = 'o' : type = 'x';
                console.log("Place " + type);
            } else if (typeof this.board[index] === 'undefined') {
                console.log("This place does not exist on the board. Please try again.");
            } else {
                console.log("This place has already been taken. Please try again.");
            }
        }
    }
    startMessage() {
        // Message when the game starts
        console.log("Os and Xs");
        console.log("|1|2|3|\n|4|5|6|\n|7|8|9|\nPlease type in the placement using the guide above.\n");
        console.log("Place x");
    }
}

const game1 = new Game;
game1.startGame();
