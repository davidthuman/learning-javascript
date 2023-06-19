const fs = require("fs")

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`3/${path}.txt`)
    .toString()
    .trim()
    .split("\n");

const rucksacks = input.map( (value) => {
    return value.split("")
});

let intersect = []

for (let i = 0; i < rucksacks.length; i = i + 3) {

    const first = new Set(rucksacks[i]);
    const second = new Set(rucksacks[i+1]);
    const third = new Set(rucksacks[i+2]);
 
    let group = new Set();

    for (const element1 of second) {
        if (first.has(element1)) {
            group.add(element1)
        }
    }
    for (const element2 of third) {
        if (group.has(element2)) {
            intersect.push(element2)
        }
    }
}

function getPriority(char) {
    if (char === char.toLowerCase()) {
        return char.charCodeAt(0) - 96
    } else {
        return char.charCodeAt(0) - 38
    }
}

console.log(intersect.reduce( (total, current) => {
    return total += getPriority(current)
}, 0))