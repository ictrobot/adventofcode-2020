import input from "../inputs/input3.json";

const rows = input.split("\n");

function encountered(down=1, right=3): number {
    let position = [0, 0]; // [x, y]
    let trees = 0;
    while (position[1] < rows.length) {
        if (rows[position[1]][position[0]] === "#") trees++;
        position = [(position[0] + right) % rows[0].length, position[1] + down]
    }
    return trees;
}

// part one
console.log("part one", encountered())

// part two
const patterns: [number, number][] = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
console.log("part two", patterns.map(x => encountered(...x)).reduce((a, b) => a * b, 1))

