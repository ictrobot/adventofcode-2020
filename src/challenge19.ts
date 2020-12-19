import input from "../inputs/input19.json"

const [ruleLines, messageLines] = input.split("\n\n");

// string = char, number = another rule number
type Rule = string | number | {type: "double" | "or", rule1: Rule, rule2: Rule};
type Match = {match: false} | {match: true, remaining: string};
const rules: Rule[] = [];

function parseRule(s: string): Rule {
    const [part1, part2] = s.split(" | ");
    if (part2) return {type: "or", rule1: parseRule(part1), rule2: parseRule(part2)};

    const [rule1, rule2, rule3] = s.split(" ");
    if (rule3) return {type: "double", rule1: parseRule(rule1), rule2: {type: "double", rule1: parseRule(rule2), rule2: parseRule(rule3)}}
    if (rule2) return {type: "double", rule1: parseRule(rule1), rule2: parseRule(rule2)};

    if (rule1.startsWith('"') && rule1.endsWith('"')) return rule1.substring(1, rule1.length - 1); // char
    return Number(rule1); // another rule number
}

for (let ruleLine of ruleLines.split("\n")) {
    const [ruleNumber, matches] = ruleLine.split(": ");
    rules[Number(ruleNumber)] = parseRule(matches);
}

// part one
function match(s: string, rule: Rule): Match {
    while (typeof rule === "number") rule = rules[rule];
    if (typeof rule === "string") {
        return s.startsWith(rule) ? {match: true, remaining: s.substring(rule.length)} : {match: false};
    }

    const match1 = match(s, rule.rule1);
    if (rule.type === "double") {
        if (!match1.match) return match1;
        return match(match1.remaining, rule.rule2);
    } else {
        return match1.match ? match1 : match(s, rule.rule2);
    }
}

function completeMatch(s: string) {
    const m = match(s, rules[0]);
    return m.match && !m.remaining;
}

console.log("part one", messageLines.split("\n").filter(completeMatch).length)

// part two - now we've got loops
rules[8] = parseRule("42 | 42 8");
rules[11] = parseRule("42 31 | 42 11 31");

function listMatch(strings: string[], rule: Rule): string[] {
    if (strings.length === 0) return [];

    while (typeof rule === "number") rule = rules[rule];
    if (typeof rule === "string") {
        const char = rule;
        return strings.filter(s => s.startsWith(char)).map(s => s.substring(char.length));
    }

    const match1 = listMatch(strings, rule.rule1);
    if (rule.type === "double") {
        return listMatch(match1, rule.rule2);
    } else {
        match1.push(...listMatch(strings, rule.rule2));
        return match1;
    }
}

function partTwo(s: string) {
    const matches = listMatch([s], rules[0]);
    return matches.some(x => x.length === 0); // at least one remaining string which is empty
}

console.log("part two", messageLines.split("\n").filter(partTwo).length)
