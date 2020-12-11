import input from "../inputs/input6.json"

const answers = input.split("\n\n");

// part one
let sum = 0;
for (const group of answers) {
    const letters = new Array(...group).filter(x => x >= 'a' && x <= 'z')
    sum += new Set(letters).size;
}
console.log("part one", sum)

// part two
function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set(Array.from(setA).filter(x => setB.has(x)));
}

sum = 0;
for (const group of answers) {
    const sets = group.split("\n").map(answers => {
        const letters = new Array(...answers).filter(x => x >= 'a' && x <= 'z')
        return new Set(letters);
    });
    sum += sets.reduce(intersection, sets[0]).size;
}
console.log("part two", sum)
