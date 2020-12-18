import input from "../inputs/input18.json"

type Token = {type: "value", value: number} | {type: "op", op: "+" | "*"} | {type: "bracketed", string: string};

function *tokenize(eqn: string): IterableIterator<Token> {
    while (eqn = eqn.trimStart()) {
        let match;
        if ((match = eqn.match(/^([0-9]+) ?(.*)$/)) !== null) {
            yield {type: "value", value: Number(match[1])}
            eqn = match[2];
        } else if ((match = eqn.match(/^([+*]) ?(.*)$/)) !== null) {
            yield {type: "op", op: match[1] as "+" | "*"};
            eqn = match[2];
        } else if (eqn.startsWith("(")) {
            let brackets = 1;
            for (let i = 1; i < eqn.length; i++) {
                if (eqn[i] === "(") {
                    brackets++;
                } else if (eqn[i] === ")") {
                    brackets--;
                    if (!brackets) {
                        yield {type: "bracketed", string: eqn.substring(1, i)};
                        eqn = eqn.substring(i + 1);
                        break;
                    }
                }
            }
        } else {
            throw new Error("Unknown token");
        }
    }
}

// part one
function partOne(tokens: IterableIterator<Token>): number {
    let operatorTodo: "+" | "*" | undefined = undefined;
    let value = 0;
    for (let token of tokens) {
        if (token.type === "op") {
            operatorTodo = token.op;
            continue;
        }

        let nextValue = token.type === "value" ? token.value : partOne(tokenize(token.string));
        if (operatorTodo === "+") {
            value += nextValue;
            operatorTodo = undefined;
        } else if (operatorTodo === "*") {
            value *= nextValue;
            operatorTodo = undefined;
        } else {
            value = nextValue;
        }
    }
    return value;
}

console.log("part one", input.split("\n").map(x => partOne(tokenize(x))).reduce((a, b) => a + b))

// part two
function partTwo(tokens: IterableIterator<Token>): number {
    const t: (number | "+" | "*")[] = [];
    for (let token of tokens) {
        if (token.type === "op") t.push(token.op);
        else if (token.type === "value") t.push(token.value)
        else t.push(partTwo(tokenize(token.string)));
    }

    while (t.length > 2) {
        let index;
        if ((index = t.indexOf("+")) !== -1) {
            t.splice(index - 1, 3, Number(t[index - 1]) + Number(t[index + 1]));
        } else if ((index = t.indexOf("*")) !== -1) {
            t.splice(index - 1, 3, Number(t[index - 1]) * Number(t[index + 1]));
        } else {
            throw new Error();
        }
    }
    return Number(t[0]);
}

console.log("part two", input.split("\n").map(x => partTwo(tokenize(x))).reduce((a, b) => a + b))

