import { AsyncLazyIterable } from "./asyncLazyIterable";
import { enumerate } from "./functions";
/**
 * @author James Errington <james.errington@protonmail.com>
 * @since 1.0.0
 *
 * A wrapper class that encapsulates a lazyily-evaluated iterable; a synchronous list of values that are generated on-demand.
 *
 * @typeParam T - The type yielded from the [[LazyIterable]]
 */
export class LazyIterable<T> {
  /**
   * @hidden
   */
  private readonly generator: Generator<T>;
  /**
   * @example
   * Create a new [[LazyIterable]] from a generator function:
   * ```typescript
   * function* generator() {
   *   for (let i = 0; i < 10; i++) {
   *     yield i
   *   }
   * }
   *
   * const iterable = new LazyIterable(generator())
   * ```
   *
   * @param generator The generator to be wrapped in the [[LazyIterable]]
   *
   * @since 1.0.0
   */
  public constructor(generator: Generator<T>) {
    this.generator = generator;
  }
  /**
   * @hidden
   */
  [Symbol.iterator](): Generator<T> {
    return this.generator;
  }
  /**
   * Returns an object with two properties: `value`, and `done`. `value` holds the next value of the iteration sequence,
   * based on the current state of the internal generator. `done` is `true` if the last value of the generator has already been consumed,
   * otherwise `false`.
   *
   * @example Using the `next` method to manually iterate a [[LazyIterable]]
   * ```typescript
   * const iterable = LazyIterable.fromIterable([1, 2, 3])
   * iterable.next() // Returns { value: 1, done: false }
   * iterable.next() // Returns { value: 2, done: false }
   * iterable.next() // Returns { value: 3, done: false }
   * iterable.next() // Returns { value: undefined, done: true }
   * // All subsequent calls to next() return { value: undefined, done: true }
   * ```
   *
   * @returns The result from one iteration of the generator
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators|MDN - Iterators and generators} for more detail
   * @since 1.0.0
   * @category Eager
   */
  public next(): IteratorResult<T> {
    return this.generator.next();
  }
  /**
   * Returns a new [[LazyIterable]] that yields the first `items` number of values from the base generator.
   *
   * @example Convert an infinite generator to a finite one
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).take(3).toArray() // Returns [1, 2, 3]
   * ```
   *
   * @param items The number of values to take from the generator
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://www.learnrxjs.io/learn-rxjs/operators/filtering/take|LearnRxJS - take} for the RxJS version
   * @since 1.0.0
   * @category Lazy
   */
  public take(items: number): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          if (i >= items) {
            return;
          }
          yield value;
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that yields values from the base generator until the provided `predicate` is `false`.
   * This is different to [[filter]] in that no values after the first `false` response are yielded.
   *
   * @example takeWhile vs filter
   * ```typescript
   * const numbers = [1, 2, 3, 4, 3, 2, 6]
   * LazyIterable.fromIterable(numbers).takeWhile(value => value < 4).toArray() // Returns [1, 2, 3]
   *
   * LazyIterable.fromIterable(numbers).filter(value => value < 4).toArray() // Returns [1, 2, 3, 3, 2]
   * ```
   *
   * @param predicate
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://www.learnrxjs.io/learn-rxjs/operators/filtering/takewhile|LearnRxJS - takeWhile} for the RxJS version
   * @since 1.0.0
   * @category Lazy
   */
  public takeWhile(predicate: (value: T, index: number) => boolean): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          if (predicate(value, i)) {
            yield value;
          } else {
            return;
          }
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that ignores the first `items` values from the base generator before yielding.
   *
   * @example Drop 3 values before yielding
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).drop(3).toArray() // Returns [4, 5]
   * ```
   *
   * @param items The number of values to ignore from the generator
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://www.learnrxjs.io/learn-rxjs/operators/filtering/skip|LearnRxJS - skip} for the RxJS version
   * @since 1.0.0
   * @category Lazy
   */
  public drop(items: number): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          if (i >= items) {
            yield value;
          }
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that ignores values from the base generator until the provided `predicate` is false.
   *
   * @example Drop values until a threshold is first met
   * ```typescript
   * const numbers = [1, 2, 3, 4, 3, 2, 6]
   * LazyIterable.fromIterable(numbers).dropWhile(value => value < 4).toArray() // Returns [4, 3, 2, 6]
   * ```
   *
   * @param predicate
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://www.learnrxjs.io/learn-rxjs/operators/filtering/skipwhile|LearnRxJS - skipWhile} for the RxJS version
   * @since 1.0.0
   * @category Lazy
   */
  public dropWhile(predicate: (value: T, index: number) => boolean): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        let dropping = true;
        for (const [i, value] of enumerate(self)) {
          if (dropping && predicate(value, i) === false) {
            dropping = false;
          }

          if (dropping === false) {
            yield value;
          }
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that yields the result of applying the provided `callback` to values from the base generator.
   *
   * @example Convert yielded values to uppercase
   * ```typescript
   * const strings = ["a", "b", "c", "def"]
   * LazyIterable
   *   .fromIterable(strings)
   *   .map(value => value.toUpperCase())
   *   .toArray() // Returns ["A", "B", "C", "DEF"]
   * ```
   *
   * @typeParam S - The type returned by the callback
   * @param callback
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|MDN - Array.prototype.map()} for the standard `Array` method.
   * @since 1.0.0
   * @category Lazy
   */
  public map<S>(callback: (value: T, index: number) => S): LazyIterable<S> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          yield callback(value, i);
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that yields only those values from the base generator for which the provided `predicate` is `true`.
   *
   * @example Filter values below a threshold
   * ```typescript
   * const numbers = [1, 2, 3, 4, 3, 2, 6]
   * LazyIterable.fromIterable(numbers).filter(value => value < 4).toArray() // Returns [1, 2, 3, 3, 2]
   * ```
   *
   * @param predicate
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter|MDN - Array.prototype.filter()} for the standard `Array` method.
   * @since 1.0.0
   * @category Lazy
   */
  public filter(predicate: (value: T, index: number) => boolean): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          if (predicate(value, i)) {
            yield value;
          }
        }
      })(),
    );
  }
  /**
   * Performs an effectful callback `effect` for each value yielded from the base generator,
   * and returns a new [[LazyIterable]] that just passes the values on. Can be considered a helper function
   * for an effectful [[map]] on the identity function, or a lazy version of [[forEach]].
   *
   * @example Insert a logging utility function inside a [[LazyIterable]] chain
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3]).runEffect(value => console.log(value)).map(value => value * 2).toArray()
   * // Logs 1, 2, 3 to the console, and returns [2, 4, 6]
   * ```
   *
   * @param effect
   * @returns A new [[LazyIterable]], for chaining
   *
   * @since 1.0.0
   * @category Lazy
   */
  public runEffect(effect: (value: T, index: number) => unknown): LazyIterable<T> {
    const self = this;
    return new LazyIterable(
      (function* () {
        for (const [i, value] of enumerate(self)) {
          effect(value, i);
          yield value;
        }
      })(),
    );
  }
  /**
   * Returns a new [[LazyIterable]] that yields the values returned from calling the provided `generator` with values from the base generator.
   * Can be considered a generalisation of the other lazy processing methods, and is useful when more complex processing is required;
   * for example, when stateful knowledge of past values is needed.
   *
   * @example Chunk an array of strings into set lengths and apply processing
   * ```typescript
   * // Generator function to chunk strings into lengths of 5
   * function* chunk(stringIterable: Iterable<string>) {
   *   let previous = "" // We require knowledge of past values yielded from the generator
   *   for (const value of stringIterable) {
   *     previous += value
   *     if (previous.length > 5) {
   *       yield previous.substr(0, 5)
   *       previous = previous.substring(5)
   *     }
   *   }
   *   if (previous.length > 0) {
   *     yield previous
   *   }
   * }
   *
   * const strings = ["ABC", "DEFGHI", "JKLMN", "OPQRSTU", "VWXY", "Z"]
   * // With a LazyIterable, we can perform the chunking and the lower case conversion without needing a custom 'Lowercase Chunk' generator
   * LazyIterable
   *   .fromIterable(strings)
   *   .feedTo(chunk)
   *   .map(value => value.toLowerCase())
   *   .toArray() // Returns ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
   * ```
   *
   * @param generatorFunc
   * @returns A new [[LazyIterable]], for chaining
   *
   * @since 1.0.0
   * @category Lazy
   */
  public feedTo<S>(generatorFunc: (seed: Iterable<T>) => Generator<S>): LazyIterable<S> {
    return new LazyIterable(generatorFunc(this));
  }
  /**
   * Similar to [[runEffect]], calls the given `callback` for each value yielded from the [[LazyIterable]], but does not return a new iterable.
   * As an eager method, calling `forEach` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Log values from a [[LazyIterable]]
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).forEach(value => console.log(value))
   * // Logs 1, 2, 3, 4, 5 each on a new line
   * ```
   *
   * @param callback
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN - Array.prototype.forEach()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public forEach(callback: (value: T, index: number) => unknown): void {
    for (const [i, value] of enumerate(this)) {
      callback(value, i);
    }
  }
  /**
   * Applies the given `reducer` function for each value yielded from the [[LazyIterable]], returning a single output value.
   * As an eager method, calling `reduce` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Sum the values yielded by a [[LazyIterable]]
   * ```typescript
   * function sumReducer(accumulator: number, value: number) {
   *   return accumulator + value
   * }
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).reduce(sumReducer, 0) // Returns 15
   * ```
   *
   * @typeParam S - The type of the accumulated value
   * @param reducer The function to apply for each value yielded
   * @param initial The initial value for the accumulator
   * @returns The final result of the reduction
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|MDN - Array.prototype.reduce()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public reduce<S>(reducer: (accumulator: S, value: T, index: number) => S, initial: S): S {
    let accumulator = initial;
    for (const [i, value] of enumerate(this)) {
      accumulator = reducer(accumulator, value, i);
    }
    return accumulator;
  }
  /**
   * Tests values yielded from the [[LazyIterable]] against the given `predicate`, returning `true` if it is satisfied at least once.
   * As an eager method, calling `some` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Test for at least one even number
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).some(value => value % 2 === 0) // Returns true
   * ```
   *
   * @param predicate
   * @returns `true` if at least one value satisfies the given `predicate`, else `false`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|MDN - Array.prototype.some()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public some(predicate: (value: T, index: number) => boolean): boolean {
    for (const [i, value] of enumerate(this)) {
      if (predicate(value, i) === true) {
        return true;
      }
    }
    return false;
  }
  /**
   * Tests values yielded from the [[LazyIterable]] against the given `predicate`, returning `true` if it is satisfied every time.
   * As an eager method, calling `every` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Test for all even numbers
   * ```typescript
   * LazyIterable.fromIterable([1, 2, 3, 4, 5]).every(value => value % 2 === 0) // Returns false
   * ```
   *
   * @param predicate
   * @returns `true` if every value satisfies the given `predicate`, else `false`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|MDN - Array.prototype.every()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public every(predicate: (value: T, index: number) => boolean): boolean {
    for (const [i, value] of enumerate(this)) {
      if (predicate(value, i) === false) {
        return false;
      }
    }
    return true;
  }
  /**
   * Determines if the [[LazyIterable]] yielded a given value `search`.
   * As an eager method, calling `includes` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Test if a value was yielded
   * ```typescript
   * LazyIterable.fromIterable(["apple", "orange", "pear"]).includes("pear") // Returns true
   * ```
   *
   * @param search The value to search for.
   * @returns `true` if the given value was yielded, else `false`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes|MDN - Array.prototype.includes()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public includes(search: T): boolean {
    for (const value of this) {
      if (value === search) {
        return true;
      }
    }
    return false;
  }
  /**
   * Returns the first value yielded by the [[LazyIterable]] that satisfies the given `predicate`.
   * As an eager method, calling `find` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Find a value yielded from a [[LazyIterable]]
   * ```typescript
   * const strings = ["A", "BC", "DEF", "HIJK"]
   * LazyIterable.fromIterable(strings).find(value => value.length > 2) // Returns "DEF"
   * ```
   *
   * @param predicate
   * @returns The value of the first element that satisfies the given `predicate`, or `undefined` if no value exists.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|MDN - Array.prototype.find()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public find(predicate: (value: T, index: number) => boolean): T | undefined {
    for (const [i, value] of enumerate(this)) {
      if (predicate(value, i) === true) {
        return value;
      }
    }
    return undefined;
  }
  /**
   * Returns the index of the value that matches the given `search` value; in a [[LazyIterable]], this translates to the number of values that have been yielded before an instance of `search` is found.
   * As an eager method, calling `indexOf` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Count values yielded before a given value
   * ```typescript
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).indexOf("C") // Returns 2
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).indexOf("E") // Returns -1
   * ```
   *
   * @param search The value to search for.
   * @returns How many values had been yielded from the [[LazyIterable]] before `search`, or -1 if `search` is never yielded.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|MDN - Array.prototype.indexOf()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public indexOf(search: T): number {
    for (const [i, value] of enumerate(this)) {
      if (value === search) {
        return i;
      }
    }
    return -1;
  }
  /**
   * Returns the last index of the value that matches the given `search` value; in a [[LazyIterable]], this translates to the number of values that have been yielded before the last instance of `search` is found.
   * As an eager method, calling `lastIndexOf` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases. The [[LazyIterable]] must also be finite for this method to work.
   *
   * Note the difference between this method and the standard `Array` implementation; because a [[LazyIterable]] encapsulates a stream of values that have yet to be fully evaluated,
   * `lastIndexOf` cannot search backwards, and so this method on its own is likely much less efficient.
   *
   * @example Count values yielded before the last instance of a given value
   * ```typescript
   * LazyIterable.fromIterable(["A", "B", "C", "A"]).indexOf("A") // Returns 3
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).indexOf("E") // Returns -1
   * ```
   *
   * @param search The value to search for.
   * @returns How many values had been yielded from the [[LazyIterable]] before the last instance of `search`, or -1 if `search` is never yielded.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf|MDN - Array.prototype.lastIndexOf()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public lastIndexOf(search: T): number {
    let lastIndex = -1;
    for (const [i, value] of enumerate(this)) {
      if (value === search) {
        lastIndex = i;
      }
    }
    return lastIndex;
  }
  /**
   * Returns a string formed by concatenating each element yielded from the [[LazyIterable]], separated by the given separator, or a comma ',' if none is provided.
   * If only one value is yielded, that value is returned as a string with no seperator. If no values are yielded, an empty string is returned.
   * As an eager method, calling `join` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Build a string from elements of a [[LazyIterable]]
   * ```typescript
   * LazyIterable.fromIterable(["First", "Second", "Third"].join(" ") // Returns "First Second Third"
   * LazyIterable.fromIterable(["First", "Second", "Third"].join()    // Returns "First,Second,Third"
   * ```
   *
   * @param separator The string that will separate elements in the final string. Defaults to comma ',' if none is provided.
   * @returns A string with each element of the [[LazyIterable]] joined.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join|MDN - Array.prototype.join()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public join(separator: string = ","): string {
    let result = "";
    for (const value of this) {
      result += value + separator;
    }
    return result.substring(0, result.length - separator.length);
  }
  /**
   * Returns a new [[LazyIterable]] that yields the values of the original [[LazyIterable]] in reverse order.
   * As an eager method, calling `reverse` will trigger an evaluation of the [[LazyIterable]]. Since values cannot be re-yielded once run,
   * it may be more appropriate to use the standard `Array` method for some use cases.
   *
   * @example Reverse a [[LazyIterable]]
   * ```typescript
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).reverse().toArray() // Returns ["D", "C", "B", "A"]
   * ```
   * @returns A new [[LazyIterable]], for chaining
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse|MDN - Array.prototype.reverse()} for the standard `Array` method.
   * @since 1.0.0
   * @category Eager
   */
  public reverse(): LazyIterable<T> {
    const reversed = this.toArray().reverse();
    return LazyIterable.fromIterable(reversed);
  }
  /**
   * Converts an `Iterable` into a new [[LazyIterable]]. The input can be anything that implements the `@@iterator` method;
   * common built-in iterables include `Array`, `String`, `Set`, and `Map`.
   *
   * @example Convert a built in `Iterable` to a [[LazyIterable]]:
   * ```typescript
   * // Array and String are common iterables
   * const arrayIterable = LazyIterable.fromIterable([1, 2, 3, 4, 5])
   * const stringIterable = LazyIterable.fromIterable("Hello world!")
   *
   * // `Set` and `Map` are also both iterable
   * const set = new Set([1, 2, 1, 3, 2, 2])
   * const setIterable = LazyIterable.fromIterable(set)
   *
   * const map = new Map([["A", 1], ["B", 2], ["C", 3]])
   * const mapIterable = LazyIterable.fromIterable(map)
   * ```
   * @example Convert a custom `Iterable` into a [[LazyIterable]]
   * ```typescript
   * const customIterable = {
   *   *[Symbol.iterator]() {
   *     yield 1
   *     yield 2
   *   }
   * }
   * const lazyIterable = LazyIterable.fromIterable(customIterable)
   * ```
   *
   * @typeParam S - The type returned from the input iterable
   * @param iterable
   * @returns A new [[LazyIterable]]
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators|MDN - Iterators and generators} for more detail
   * @since 1.0.0
   * @category Conversion
   */
  public static fromIterable<S>(iterable: Iterable<S>): LazyIterable<S> {
    return new LazyIterable(
      (function* () {
        yield* iterable;
      })(),
    );
  }
  /**
   * Convert this [[LazyIterable]] into an [[AsyncLazyIterable]], which allows for async methods to be performed on the values yielded.
   *
   * @example Convert a [[LazyIterable]] to an [[AsyncLazyIterable]]
   * ```typescript
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).toAsyncIterable()
   * ```
   *
   * @returns A new [[AsyncLazyIterable]]
   *
   * @since 1.0.0
   * @category Conversion
   */
  public toAsyncIterable(): AsyncLazyIterable<Awaited<T>> {
    const self = this;
    return new AsyncLazyIterable(
      (async function* () {
        yield* self as Iterable<Awaited<T>>;
      })(),
    );
  }
  /**
   * Returns a standard `Array` containing the values yielded from the [[LazyIterable]] in order.
   * This is an eager method, which means it requires the evaluation of the [[LazyIterable]]; therefore, you must ensure that the underlying [[LazyIterable]] is not infinite.
   *
   * As this method relies on the standard `Array.from()` method, it returns a shallow copied `Array`.
   *
   * @example Convert a [[LazyIterable]] to a standard `Array`
   * ```typescript
   * LazyIterable.fromIterable(["A", "B", "C", "D"]).toArray() // Returns ["A", "B", "C", "D"]
   * ```
   *
   * @returns A new `Array` instance
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from|MDN - Array.reverse()} for the standard `Array` method.
   * @since 1.0.0
   * @category Conversion
   */
  public toArray(): T[] {
    return Array.from(this);
  }
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
