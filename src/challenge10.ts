import input from "../inputs/input10.json"

const adapters = input.split("\n").map(Number)
adapters.sort((a, b) => a - b)

// part one
const differences = adapters.map((v, i, arr) => v - (i > 0 ? arr[i - 1] : 0)) // idx 0 is difference with 0, the charging outlet
differences.push(3); // difference between last adapter and laptop

const differenceCounts = differences.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());
console.log("part one", differenceCounts.get(1) * differenceCounts.get(3))

// part two
const maxAdapter = adapters[adapters.length - 1];
const device = maxAdapter + 3;

const waysToMake = new Map<number, number>();
waysToMake.set(device, 1);
for (let i = maxAdapter; i >= 0; i--) {
    if (!adapters.includes(i) && i !== 0) continue;

    waysToMake.set(i, (waysToMake.get(i + 1) ?? 0) + (waysToMake.get(i + 2) ?? 0) + (waysToMake.get(i + 3) ?? 0))
}
console.log("part two", waysToMake.get(0));
