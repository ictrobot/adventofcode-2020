import input from "../inputs/input20.json"

function rotate90(tile: string[]) {
    return reverseEachRow(transpose(tile))
}

function transpose(tile: string[]) {
    return tile.map((_, i) => tile.map(x => x[i]).join(''));
}

function reverseEachRow(tile: string[]) {
    return tile.map(x => x.split('').reverse().join(''));
}

class Tile {
    public constructor(
        public readonly id: number,
        public readonly data: string[],
        public readonly transformations: Tile[] = []
    ) {
        if (this.transformations.length === 0) {
            this.transformations.push(this);
            this.transformations.push(new Tile(id, reverseEachRow(data), transformations));
            this.transformations.push(new Tile(id, rotate90(data), transformations));
            this.transformations.push(new Tile(id, reverseEachRow(rotate90(data)), transformations));
            this.transformations.push(new Tile(id, rotate90(rotate90(data)), transformations));
            this.transformations.push(new Tile(id, reverseEachRow(rotate90(rotate90(data))), transformations));
            this.transformations.push(new Tile(id, rotate90(rotate90(rotate90(data))), transformations));
            this.transformations.push(new Tile(id, reverseEachRow(rotate90(rotate90(rotate90(data)))), transformations));
        }
    }

    get top() {
        return this.data[0];
    }

    get bottom() {
        return this.data[this.data.length - 1];
    }

    get left() {
        return this.data.map(x => x[0]).join('');
    }

    get right() {
        return this.data.map(x => x[x.length - 1]).join('');
    }
}

class Image {
    public readonly tiles: (Tile | null)[][] = [];

    public constructor(
        public readonly size = Math.trunc(Math.sqrt(tiles.length)),
    ) {
        for (let x = 0; x < size; x++) this.tiles[x] = Array(size).fill(null);
    }

    public setTile(x: number, y: number, tile: Tile | null) {
        if (tile !== null) {
            const above = this.tiles?.[x]?.[y - 1];
            if (above && above.bottom !== tile.top) return false;

            const below = this.tiles?.[x]?.[y + 1];
            if (below && below.top !== tile.bottom) return false;

            const left = this.tiles?.[x - 1]?.[y];
            if (left && left.right !== tile.left) return false;

            const right = this.tiles?.[x + 1]?.[y];
            if (right && right.left !== tile.right) return false;
        }

        this.tiles[x][y] = tile;
        return true;
    }

    solve(x = 0, y = 0, remaining = tiles) {
        for (const baseTile of remaining) {
            for (const tile of baseTile.transformations) {
                if (this.setTile(x, y, tile)) {
                    const [nextX, nextY] = x === this.size - 1 ? [0, y + 1] : [x + 1, y];
                    if (this.solve(nextX, nextY, remaining.filter(x => x !== baseTile))) return true;
                    this.setTile(x, y, null);
                }
            }
        }
        return remaining.length === 0;
    }

    corners(): (Tile | null)[] {
        return [this.tiles[0][0], this.tiles[0][this.size - 1], this.tiles[this.size - 1][0], this.tiles[this.size - 1][this.size - 1]];
    }

    combined(): string[] { // removing borders
        const rows = [];
        for (let tY = 0; tY < this.size; tY++) {
            for (let iY = 1; iY < 9; iY++) {
                let row = "";
                for (let tX = 0; tX < this.size; tX++) {
                    row += this.tiles[tX][tY]!.data[iY].substr(1, 8);
                }
                rows.push(row);
            }
        }
        return rows;
    }
}

const lines = input.split("\n").filter(x => x);

const tiles: Tile[] = [];
while (lines.length) {
    const [title, ...data] = lines.splice(0, 11);
    tiles.push(new Tile(Number(title.replace(/[^\d]/g,"")), data));
}
const i = new Image();

// part 1
i.solve();
console.log(i.corners().map(x => x?.id ?? 0).reduce((t, x) => t * x, 1));

// part 2
function lineSection(s: string, i: number, length=20) {
    const before = s.substr(0, i);
    const section = s.substr(i, length);
    const after = s.substr(i + length);
    return [before, section, after];
}

const [topRegex, middleRegex, bottomRegex] = [
    /(..................)#(.)/,
    /#(....)##(....)##(....)###/,
    /(.)#(..)#(..)#(..)#(..)#(..)#(...)/,
]

let combined = i.combined();
for (let i = 0; i < 8; i++) {

    for (let y = 0; y < combined.length - 2; y++) {
        for (let x = 0; x < combined[0].length - 20; x++) {
            let [topBefore, top, topAfter] = lineSection(combined[y], x);
            let [middleBefore, middle, middleAfter] = lineSection(combined[y + 1], x);
            let [bottomBefore, bottom, bottomAfter] = lineSection(combined[y + 2], x);

            if (top.match(topRegex) && middle.match(middleRegex) && bottom.match(bottomRegex)) {
                // found monster
                top = top.replace(topRegex, '$1.$2');
                combined[y] = topBefore + top + topAfter;

                middle = middle.replace(middleRegex, '.$1..$2..$3...');
                combined[y + 1] = middleBefore + middle + middleAfter;

                bottom = bottom.replace(bottomRegex, '$1.$2.$3.$4.$5.$6.$7');
                combined[y + 2] = bottomBefore + bottom + bottomAfter;
            }
        }
    }

    if (i % 2 === 0) {
        combined = rotate90(i > 0 ? reverseEachRow(combined) : combined);
    } else {
        combined = reverseEachRow(combined);
    }
}

console.log(combined.map(x => x.split('').filter(x => x === '#').length).reduce((total, x) => total + x, 0))
