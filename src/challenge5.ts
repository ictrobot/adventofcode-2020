import input from "../inputs/input5.json"

function seat(id: string): number {
    let minRow = 0, maxRow = 127, minCol = 0, maxCol = 7;
    for (const char of id) {
        switch (char) {
            case "F":
                maxRow = minRow + Math.floor((maxRow - minRow) / 2);
                break;
            case "B":
                minRow = minRow + Math.ceil((maxRow - minRow) / 2);
                break;
            case "L":
                maxCol = minCol + Math.floor((maxCol - minCol) / 2);
                break;
            case "R":
                minCol = minCol + Math.ceil((maxCol - minCol) / 2);
                break;
        }
    }

    return (minRow * 8) + minCol;
}

// part one
const seats = input.split("\n").map(seat);
console.log("part one", Math.max(...seats))

// part two
for (let r = 0; r < 128; r++) {
    for (let c = 0; c < 8; c++) {
        const id = (r * 8) + c;
        if (!seats.includes(id) && seats.includes(id + 1) && seats.includes(id - 1))
            console.log("part two", id);
    }
}
