import input from "../inputs/input9.json"

function sumOfTwo(arr: number[], sum: number): boolean {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] + arr[j] === sum) return true;
        }
    }
    return false;
}

const numbers = input.split("\n").map(Number);
let weakness = NaN;

// part one
for (let i = 25; i < numbers.length; i++) {
    if (!sumOfTwo(numbers.slice(i - 25, i), numbers[i])) {
        console.log("part one", numbers[i]);
        weakness = numbers[i];
        break;
    }
}

// part two
for (let i = 25; i < numbers.length && numbers[i] < weakness; i++) {
    let sum = 0;
    let smallest = Infinity, largest = -Infinity;
    for (let j = i; j < numbers.length; j++) {
        sum += numbers[j];
        smallest = Math.min(smallest, numbers[j]);
        largest = Math.max(largest, numbers[j]);

        if (sum === weakness) {
            console.log("part two", smallest, largest, smallest + largest);
        }
        if (sum > weakness) break;
    }
}
