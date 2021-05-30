import { LazyIterable, AsyncLazyIterable } from "../src";

describe("LazyIterable", () => {
  describe("constructor", () => {
    it("should return a new LazyIterable that wraps an AsyncGenerator", () => {
      const values = [1, 2, 3, 4, 5];
      function* generator() {
        yield* values;
      }
      const returned = new LazyIterable(generator());

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(values);
    });
  });

  describe("next()", () => {
    let iterable: LazyIterable<number>;

    beforeEach(() => {
      function* generator() {
        yield 1;
        yield 2;
      }

      iterable = new LazyIterable(generator());
    });

    it("should return the next value of the iteration", () => {
      expect(iterable.next()).toEqual({ value: 1, done: false });
    });

    it("should return done: true when there are no more values", () => {
      iterable.next();
      iterable.next();
      expect(iterable.next()).toEqual({ value: undefined, done: true });
    });

    it("should run the documentation example correctly", () => {
      const iter = LazyIterable.fromIterable([1, 2, 3]);
      expect(iter.next()).toEqual({ value: 1, done: false });
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: 3, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe("take()", () => {
    it("should return a new LazyIterable that yields the given number of values", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.take(5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle when there are less values than requested", () => {
      const base = LazyIterable.fromIterable([1, 2, 3]);
      const returned = base.take(5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3]);
    });

    it("should handle when a negative number is requested", () => {
      const base = LazyIterable.fromIterable([1, 2, 3]);
      const returned = base.take(-1);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([]);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable([1, 2, 3, 4, 5]).take(3).toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("takeWhile()", () => {
    it("should return a new LazyIterable that yields values until the given predicate is false", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.takeWhile(value => value < 5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3, 4]);
    });

    it("should yield every value if the predicate is always true", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.takeWhile(value => value < 11);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should yield values after the predicate is false, even if they satisfy the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]);
      const returned = base.takeWhile(value => value < 5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3, 4]);
    });

    it("should run the documentation example correctly", () => {
      const numbers = [1, 2, 3, 4, 3, 2, 6];
      expect(
        LazyIterable.fromIterable(numbers)
          .takeWhile(value => value < 4)
          .toArray(),
      ).toEqual([1, 2, 3]);

      expect(
        LazyIterable.fromIterable(numbers)
          .filter(value => value < 4)
          .toArray(),
      ).toEqual([1, 2, 3, 3, 2]);
    });
  });

  describe("drop()", () => {
    it("should return a new LazyIterable that ignores the given number of values", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.drop(5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([6, 7, 8, 9, 10]);
    });

    it("should handle when there are less values than requested", () => {
      const base = LazyIterable.fromIterable([1, 2, 3]);
      const returned = base.drop(5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([]);
    });

    it("should handle when a negative number is requested", () => {
      const base = LazyIterable.fromIterable([1, 2, 3]);
      const returned = base.drop(-1);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3]);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable([1, 2, 3, 4, 5]).drop(3).toArray()).toEqual([4, 5]);
    });
  });

  describe("dropWhile()", () => {
    it("should return a new LazyIterable that ignores values until the given predicate is false", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.dropWhile(value => value < 5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([5, 6, 7, 8, 9, 10]);
    });

    it("should yield no values if the predicate is always true", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const returned = base.dropWhile(value => value < 11);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([]);
    });

    it("should yield values after the predicate is false, even if they satisfy the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]);
      const returned = base.dropWhile(value => value < 5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([5, 4, 3, 2, 1]);
    });

    it("should run the documentation example correctly", () => {
      const numbers = [1, 2, 3, 4, 3, 2, 6];
      expect(
        LazyIterable.fromIterable(numbers)
          .dropWhile(value => value < 4)
          .toArray(),
      ).toEqual([4, 3, 2, 6]);
    });
  });

  describe("map()", () => {
    it("should return a new LazyIterable that yields values transformed by the given callback", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.map(value => value * 2);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([2, 4, 6, 8, 10]);
    });

    it("should run the documentation example correctly", () => {
      const strings = ["a", "b", "c", "def"];
      expect(
        LazyIterable.fromIterable(strings)
          .map(value => value.toUpperCase())
          .toArray(),
      ).toEqual(["A", "B", "C", "DEF"]);
    });
  });

  describe("filter()", () => {
    it("should return a new LazyIterable that only yields values that satisfy the given predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5, 4, 3, 2, 1]);
      const returned = base.filter(value => value < 5);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3, 4, 4, 3, 2, 1]);
    });

    it("should run the documentation example correctly", () => {
      const numbers = [1, 2, 3, 4, 3, 2, 6];
      expect(
        LazyIterable.fromIterable(numbers)
          .filter(value => value < 4)
          .toArray(),
      ).toEqual([1, 2, 3, 3, 2]);
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

    it("should call the given effect for each value and return a new LazyIterable that returns the original values", () => {
      const values = [1, 2, 3, 4, 5];
      const base = LazyIterable.fromIterable(values);
      const returned = base.runEffect(value => console.log(value));

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(values);
      values.forEach((value, i) => {
        expect(consoleSpy).toHaveBeenNthCalledWith(i + 1, value);
      });
    });

    it("should run the documentation example correctly", () => {
      const values = [1, 2, 3];
      const returned = LazyIterable.fromIterable(values)
        .runEffect(value => console.log(value))
        .map(value => value * 2)
        .toArray();

      expect(returned).toEqual([2, 4, 6]);
      values.forEach(value => {
        expect(consoleSpy).toBeCalledWith(value);
      });
    });
  });

  describe("feedTo()", () => {
    it("should feed yielded values into the provided generator and return a new LazyIterable", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.feedTo(function* (iterable: Iterable<number>) {
        for (const value of iterable) {
          yield value + 1;
        }
      });

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([2, 3, 4, 5, 6]);
    });

    it("should run the documentation example correctly", () => {
      function* chunk(stringIterable: Iterable<string>) {
        let previous = "";
        for (const value of stringIterable) {
          previous += value;
          if (previous.length > 5) {
            yield previous.substr(0, 5);
            previous = previous.substring(5);
          }
        }
        if (previous.length > 0) {
          yield previous;
        }
      }

      const strings = ["ABC", "DEFGHI", "JKLMN", "OPQRSTU", "VWXY", "Z"];

      const returned = LazyIterable.fromIterable(strings)
        .feedTo(chunk)
        .map(value => value.toLowerCase())
        .toArray();

      expect(returned).toEqual(["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]);
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

    it("should call the given effect for each value and return void", () => {
      const values = [1, 2, 3, 4, 5];
      const base = LazyIterable.fromIterable(values);
      const returned = base.forEach(value => console.log(value));

      expect(returned).toEqual(undefined);
      values.forEach((value, i) => {
        expect(consoleSpy).toHaveBeenNthCalledWith(i + 1, value);
      });
    });
  });

  describe("reduce()", () => {
    it("should build an accumulated value from the elements yielded out the LazyIterable", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.reduce((acc, elem) => acc + elem, 0);

      expect(returned).toEqual(1 + 2 + 3 + 4 + 5);
    });
  });

  describe("some()", () => {
    it("should return true if at least one element satisfies the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.some(value => value > 4);

      expect(returned).toBe(true);
    });

    it("should return false if no element satisfies the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.some(value => value < 0);

      expect(returned).toBe(false);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable([1, 2, 3, 4, 5]).some(value => value % 2 === 0)).toBe(true);
    });
  });

  describe("every()", () => {
    it("should return true if every element satisfies the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.every(value => value > 0);

      expect(returned).toBe(true);
    });

    it("should return false if at least one element fails the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.every(value => value < 4);

      expect(returned).toBe(false);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable([1, 2, 3, 4, 5]).every(value => value % 2 === 0)).toBe(false);
    });
  });

  describe("includes()", () => {
    it("should return true if the given element is yielded", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.includes(3);

      expect(returned).toBe(true);
    });

    it("should return false if the given element is never yielded", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.includes(6);

      expect(returned).toBe(false);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable(["apple", "orange", "pear"]).includes("pear")).toBe(true);
    });
  });

  describe("find()", () => {
    it("should return the first element that satisfies the predicate", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.find(value => value > 3);

      expect(returned).toEqual(4);
    });

    it("should return undefined if the predicate is never satisfied", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.find(value => value < 0);

      expect(returned).toEqual(undefined);
    });

    it("should run the documentation example correctly", () => {
      const strings = ["A", "BC", "DEF", "HIJK"];
      expect(LazyIterable.fromIterable(strings).find(value => value.length > 2)).toEqual("DEF");
    });
  });

  describe("indexOf()", () => {
    it("should return the index of the first element that matches the given value", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.indexOf(4);

      expect(returned).toEqual(3);
    });

    it("should return -1 if the value is never yielded", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.indexOf(6);

      expect(returned).toEqual(-1);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable(["A", "B", "C", "D"]).indexOf("C")).toEqual(2);
      expect(LazyIterable.fromIterable(["A", "B", "C", "D"]).indexOf("E")).toEqual(-1);
    });
  });

  describe("lastIndexOf()", () => {
    it("should return the last index of the first element that matches the given value", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 2, 1]);
      const returned = base.lastIndexOf(1);

      expect(returned).toEqual(4);
    });

    it("should return -1 if the value is never yielded", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4, 5]);
      const returned = base.lastIndexOf(6);

      expect(returned).toEqual(-1);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable(["A", "B", "C", "A"]).lastIndexOf("A")).toEqual(3);
      expect(LazyIterable.fromIterable(["A", "B", "C", "D"]).lastIndexOf("E")).toEqual(-1);
    });
  });

  describe("join()", () => {
    it("should join elements yielded from a LazyIterable into a string with a separator", () => {
      const base = LazyIterable.fromIterable(["First", "Second", "Third"]);
      const returned = base.join(" ");

      expect(returned).toEqual("First Second Third");
    });

    it("should default to using a comma as the separator", () => {
      const base = LazyIterable.fromIterable(["First", "Second", "Third"]);
      const returned = base.join();

      expect(returned).toEqual("First,Second,Third");
    });

    it("should not use the sepator if there is only one element", () => {
      const base = LazyIterable.fromIterable(["First"]);
      const returned = base.join();

      expect(returned).toEqual("First");
    });
  });

  describe("reverse()", () => {
    it("should return a LazyIterable that yields the values from the original in reverse", () => {
      const base = LazyIterable.fromIterable([1, 2, 3, 4]);
      const returned = base.reverse();

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([4, 3, 2, 1]);
    });

    it("should run the documentation example correctly", () => {
      expect(LazyIterable.fromIterable(["A", "B", "C", "D"]).reverse().toArray()).toEqual(["D", "C", "B", "A"]);
    });
  });

  describe("fromIterable()", () => {
    it("should convert an array to a LazyIterable", () => {
      const array = [1, 2, 3, 4, 5];
      const returned = LazyIterable.fromIterable(array);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(array);
    });

    it("should convert a string to a LazyIterable", () => {
      const string = "abcde";
      const returned = LazyIterable.fromIterable(string);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(["a", "b", "c", "d", "e"]);
    });

    it("should convert a set to a LazyIterable", () => {
      const set = new Set([1, 2, 1, 3, 2, 2]);
      const returned = LazyIterable.fromIterable(set);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2, 3]);
    });

    it("should convert a map to a LazyIterable", () => {
      const map = new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
      ]);
      const returned = LazyIterable.fromIterable(map);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([
        ["A", 1],
        ["B", 2],
        ["C", 3],
      ]);
    });

    it("should convert a custom iterable to a LazyIterable", () => {
      const customIterable = {
        *[Symbol.iterator]() {
          yield 1;
          yield 2;
        },
      };
      const returned = LazyIterable.fromIterable(customIterable);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([1, 2]);
    });
  });

  describe("toAsyncIterable()", () => {
    it("should convert a LazyIterable to an AsyncLazyIterable", async () => {
      const values = [1, 2, 3, 4, 5];
      const base = LazyIterable.fromIterable(values);
      const returned = base.toAsyncIterable();

      expect(returned).toBeInstanceOf(AsyncLazyIterable);
      expect(await returned.toArray()).toEqual(values);
    });
  });

  describe("toArray()", () => {
    it("should convert a LazyIterable into an array that holds the yielded values", () => {
      const values = [1, 2, 3, 4, 5];
      const returned = LazyIterable.fromIterable(values);

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual(values);
    });

    it("should return an empty array if no values are yielded", () => {
      /* eslint-disable */ // Allow empty generator function
      const returned = new LazyIterable((function* () {})());
      /* eslint-enable */

      expect(returned).toBeInstanceOf(LazyIterable);
      expect(returned.toArray()).toEqual([]);
    });
  });
});
