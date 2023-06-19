const fs = require("fs")

const input = fs
    .readFileSync("input.txt")
    .toString()
    .trim()
    .split("\n\n");

let totals = [];

for (let i = 0; i < input.length; i++) {
    let elf = input[i].split("\n").reduce( (total, current) => {
        return (+total) + (+current)
    }, 0)

    totals.push(elf)
}

totals.sort(function(a, b){return b-a})

console.log(totals)

let top_three = 0;
for (let j = 0; j < 3; j++) {
    top_three += totals[j]
}

console.log(top_three)


