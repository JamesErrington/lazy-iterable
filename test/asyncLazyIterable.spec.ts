import { LazyIterable, AsyncLazyIterable } from "../src";

describe("AsyncLazyIterable", () => {
  function toAsyncIterable<T>(iterable: Iterable<T>): AsyncGenerator<T, void, void> {
    return (async function* () {
      for (const value of iterable) {
        yield value;
      }
    })();
  }

  describe("constructor", () => {
    it("should return a new AsyncLazyIterable that wraps an AsyncGenerator", async () => {
      const values = [1, 2, 3, 4, 5];
      async function* generator() {
        yield* values;
      }
      const returned = new AsyncLazyIterable(generator());

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(values);
    });
  });

  describe("next()", () => {
    let iterable: AsyncLazyIterable<number>;

    beforeEach(() => {
      async function* generator() {
        yield 1;
        yield 2;
      }

      iterable = new AsyncLazyIterable(generator());
    });

    it("should return the next value of the iteration", async () => {
      expect(await iterable.next()).toEqual({ value: 1, done: false });
    });

    it("should return done: true when there are no more values", async () => {
      await iterable.next();
      await iterable.next();
      expect(await iterable.next()).toEqual({ value: undefined, done: true });
    });

    it("should run the documentation example correctly", async () => {
      const iter = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3]));
      expect(await iter.next()).toEqual({ value: 1, done: false });
      expect(await iter.next()).toEqual({ value: 2, done: false });
      expect(await iter.next()).toEqual({ value: 3, done: false });
      expect(await iter.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe("take()", () => {
    it("should return a new AsyncLazyIterable that yields the given number of values", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.take(5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle when there are less values than requested", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3]));
      const returned = base.take(5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3]);
    });

    it("should handle when a negative number is requested", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3]));
      const returned = base.take(-1);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([]);
    });
  });

  describe("takeWhile()", () => {
    it("should return a new AsyncLazyIterable that yields values until the given predicate is false", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.takeWhile(value => value < 5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3, 4]);
    });

    it("should yield every value if the predicate is always true", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.takeWhile(value => value < 11);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should yield values after the predicate is false, even if they satisfy the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]));
      const returned = base.takeWhile(value => value < 5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3, 4]);
    });
  });

  describe("drop()", () => {
    it("should return a new AsyncLazyIterable that ignores the given number of values", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.drop(5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([6, 7, 8, 9, 10]);
    });

    it("should handle when there are less values than requested", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3]));
      const returned = base.drop(5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([]);
    });

    it("should handle when a negative number is requested", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3]));
      const returned = base.drop(-1);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("dropWhile()", () => {
    it("should return a new AsyncLazyIterable that ignores values until the given predicate is false", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.dropWhile(value => value < 5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([5, 6, 7, 8, 9, 10]);
    });

    it("should yield no values if the predicate is always true", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
      const returned = base.dropWhile(value => value < 11);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([]);
    });

    it("should yield values after the predicate is false, even if they satisfy the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]));
      const returned = base.dropWhile(value => value < 5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe("map()", () => {
    it("should return a new AsyncLazyIterable that yields values transformed by the given callback", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.map(value => value * 2);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([2, 4, 6, 8, 10]);
    });
  });

  describe("filter()", () => {
    it("should return a new AsyncLazyIterable that only yields values that satisfy the given predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]));
      const returned = base.filter(value => value < 5);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3, 4, 4, 3, 2, 1]);
    });
  });

  describe("runEffect()", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it("should call the given effect for each value and return a new AsyncLazyIterable that returns the original values", async () => {
      const values = [1, 2, 3, 4, 5];
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable(values));
      const returned = base.runEffect(value => console.log(value));

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(values);
      values.forEach((value, i) => {
        expect(consoleSpy).toHaveBeenNthCalledWith(i + 1, value);
      });
    });
  });

  describe("feedTo()", () => {
    it("should feed yielded values into the provided generator and return a new AsyncLazyIterable", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.feedTo(async function* (iterable: AsyncIterable<number>) {
        for await (const value of iterable) {
          yield value + 1;
        }
      });

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([2, 3, 4, 5, 6]);
    });
  });

  describe("forEach()", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it("should call the given effect for each value and return void", async () => {
      const values = [1, 2, 3, 4, 5];
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable(values));
      const returned = base.forEach(value => console.log(value));

      expect(await returned).toEqual(undefined);
      values.forEach((value, i) => {
        expect(consoleSpy).toHaveBeenNthCalledWith(i + 1, value);
      });
    });
  });

  describe("reduce()", () => {
    it("should build an accumulated value from the elements yielded out the AsyncLazyIterable", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.reduce((acc, elem) => acc + elem, 0);

      expect(await returned).toEqual(1 + 2 + 3 + 4 + 5);
    });
  });

  describe("some()", () => {
    it("should return true if at least one element satisfies the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.some(value => value > 4);

      expect(await returned).toBe(true);
    });

    it("should return false if no element satisfies the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.some(value => value < 0);

      expect(await returned).toBe(false);
    });
  });

  describe("every()", () => {
    it("should return true if every element satisfies the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.every(value => value > 0);

      expect(await returned).toBe(true);
    });

    it("should return false if at least one element fails the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.every(value => value < 4);

      expect(await returned).toBe(false);
    });
  });

  describe("includes()", () => {
    it("should return true if the given element is yielded", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.includes(3);

      expect(await returned).toBe(true);
    });

    it("should return false if the given element is never yielded", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.includes(6);

      expect(await returned).toBe(false);
    });
  });

  describe("find()", () => {
    it("should return the first element that satisfies the predicate", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.find(value => value > 3);

      expect(await returned).toEqual(4);
    });

    it("should return undefined if the predicate is never satisfied", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.find(value => value < 0);

      expect(await returned).toEqual(undefined);
    });
  });

  describe("indexOf()", () => {
    it("should return the index of the first element that matches the given value", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.indexOf(4);

      expect(await returned).toEqual(3);
    });

    it("should return -1 if the value is never yielded", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.indexOf(6);

      expect(await returned).toEqual(-1);
    });
  });

  describe("lastIndexOf()", () => {
    it("should return the last index of the first element that matches the given value", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 2, 1]));
      const returned = base.lastIndexOf(1);

      expect(await returned).toEqual(4);
    });

    it("should return -1 if the value is never yielded", async () => {
      const base = AsyncLazyIterable.fromIterable(toAsyncIterable([1, 2, 3, 4, 5]));
      const returned = base.lastIndexOf(6);

      expect(await returned).toEqual(-1);
    });
  });

  describe("fromIterable()", () => {
    it("should convert an array to an AsyncLazyIterable", async () => {
      const array = [1, 2, 3, 4, 5];
      const returned = AsyncLazyIterable.fromIterable(toAsyncIterable(array));

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(array);
    });

    it("should convert a string to an AsyncLazyIterable", async () => {
      const string = "abcde";
      const returned = AsyncLazyIterable.fromIterable(toAsyncIterable(string));

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(["a", "b", "c", "d", "e"]);
    });

    it("should convert a set to an AsyncLazyIterable", async () => {
      const set = new Set([1, 2, 1, 3, 2, 2]);
      const returned = AsyncLazyIterable.fromIterable(toAsyncIterable(set));

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2, 3]);
    });

    it("should convert a map to an AsyncLazyIterable", async () => {
      const map = new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
      ]);
      const returned = AsyncLazyIterable.fromIterable(toAsyncIterable(map));

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([
        ["A", 1],
        ["B", 2],
        ["C", 3],
      ]);
    });

    it("should convert a custom iterable to an AsyncLazyIterable", async () => {
      const customIterable = {
        async *[Symbol.asyncIterator]() {
          yield 1;
          yield 2;
        },
      };
      const returned = AsyncLazyIterable.fromIterable(customIterable);

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([1, 2]);
    });
  });

  describe("toSychronousterable()", () => {
    it("should convert an AsyncLazyIterable to a LazyIterable", async () => {
      const values = [1, 2, 3, 4, 5];
      async function* generator() {
        yield* values;
      }
      const base = new AsyncLazyIterable(generator());
      const returned = await base.toSynchronousIterable();

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(values);
    });
  });

  describe("toArray()", () => {
    it("should convert an AsyncLazyIterable into an array that holds the yielded values", async () => {
      const values = [1, 2, 3, 4, 5];
      async function* generator() {
        yield* values;
      }
      const returned = new AsyncLazyIterable(generator());

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(values);
    });

    it("should return an empty array if no values are yielded", async () => {
      /* eslint-disable */ // Allow empty generator function
      const returned = new AsyncLazyIterable((async function* () {})());
      /* eslint-enable */

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual([]);
    });
  });
});
