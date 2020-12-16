import input from "../inputs/input16.json"

let [fieldLines, yourLines, nearbyLines] = input.split("\n\n");
yourLines = yourLines.split(":\n")[1];
nearbyLines = nearbyLines.split(":\n")[1];

let tickets = nearbyLines.split("\n").map(x => x.split(",").map(Number));

const fieldValidators = new Map<string, (n: number) => boolean>();
const validValues = new Set<number>();
for (const line of fieldLines.split("\n")) {
    const [field, ranges] = line.split(": ")

    const [start1, end1, start2, end2] = ranges.split(" or ").flatMap(x => x.split("-")).map(Number);
    fieldValidators.set(field, (n) => {
        return (n >= start1 && n <= end1) || (n >= start2 && n <= end2);
    });

    for (let i = start1; i <= end1; i++) validValues.add(i);
    for (let i = start2; i <= end2; i++) validValues.add(i);
}

// part one
console.log("part one", tickets.flat().filter(x => !validValues.has(x)).reduce((a, b) => a + b));

// part two
tickets = tickets.filter(x => x.every(v => validValues.has(v)));
const myTicket = yourLines.split(",").map(Number);
const columns = tickets[0].map((_, i) => tickets.map(x => x[i]));

function findAssignment(columns: number[][], fields: string[]): string[] | undefined {
    const column = columns[0];
    if (!column) return [];
    const newColumns = columns.slice(1);

    for (let [i, field] of fields.entries()) {
        const validator = fieldValidators.get(field);
        if (validator && column.every(validator)) {
            const newFields = fields.slice();
            newFields.splice(i, 1);

            const assignment = findAssignment(newColumns, newFields);
            if (assignment) {
                assignment.unshift(field);
                return assignment;
            }
        }
    }
}

const assignment = findAssignment(columns, Array(...fieldValidators.keys())); // slow brute force search, not optimized
if (assignment) {
    console.log("part two", assignment
        .map((v, i) => [v, i] as [string, number])
        .filter(([v, _]) => v.startsWith("departure "))
        .map(([_, i]) => myTicket[i])
        .reduce((a, b) => a * b));
}
