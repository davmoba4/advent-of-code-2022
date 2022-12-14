import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

type Spot = {
  val: string;
  r: number;
  c: number;
  height: string;
  steps: number;
};

const START = "S";
const END = "E";

const checkNeighbourIsValidAndAdd = (
  spots: Spot,
  nextSpot: Spot,
  visited: boolean[][],
  neighbours: Spot[]
) => {
  if (
    (nextSpot.height <= spots.height ||
      nextSpot.height.charCodeAt(0) - spots.height.charCodeAt(0) === 1) &&
    !visited[nextSpot.r][nextSpot.c]
  ) {
    neighbours.push(nextSpot);
  }
};

const getNeighbours = (
  graph: Spot[][],
  spot: Spot | undefined,
  visited: boolean[][]
) => {
  const neighbours: Spot[] = [];
  const { r, c } = spot as Spot;
  let nextSpot = spot;

  if (r > 0) {
    nextSpot = graph[r - 1][c];
    checkNeighbourIsValidAndAdd(spot!, nextSpot, visited, neighbours);
  }
  if (r < graph.length - 1) {
    nextSpot = graph[r + 1][c];
    checkNeighbourIsValidAndAdd(spot!, nextSpot, visited, neighbours);
  }
  if (c > 0) {
    nextSpot = graph[r][c - 1];
    checkNeighbourIsValidAndAdd(spot!, nextSpot, visited, neighbours);
  }
  if (c < graph[0].length - 1) {
    nextSpot = graph[r][c + 1];
    checkNeighbourIsValidAndAdd(spot!, nextSpot, visited, neighbours);
  }
  return neighbours;
};

const traverseGraph = (graph: Spot[][], source: Spot | undefined) => {
  const visited = new Array(graph.length)
    .fill(0)
    .map(() => Array(graph[0].length).fill(false));
  const openSpots: Spot[] = [];
  openSpots.push(source!);
  visited[source!.r][source!.c] = true;

  while (openSpots.length !== 0) {
    const current = openSpots.shift();

    if (current!.val === END) {
      return current;
    }

    const neighbours = getNeighbours(graph, current, visited);
    for (const neighbour of neighbours) {
      neighbour.steps += current!.steps + 1;
      openSpots.push(neighbour);
      visited[neighbour.r][neighbour.c] = true;
    }
  }
};

const solve = (data: string) => {
  let startSpot: Spot | undefined;
  let endSpot: Spot | undefined;
  const graph = data.split("\n").map((row, r) =>
    row.split("").map((spotChar, c) => {
      const spot: Spot = {
        val: spotChar,
        r,
        c,
        height: spotChar,
        steps: 0,
      };
      if (spotChar === START) {
        startSpot = spot;
        spot.height = "a";
      } else if (spotChar === END) {
        spot.height = "z";
        endSpot = spot;
      }
      return spot;
    })
  );

  traverseGraph(graph, startSpot);
  return endSpot!.steps;
};

const example = await Deno.readTextFile("./example.txt");
const input = await Deno.readTextFile("./input.txt");
Deno.test("Test and Solve", () => {
  assertEquals(solve(example), 31);
  const t0 = performance.now();
  console.log("SOLUTION", solve(input));
  const t1 = performance.now();
  console.log("TIME", (t1 - t0).toLocaleString(), "ms");
});
