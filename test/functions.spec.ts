import { enumerate, enumerateAsync, infinite, range, repeat, zip, zipWith } from "../src/functions";
import { LazyIterable } from "../src/lazyIterable";
import { AsyncLazyIterable } from "../src/asyncLazyIterable";

describe("enumerate()", () => {
  it("should return a LazyIterable that yields the enumeration of an iterable", () => {
    const returned = enumerate(["A", "B", "C"]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([
      [0, "A"],
      [1, "B"],
      [2, "C"],
    ]);
  });

  it("should run the documentation example correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    const values = ["A", "B", "C"];
    for (const [index, value] of enumerate(values)) {
      console.log(`${index}: ${value}`);
    }

    values.forEach((value, index) => {
      expect(consoleSpy).toHaveBeenCalledWith(`${index}: ${value}`);
    });

    consoleSpy.mockRestore();
  });
});

describe("enumerateAsync()", () => {
  it("should return an AsyncLazyIterable that yields the enumeration of an async iterable", async () => {
    const returned = enumerateAsync(
      (async function* () {
        for (const value of ["A", "B", "C"]) {
          yield value;
        }
      })(),
    );

    expect(returned).toBeInstanceOf(AsyncLazyIterable);
    expect(await returned.toArray()).toEqual([
      [0, "A"],
      [1, "B"],
      [2, "C"],
    ]);
  });

  it("should run the documentation example correctly", async () => {
    async function* generator() {
      yield* ["A", "B", "C", "D"];
    }
    const returned = await enumerateAsync(new AsyncLazyIterable(generator())).toArray();

    expect(returned).toEqual([
      [0, "A"],
      [1, "B"],
      [2, "C"],
      [3, "D"],
    ]);
  });
});

describe("range()", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "warn").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should return a LazyIterable that yields values from start (inclusive) to stop (exclusive) in size step", () => {
    const returned = range(0, 10, 2);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([0, 2, 4, 6, 8]);
  });

  it("should default to step size 1", () => {
    const returned = range(0, 5);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should yield decreasing values if start is less than stop", () => {
    const returned = range(5, 0, 1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([5, 4, 3, 2, 1]);
  });

  it("should yield nothing if start and stop are the same", () => {
    const returned = range(0, 0, 1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([]);
  });

  it("should warn if the step size is set to 0", () => {
    const returned = range(0, 5, 0);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([0, 0, 0, 0, 0]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[LazyIterable] Constant range iterable detected - prefer to use 'repeat(item)'",
    );
  });

  it("should warn if start is less than stop, and step is less than 0", () => {
    const returned = range(0, 5, -1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([0, -1, -2, -3, -4]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[LazyIterable] Infinite range iterable detected - prefer to use 'infinite(start, step)'",
    );
  });

  it("should warn if start is greater than stop, and step is less than 0", () => {
    const returned = range(5, 0, -1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([5, 6, 7, 8, 9]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[LazyIterable] Infinite range iterable detected - prefer to use 'infinite(start, step)'",
    );
  });

  it("should run the documentation example correctly", () => {
    expect(range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4]);
    expect(range(0, 10, 2).toArray()).toEqual([0, 2, 4, 6, 8]);
    expect(range(20, 0, 5).toArray()).toEqual([20, 15, 10, 5]);
  });
});

describe("repeat()", () => {
  it("should return a LazyIterable that yields the given value infinitely", () => {
    const returned = repeat(1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([1, 1, 1, 1, 1]);
  });

  it("should run the documentation example correctly", () => {
    expect(repeat(1).take(5).toArray()).toEqual([1, 1, 1, 1, 1]);
  });
});

describe("infinite()", () => {
  it("should return a LazyIterable that yields values from start incremented by step infinitely", () => {
    const returned = infinite(0, 2);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([0, 2, 4, 6, 8]);
  });

  it("should default to 1 as the start value and 1 as the step", () => {
    const returned = infinite();

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should yield decreasing values if the step is negative", () => {
    const returned = infinite(0, -1);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([0, -1, -2, -3, -4]);
  });

  it("should warn if a step size is 0", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    const returned = infinite(1, 0);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.take(5).toArray()).toEqual([1, 1, 1, 1, 1]);
    expect(consoleSpy).toHaveBeenCalledWith("[LazyIterable] Repeat iterable detected - prefer to use 'repeat(value)'");

    consoleSpy.mockRestore();
  });

  it("should run the documentation example correctly", () => {
    expect(infinite(0, 1).take(5).toArray()).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("zip()", () => {
  it("should return a LazyIterable that yields pairs of values from the input iterables", () => {
    const returned = zip(["A", "B", "C"], [1, 2, 3]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([
      ["A", 1],
      ["B", 2],
      ["C", 3],
    ]);
  });

  it("should handle when iterableA is shorter than iterableB", () => {
    const returned = zip(["A", "B"], [1, 2, 3]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([
      ["A", 1],
      ["B", 2],
    ]);
  });

  it("should handle when iterableB is shorter than iterableA", () => {
    const returned = zip(["A", "B", "C"], [1, 2]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual([
      ["A", 1],
      ["B", 2],
    ]);
  });

  it("should run the documentation example correctly", () => {
    expect(zip(["A", "B", "C"], [1, 2, 3]).toArray()).toEqual([
      ["A", 1],
      ["B", 2],
      ["C", 3],
    ]);
  });
});

describe("zipWith()", () => {
  it("should return a LazyIterable that yields values formed from the pair of iterables passed through a callback", () => {
    const returned = zipWith((a, b) => `${a} => ${b}`, ["A", "B", "C"], [1, 2, 3]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual(["A => 1", "B => 2", "C => 3"]);
  });

  it("should handle when iterableA is shorter than iterableB", () => {
    const returned = zipWith((a, b) => `${a} => ${b}`, ["A", "B"], [1, 2, 3]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual(["A => 1", "B => 2"]);
  });

  it("should handle when iterableB is shorter than iterableA", () => {
    const returned = zipWith((a, b) => `${a} => ${b}`, ["A", "B", "C"], [1, 2]);

    expect(returned).toBeInstanceOf(LazyIterable);
    expect(returned.toArray()).toEqual(["A => 1", "B => 2"]);
  });

  it("should run the documentation example correctly", () => {
    expect(zipWith((a, b) => `${a} => ${b}`, ["A", "B", "C"], [1, 2, 3]).toArray()).toEqual(["A => 1", "B => 2", "C => 3"]);
  });
});
