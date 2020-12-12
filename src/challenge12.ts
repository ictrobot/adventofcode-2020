import input from "../inputs/input12.json"

const instructions = input.split("\n").map(x => ({action: x[0], value: Number(x.substring(1))}))

// part one
{
    let east = 0, north = 0, direction = 0;
    for (const instr of instructions) {
        if (instr.action === "N") {
            north += instr.value;
        } else if (instr.action === "S") {
            north -= instr.value;
        } else if (instr.action === "E") {
            east += instr.value;
        } else if (instr.action === "W") {
            east -= instr.value;
        } else if (instr.action === "L") {
            direction += instr.value;
            direction %= 360;
        } else if (instr.action === "R") {
            direction -= instr.value;
            while (direction < 0) direction += 360;
        } else if (instr.action === "F") {
            if (direction === 0) east += instr.value;
            else if (direction === 90) north += instr.value;
            else if (direction === 180) east -= instr.value;
            else if (direction === 270) north -= instr.value;
        }
    }
    console.log("part one", Math.abs(north) + Math.abs(east));
}

// part two
{
    let wEast = 10, wNorth = 1, sEast = 0, sNorth = 0;
    for (const instr of instructions) {
        if (instr.action === "N") {
            wNorth += instr.value;
        } else if (instr.action === "S") {
            wNorth -= instr.value;
        } else if (instr.action === "E") {
            wEast += instr.value;
        } else if (instr.action === "W") {
            wEast -= instr.value;
        } else if (instr.action === "L" || instr.action === "R") {
            let dir = instr.action === "L" ? instr.value : -instr.value;
            dir = ((dir % 360) + 360) % 360;
            while (dir > 0) {
                [wEast, wNorth] = [-wNorth, wEast];
                dir -= 90;
            }
        } else if (instr.action === "F") {
            sNorth += instr.value * wNorth;
            sEast += instr.value * wEast;
        }
    }
    console.log("part two", Math.abs(sNorth) + Math.abs(sEast));
}
