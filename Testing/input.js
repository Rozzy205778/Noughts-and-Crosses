const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputFunction = async () => {
    for await (const line of rl) {
        console.log(line)
    }
}

inputFunction();