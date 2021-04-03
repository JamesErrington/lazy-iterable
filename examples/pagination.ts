/**
 * LazyIterable Pagination example
 *
 * To run: `npx ts-node pagination.ts`
 *
 * This example shows how the AsyncLazyIterable could be used to process an API that
 * returns paginated data, where each response holds a new cursor address to the next
 * page of data. It also provides an example implementation of a `flatten()` method.
 */
import { AsyncLazyIterable } from "../src";

// Async IIFE to get round the lack of top-level await
(async function () {
  log("Starting LazyIterable Pagination example");
  // Create an AsyncLazyIterable that is driven by the pagination generator
  const iterable = new AsyncLazyIterable(fetchPaginatedApi());
  await iterable
    // Flatten the response array so we can deal with drivers one-by-one
    .feedTo(flatten)
    // Perform some operation on the data
    .map(({ firstName, lastName, teamName }) => `${firstName} ${lastName}: Team ${teamName}`)
    // Log the values as we recieve them
    .forEach(value => log(value));
  log("Finished");
})();

// A helper generator that flattens the arrays returned from the API
async function* flatten(iterable: AsyncIterable<Driver[]> | Iterable<Driver>): AsyncGenerator<Driver, void, undefined> {
  for await (const value of iterable) {
    if (isIterable(value)) {
      yield* value;
    } else {
      yield value;
    }
  }
}

// Mock implementation of a fetch function to an API that returns paginated data, tracked by a cursor value
async function* fetchPaginatedApi() {
  let cursor;
  // Here a null cursor signals that there is no more data to read
  while (cursor !== null) {
    const response: Response = await fakeFetch(cursor);
    yield response.data;
    cursor = response.next;
  }
}
// Mock implementation of a paginated API that returns data indexed by a cursor
async function fakeFetch(cursor: string | undefined): Promise<Response> {
  const actualCursor = cursor === undefined ? "#001" : cursor;
  return new Promise(resolve => setTimeout(() => resolve(data[actualCursor]), 2000));
}

interface Driver {
  firstName: string;
  lastName: string;
  teamName: string;
}

interface Response {
  data: Driver[];
  next: string | null;
}

const data: Record<string, Response> = {
  "#001": {
    data: [
      {
        firstName: "Max",
        lastName: "Verstappen",
        teamName: "Red Bull",
      },
      {
        firstName: "Carlos",
        lastName: "Sainz",
        teamName: "Ferrari",
      },
    ],
    next: "#002",
  },
  "#002": {
    data: [
      {
        firstName: "Lando",
        lastName: "Norris",
        teamName: "McLaren",
      },
      {
        firstName: "Sergio",
        lastName: "Perez",
        teamName: "Red Bull",
      },
    ],
    next: "#003",
  },
  "#003": {
    data: [
      {
        firstName: "Sebastian",
        lastName: "Vettel",
        teamName: "Aston Martin",
      },
    ],
    next: null,
  },
};
// Type guard to help TypeScript work out what is going on
function isIterable(value: Driver | Iterable<Driver>): value is Iterable<Driver> {
  return typeof value[Symbol.iterator] === "function";
}
// Helper function to log times to the console
function log(message: string) {
  console.log(`${new Date().toLocaleTimeString("en-US")} ${message}`);
}
