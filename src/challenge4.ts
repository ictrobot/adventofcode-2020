import input from "../inputs/input4.json"

const passports = input.split("\n\n")
const fieldRegex = /([a-z]{3}):([^ \n]+)/mg

// part one
let valid = 0;
for (const passport of passports) {
    const fields = Array(...passport.matchAll(fieldRegex)).map(x => x[1]); // the field names
    if (fields.length === 8 || (fields.length === 7 && fields.indexOf("cid") === -1)) valid++;
}
console.log("part one", valid)

// part two
valid = 0;
for (const passport of passports) {
    const fields = Array(...passport.matchAll(fieldRegex)).map(x => [x[1], x[2]]); // the field names and values
    const map = new Map(fields as [string, string][]);

    if (!map.get("byr")?.match(/^[0-9]{4}$/)) continue;
    const byr = Number(map.get("byr"));
    if (byr < 1920 || byr > 2002) continue;

    if (!map.get("iyr")?.match(/^[0-9]{4}$/)) continue;
    const iyr = Number(map.get("iyr"));
    if (iyr < 2010 || iyr > 2020) continue;

    if (!map.get("eyr")?.match(/^[0-9]{4}$/)) continue;
    const eyr = Number(map.get("eyr"));
    if (eyr < 2020 || eyr > 2030) continue;

    if (!map.get("hgt")?.match(/[0-9]{3}cm$|[0-9]{2}in$/)) continue;
    const hgt = map.get("hgt") as string;
    if (hgt.endsWith("cm")) {
        const value = Number(hgt.replace("cm", ""));
        if (value < 150 || value > 193) continue;
    } else {
        const value = Number(hgt.replace("in", ""));
        if (value < 59 || value > 76) continue;
    }

    if (!map.get("hcl")?.match(/^#[0-9a-f]{6}$/)) continue;

    if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(map.get("ecl") ?? "")) continue;

    if (!map.get("pid")?.match(/^[0-9]{9}$/)) continue;

    valid++;
}
console.log("part two", valid)
