import input from "../inputs/input7.json"

type Content = {colour: string, amount: number};
const rules = new Map<string, Content[]>();

for (const line of input.split("\n")) {
    const match = line.match(/^([^]+?) bags contain ([^]+?)\.$/) ?? [];
    const colour = match[1];
    const contents: Content[] = [];

    for (let content of match[2].split(",")) {
        if (content === "no other bags") continue;

        const contentMatch = content.match(/([0-9]+) ([a-z ]+?) bags?$/) ?? [];
        contents.push({
            colour: contentMatch[2],
            amount: Number(contentMatch[1])
        });
    }
    rules.set(colour, contents);
}


// part one
const containShinyGold = new Set(["shiny gold"]);
let previousSize = 0;
while (containShinyGold.size !== previousSize) {
    previousSize = containShinyGold.size;

    for (let [colour, contents] of rules.entries()) {
        if (contents.find(x => containShinyGold.has(x.colour))) containShinyGold.add(colour);
    }
}
containShinyGold.delete("shiny gold");
console.log("part one", containShinyGold.size);

// part two
function contents(colour: string): number {
    let sum = 0;
    for (let content of rules.get(colour) ?? []) {
        sum += (1 + contents(content.colour)) * content.amount;
    }
    return sum;
}

console.log("part two", contents("shiny gold"));
