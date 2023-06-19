const fs = require("fs")

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`2/${path}.txt`)
    .toString()
    .trim()
    .split("\n");

const rounds = input.map( (value) => {
    return value.split(" ")
});

const opponent_code = {"A": "Rock", "B": "Paper", "C": "Scissors"}
const response_code = {"X": "Rock", "Y": "Paper", "Z": "Scissors"}

const winning = {"Rock": "Paper", "Paper": "Scissors", "Scissors": "Rock"}
const result_code = {"X": "lose", "Y": "draw", "Z": "win"}

const selected = {"Rock": 1, "Paper": 2, "Scissors": 3}

function outcome_one(opp, res) {
    if (opp === res) {
        return 3 + selected[res]
    }
    if (opp === "Rock") {
        if (res === "Paper") {
            return 6 + selected[res]
        } else if (res === "Scissors") {
            return 0 + selected[res]
        }
    } else if (opp === "Paper") {
        if (res === "Rock") {
            return 0 + selected[res]
        } else if (res === "Scissors") {
            return 6 + selected[res]
        }
    } else if (opp === "Scissors") {
        if (res === "Rock") {
            return 6 + selected[res]
        } else if (res === "Paper") {
            return 0 + selected[res]
        }
    }
}

function outcome_two(opp, result) {

    switch (result) {
        case "win":
            return 6 + selected[winning[opp]];
        case "draw":
            return 3 + selected[opp];
        case "lose":
            return 0 + selected[Object.keys(winning).find(key => winning[key] === opp)];
    }
}

const score = rounds
                .map( ([opp, res]) => {
                    return outcome_two(opponent_code[opp], result_code[res])
                })
                .reduce( (total, current) => {
                    return total += current
                })

console.log(score)