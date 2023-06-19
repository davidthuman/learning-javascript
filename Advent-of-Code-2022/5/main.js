const fs = require("fs")

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`5/${path}.txt`)
    .toString()
    .split("\n\n");

let piles = input[0].split("\n");
const stackNumbering = piles[piles.length - 1];
const numStacks = +stackNumbering[stackNumbering.length - 2];
let stacks = [];

for (let k = 0; k < numStacks; k++) {
    stacks[k] = [];
}

for (let i = 0; i < piles.length - 1; i++) {
    
    for (let j = 0; j < numStacks; j++) {

        let crate = piles[i][4*j + 1]
        if (crate !== " ") {
            stacks[j].unshift(crate)
        }
    }
}
const CRANE = 9001
let procedures = input[1].trim().split("\n")

for (let i = 0; i < procedures.length; i++) {

    let move = procedures[i].split(" ")
    const numCrates = move[1];
    const fromStack = move[3];
    const toStack = move[5];

    console.log(numCrates,fromStack,toStack)
    let craneCrates = [];

    if (CRANE === 9000) {

        for (let j = 0; j < numCrates; j++) {

            let crate = stacks[fromStack - 1].pop();
            stacks[toStack - 1].push(crate)
        }

    } else if (CRANE === 9001) {

        for (let j = 0; j < numCrates; j++) {

            let crate = stacks[fromStack - 1].pop();
            craneCrates.unshift(crate);
        }
        
        stacks[toStack - 1] = stacks[toStack - 1].concat(craneCrates);
    }
}


let top = "";

for (let i = 0; i < stacks.length; i++) {
    let topChar = stacks[i][stacks[i].length - 1];
    if (typeof topChar !== "undefined") {
        top += topChar
    }
}

console.log(top)