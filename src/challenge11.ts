import input from "../inputs/input11.json"

// "L" empty
// "#" occupied
// "." floor

let grid = input.split("\n").map(x => Array(...x)) as ("L" | "#" | ".")[][];
const originalGrid = grid;

function get(x: number, y: number): "L" | "#" | "." {
    const row = grid[y];
    if (!row) return ".";
    return row[x] ?? ".";
}

function simulate(neighboursFunction: (x: number, y: number) => number, emptyCutoff: number): ("L" | "#" | ".")[][] | undefined {
    const newGrid = Array(grid.length).fill([]).map(() => Array(grid[0].length).fill("."));
    let changed = false;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            let cell = grid[y][x];
            if (cell === "L" && neighboursFunction(x, y) == 0) {
                cell = "#";
                changed = true;
            } else if (cell === "#" && neighboursFunction(x, y) >= emptyCutoff) {
                cell = "L";
                changed = true;
            }
            newGrid[y][x] = cell;
        }
    }

    return changed ? newGrid : undefined;
}

function occupied(): number {
    return grid.reduce((acc, v) =>
        acc + v.reduce((acc, x) => acc + (x === "#" ? 1 : 0), 0)
        , 0)
}

// part one
function neighboursPt1(x: number, y: number): number {
    let occupied = 0;
    for (let dX = -1; dX < 2; dX++) {
        for (let dY = -1; dY < 2; dY++) {
            if (dX === 0 && dY === 0) continue;
            if (get(x + dX, y + dY) === "#") occupied++;
        }
    }
    return occupied;
}


let nextGrid = simulate(neighboursPt1, 4);
while (nextGrid = simulate(neighboursPt1, 4)) grid = nextGrid;
console.log("part one", occupied());


// part two
function neighboursPt2(x: number, y: number): number {
    let occupied = 0;
    for (let dX = -1; dX < 2; dX++) {
        for (let dY = -1; dY < 2; dY++) {
            if (dX === 0 && dY === 0) continue;

            let posX = x + dX, posY = y + dY;
            while (posX >= 0 && posX < grid[0].length && posY >= 0 && posY < grid.length) {
                const cell = get(posX, posY);
                if (cell === "#") {
                    occupied++;
                    break;
                } else if (cell === "L") {
                    break;
                }

                posX += dX;
                posY += dY;
            }
        }
    }
    return occupied;
}

grid = originalGrid;
nextGrid = simulate(neighboursPt2, 5);
while (nextGrid = simulate(neighboursPt2, 5)) grid = nextGrid;
console.log("part two", occupied());
