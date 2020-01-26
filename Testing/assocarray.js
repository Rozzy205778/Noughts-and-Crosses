const winningCombos = {
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

let board = ['x','.','x',
            '.','x','x',
            '.','.','.'];

function check(number, type) {
    const secondPositions = Object.keys(winningCombos[number]);
    for (const secondPosition of secondPositions) {
        if (board[secondPosition] == type) {
            let thirdPosition = winningCombos[number][secondPosition];
            if (board[thirdPosition] == type) {
                return "You win!";
            }
        }
    }
    return "You haven't won yet";
}

console.log(check(8, 'x'));
console.log(check(8, 'o'));