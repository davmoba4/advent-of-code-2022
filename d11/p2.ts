import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { Monkey, parseMonkeys } from "./utils.ts";

const MULTIPLY = "*";
const ITSELF = "old";

const solve = (data: string) => {
  const monkeys: Monkey[] = [];
  parseMonkeys(data, monkeys);
  const divMultiple = monkeys.reduce((mult, monkey) => (mult *= monkey.div), 1);

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        monkey.count++;
        if (monkey.oper[0] === MULTIPLY) {
          if (monkey.oper[1] === ITSELF) {
            monkey.items[0] *= monkey.items[0];
          } else {
            monkey.items[0] *= monkey.oper[1] as number;
          }
        } else {
          if (monkey.oper[1] === ITSELF) {
            monkey.items[0] += monkey.items[0];
          } else {
            monkey.items[0] += monkey.oper[1] as number;
          }
        }
        // since  (a mod m) mod n = a mod n when m is a multiple of n
        monkey.items[0] %= divMultiple;
        if (monkey.items[0] % monkey.div === 0) {
          monkeys[monkey.yes].items.push(monkey.items[0]);
        } else {
          monkeys[monkey.no].items.push(monkey.items[0]);
        }
        monkey.items.splice(0, 1);
      }
    }
  }

  return monkeys
    .sort((monkey1, monkey2) => monkey2.count - monkey1.count)
    .slice(0, 2)
    .reduce((monkeyBusiness, monkey) => monkeyBusiness * monkey.count, 1);
};

const example = await Deno.readTextFile("./example.txt");
const input = await Deno.readTextFile("./input.txt");
Deno.test("Test and Solve", () => {
  assertEquals(solve(example), 2713310158);
  const t0 = performance.now();
  console.log("SOLUTION", solve(input));
  const t1 = performance.now();
  console.log("TIME", (t1 - t0).toLocaleString(), "ms");
});
