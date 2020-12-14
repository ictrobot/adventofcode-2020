import input from "../inputs/input14.json"

type MaskEntry = "0" | "1" | "X";
const mask: MaskEntry[] = new Array(36).fill("X");
const memory: Map<number, number> = new Map<number, number>();

// part one
for (let line of input.split("\n")) {
    const [loc, value] = line.split("=").map(x => x.trim());
    if (loc === "mask") {
        mask.forEach((_, i, arr) => arr[i] = value[i] as MaskEntry);
    } else if (loc.startsWith("mem")) {
        const addr = parseInt(loc.substring(4, loc.length - 1));
        const binary = Array(...parseInt(value).toString(2).padStart(36, "0"));
        for (let i = 0; i < 36; i++) {
            if (mask[i] !== "X") binary[i] = mask[i];
        }
        memory.set(addr, parseInt(binary.join(""), 2));
    }
}
console.log("part one", Array(...memory.values()).reduce((a, b) => a + b));


// part two
function *memoryAddresses(addr: string[], i = 0): IterableIterator<number> {
    if (i === 36) {
        yield parseInt(addr.join(""), 2);
    } else if (mask[i] === "0") {
        yield* memoryAddresses(addr, i + 1);
    } else {
        addr[i] = "1";
        yield* memoryAddresses(addr, i + 1);
        if (mask[i] === "X") {
            addr[i] = "0";
            yield* memoryAddresses(addr, i + 1);
        }
    }
}

memory.clear();
for (let line of input.split("\n")) {
    const [loc, value] = line.split("=").map(x => x.trim());
    if (loc === "mask") {
        mask.forEach((_, i, arr) => arr[i] = value[i] as MaskEntry);
    } else if (loc.startsWith("mem")) {
        const addr = parseInt(loc.substring(4, loc.length - 1));
        const addrBinary = Array(...addr.toString(2).padStart(36, "0"));
        for (let memoryAddress of memoryAddresses(addrBinary)) {
            memory.set(memoryAddress, parseInt(value));
        }
    }
}
console.log("part two", Array(...memory.values()).reduce((a, b) => a + b));
