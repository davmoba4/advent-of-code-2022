import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const solve = (data: string) => {
  const lines = data.split("\n");
  console.log(lines);

  return 0;
};

const example = await Deno.readTextFile("./example.txt");
const input = await Deno.readTextFile("./input.txt");
Deno.test("Test and Solve", () => {
  assertEquals(solve(example), 0);
  // assertEquals(solve(example), 0);
  // const t0 = performance.now();
  // console.log("SOLUTION", solve(input));
  // const t1 = performance.now();
  // console.log("TIME", (t1 - t0).toLocaleString(), "ms");
});
