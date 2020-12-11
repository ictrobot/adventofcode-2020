import input from "../inputs/input8.json"

const lines = input.split("\n")

let pc = 0;
let acc = 0;

function runInstr(code=lines) {
    const line = code[pc];
    if (line.startsWith("acc ")) {
        acc += Number(line.substring(4))
    } else if (line.startsWith("jmp")) {
        pc += Number(line.substring(4))
        return;
    }
    pc += 1
}

// part one
const visited: Set<number> = new Set()
while (!visited.has(pc)) {
    visited.add(pc);
    runInstr();
}
console.log("part one", acc);

// part two
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith("acc ")) continue;
    else if (line.startsWith("nop ")) line = line.replace("nop", "jmp");
    else line = line.replace("jmp", "nop");

    const copy = lines.slice(0);
    copy[i] = line;

    pc = acc = 0;
    visited.clear();
    while (!visited.has(pc)) {
        if (pc >= lines.length) {
            // correctly terminated!
            console.log("part two", acc);
            break;
        }
        visited.add(pc);
        runInstr(copy);
    }
}
