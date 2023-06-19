const fs = require("fs");

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`6/${path}.txt`)
    .toString()
    .trim()
    .split("");

const numUnique = 14
let buffer = input.slice(0,numUnique - 1).reverse();


function unique(data) {
    
    const check = new Set(data)
    if (check.size === data.length) {
        return true
    } else {
        return false
    }
}

let marker = numUnique

for (let i = numUnique - 1; i < input.length; i++) {

    buffer.unshift(input[i])

    if (unique(buffer.slice(0, numUnique))) {
        marker = i + 1;
        break
    }
}

console.log(marker);