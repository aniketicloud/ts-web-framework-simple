import { expect, test } from "vitest";
import axios from "axios";

import { sum } from "./sum";
import { server } from "./mocks/server";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("fetching actual data", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  expect(data).toBeDefined();
  expect(data.title).toBe("delectus aut autem");
});

test("fetching msw data", async () => {
  server.listen({ onUnhandledRequest: "error" });
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  expect(data).toBeDefined();
  expect(data.title).toBe("my changed title");
  server.close();
});
