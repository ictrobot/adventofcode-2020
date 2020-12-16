import input from "../inputs/input15.json"

const numbers = input.split(",").map(Number);

function *memoryGame(startingNumbers: number[]): IterableIterator<number> {
    const spokenRounds = new Map<number, number[]>();

    function spoken(n: number, round: number) {
        let list = spokenRounds.get(n);
        if (!list) {
            spokenRounds.set(n, list = []);
        } else if (list.length >= 2) {
            list.shift(); // remove oldest value
        }
        list.push(round);
    }

    yield* startingNumbers;
    startingNumbers.forEach((v, i) => spoken(v, i + 1));

    let number = startingNumbers[startingNumbers.length - 1];
    let round = startingNumbers.length + 1;
    while (true) {
        const previousRounds = spokenRounds.get(number) ?? [];
        if (previousRounds.length <= 1) {
            number = 0;
        } else {
            number = previousRounds[previousRounds.length - 1] - previousRounds[previousRounds.length - 2];
        }

        yield number;
        spoken(number, round);
        round++;
    }
}

function nth<T>(gen: IterableIterator<T>, n: number): T {
    for (let i = 0; i < n - 1; i++) gen.next();
    return gen.next().value;
}

console.log("part one", nth(memoryGame(numbers), 2020));
console.log("part two", nth(memoryGame(numbers), 30000000));
