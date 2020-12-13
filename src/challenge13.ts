import input from "../inputs/input13.json"

const earliest = Number(input.split("\n")[0]);
const pattern = input.split("\n")[1].split(",");

// part one
const bestBus = pattern.filter(x => x !== "x").map(Number).map(bus => {
    const departure = Math.ceil(earliest / bus) * bus;
    const arrives = departure + bus;
    return {departure, arrives, bus};
}).reduce((a, b) => a.departure < b.departure ? a : b);
console.log("part one", bestBus.bus * (bestBus.departure - earliest));

// part two - Chinese Remainder Theorem as all bus ids are coprime
function modInverse(a: bigint, m: bigint) {
    let m0 = m, y = 0n, x = 1n;

    while (a > 1) {
        let q = a / m, t = m;
        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0) x += m0;
    return x;
}

const buses = pattern
    .map((v, i) => v === "x" ? undefined : {bus: BigInt(v), i: BigInt(i)})
    .filter(Boolean) as {bus: bigint, i: bigint}[];

const N = buses.map(x => x.bus).reduce((a, b) => a * b);

console.log(`part two ${buses
    .map(b => (b.bus - b.i) * N / b.bus * modInverse(N / b.bus, b.bus))
    .reduce((a, b) => a + b) % N}`);
