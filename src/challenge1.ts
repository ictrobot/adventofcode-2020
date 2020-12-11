import input from "../inputs/input1.json";

const numbers = input.trim().split("\n").map(Number)
numbers.sort()

// part one
for (let i = 0; i < numbers.length; i++) {
    for (let j = numbers.length - 1; j > i; j--) {
        if (numbers[i] + numbers[j] === 2020) {
            console.log("part one",
                numbers[i], numbers[j],
                numbers[i] * numbers[j]);
        }
    }
}

// part two
for (let i = 0; i < numbers.length; i++) {
    for (let j = numbers.length - 1; j > i; j--) {
        for (let k = numbers.length - 1; k > j; k--) {
            if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                console.log("part two",
                    numbers[i], numbers[j], numbers[k],
                    numbers[i] * numbers[j] * numbers[k]);
            }
        }
    }
}
