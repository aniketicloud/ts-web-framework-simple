import { expect, test } from "vitest";
import { sum } from "./sum";
import { server } from "./mocks/server";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("fetching actual data", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log("first:", data);
  expect(data).toBeDefined();
  expect(data.title).toBe("delectus aut autem");
});

test("fetching msw data", async () => {
  server.listen({ onUnhandledRequest: "error" });
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log("second:", data);
  expect(data).toBeDefined();
  expect(data.title).toBe("my changed title");
  server.close();
});
