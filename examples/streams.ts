/**
 * LazyIterable Stream example
 *
 * To run: `npx ts-node streams.ts`
 *
 * This example shows how the AsyncLazyIterable can iteract with the Node Streams API.
 * By passing a readStream into `fromIterable()`, we can process chunks of data read from
 * a file with the familiar `Array` processing methods like `map()`, `filter()` etc.
 */
import { createReadStream, createWriteStream } from "fs";
import { Readable } from "stream";
import { resolve } from "path";

import { AsyncLazyIterable } from "../src";

log("Starting LazyIterable Stream example");
// Create a read stream with a purposefully small buffer (8) to ensure multiple chunks for this example
const inStream = createReadStream(resolve(__dirname, "./data/input.txt"), { encoding: "utf-8", highWaterMark: 8 });

// Convert the read stream from the file into an AsyncLazyIterable
const iterator = AsyncLazyIterable.fromIterable(inStream)
  // Log the chunks as they are read in
  .runEffect(chunk => log(`Read chunk '${chunk.replace(/\n/g, "\\n")}'`))
  // Pass the chunks into the generator function that converts them to formatted lines
  .feedTo(chunksToLines)
  // Fake some async action with delay for this example
  .feedTo(delay)
  // Append line numbers to the lines
  .map((line, index) => `${index + 1}: ${line}`)
  // Log the lines as they are written out
  .runEffect(line => log(`Written line '${line.trim()}'`));

// Create a write stream and pipe the results of the pipeline into a file
const outStream = createWriteStream(resolve(__dirname, "./data/output.txt"));
Readable.from(iterator).pipe(outStream);
outStream.on("finish", () => {
  log("Finished");
  inStream.close();
  outStream.close();
});

// Convert chunks from the read stream into proper lines terminated by the EOL character
async function* chunksToLines(chunkIterable: AsyncIterable<string>): AsyncGenerator<string, void, void> {
  const EOL = "\n";
  let previous = "";

  for await (const chunk of chunkIterable) {
    previous += chunk;

    while (true) {
      const eolIndex = previous.indexOf(EOL);
      if (eolIndex === -1) {
        break;
      }

      yield previous.slice(0, eolIndex + 1);
      previous = previous.slice(eolIndex + 1);
    }
  }

  if (previous.length > 0) {
    yield previous;
  }
}
// Fake an async action with some delay
async function* delay<T>(iterable: AsyncIterable<T>): AsyncGenerator<T, void, void> {
  for await (const value of iterable) {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000);
    });
    yield value;
  }
}
// Helper function to log times to the console
function log(message: string) {
  console.log(`${new Date().toLocaleTimeString("en-US")} ${message}`);
}
