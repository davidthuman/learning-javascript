const fs = require("fs")

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`4/${path}.txt`)
    .toString()
    .trim()
    .split("\n");

const assignments = input.map( pair => {
    return pairs = pair.split(",").map( range => {
        return range.split("-").map( num => +num)
    })
})

function contains(one, two) {
    if ((one[0] <= two[0]) && (one[1] >= two[1])) {
        return true
    } else if ((one[0] >= two[0]) && (one[1] <= two[1])) {
        return true
    } else {
        return false
    }
}

function overlaps(one, two) {
    if ((one[0] <= two[1]) && (one[1] >= two[0])) {
        return true
    } else {
        return false
    }
}

let fullyContains = 0;
let overlap = 0;

for (let i = 0; i < assignments.length; i++) {
    let [one, two] = assignments[i];
    if (contains(one, two)) {
        fullyContains += 1;
    }
    if (overlaps(one, two)) {
        overlap += 1;
    }
}

console.log(fullyContains)
console.log(overlap)