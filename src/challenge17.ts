import input from "../inputs/input17.json"

function defaultArray<T>(factory: () => T): {[k: number]: T} {
    return new Proxy({} as any, {
        get: (target, name) => name in target ? target[name] : target[name] = factory()
    })
}

type nestedArray = {[k: number]: nestedArray} | {[k: number]: boolean};
function countTrue(arr: nestedArray) {
    let count = 0;
    for (let value of Object.values(arr)) {
        if (typeof value === "boolean") {
            if (value) count++;
        } else {
            count += countTrue(value);
        }
    }
    return count;
}

// part one
function makeGrid3d() {
    return defaultArray(() => defaultArray(() => defaultArray(() => false)));
}

{
    const initialGrid = makeGrid3d();
    for (const [y, line] of input.split("\n").entries()) {
        for (const [x, entry] of Array(...line).entries()) {
            initialGrid[x][y][0] = entry === "#";
        }
    }

    let xyMax = 8, zMax = 0, grid = initialGrid;
    for (let i = 0; i < 6; i++) {
        xyMax++;
        zMax++;

        const newGrid = makeGrid3d();
        for (let x = -xyMax; x <= xyMax; x++) {
            for (let y = -xyMax; y <= xyMax; y++) {
                for (let z = -zMax; z <= zMax; z++) {

                    let count = 0;
                    for (let dX = -1; dX < 2; dX++) {
                        for (let dY = -1; dY < 2; dY++) {
                            for (let dZ = -1; dZ < 2; dZ++) {
                                if (grid[x + dX][y + dY][z + dZ] && !(dX === 0 && dY === 0 && dZ === 0)) count++;
                            }
                        }
                    }

                    if (grid[x][y][z]) {
                        newGrid[x][y][z] = count === 2 || count === 3;
                    } else {
                        newGrid[x][y][z] = count === 3;
                    }
                }
            }
        }

        grid = newGrid;
    }

    console.log("part one", countTrue(grid));
}

// part one
function makeGrid4d() {
    return defaultArray(makeGrid3d);
}

{
    const initialGrid = makeGrid4d();
    for (const [y, line] of input.split("\n").entries()) {
        for (const [x, entry] of Array(...line).entries()) {
            initialGrid[x][y][0][0] = entry === "#";
        }
    }

    let xyMax = 8, zwMax = 0, grid = initialGrid;
    for (let i = 0; i < 6; i++) {
        xyMax++;
        zwMax++;

        const newGrid = makeGrid4d();
        for (let x = -xyMax; x <= xyMax; x++) {
            for (let y = -xyMax; y <= xyMax; y++) {
                for (let z = -zwMax; z <= zwMax; z++) {
                    for (let w = -zwMax; w <= zwMax; w++) {

                        let count = 0;
                        for (let dX = -1; dX < 2; dX++) {
                            for (let dY = -1; dY < 2; dY++) {
                                for (let dZ = -1; dZ < 2; dZ++) {
                                    for (let dW = -1; dW < 2; dW++) {
                                        if (grid[x + dX][y + dY][z + dZ][w + dW] && (dX || dY || dZ || dW)) count++;
                                    }
                                }
                            }
                        }

                        if (grid[x][y][z][w]) {
                            newGrid[x][y][z][w] = count === 2 || count === 3;
                        } else {
                            newGrid[x][y][z][w] = count === 3;
                        }

                    }
                }
            }
        }

        grid = newGrid;
    }

    console.log("part two", countTrue(grid));
}
