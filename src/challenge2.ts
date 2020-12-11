import input from "../inputs/input2.json";

function *getPasswords(): IterableIterator<[number, number, string, string]> {
    for (let match of input.matchAll(/^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/mg)) {
        const num1 = Number(match[1]), num2 = Number(match[2]);
        const char = match[3], password = match[4];

        yield [num1, num2, char, password];
    }
}

// part one
let valid = 0;
for (let [minRepeats, maxRepeats, char, password] of getPasswords()) {
    const repeats = password.split(char).length - 1;
    if (repeats >= minRepeats && repeats <= maxRepeats) valid++;
}
console.log("part one", valid)

// part two
valid = 0;
for (let [idx1, idx2, char, password] of getPasswords()) {
    if ((password[idx1 - 1] === char) !== (password[idx2 - 1] === char)) valid++;
}
console.log("part two", valid)
