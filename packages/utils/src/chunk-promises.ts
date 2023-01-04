import chunk from "lodash.chunk";

import { log } from "./logging.js";

export async function chunkPromisesTimes<T>(
  items: T[],
  times: number,
  process: (video: T, chunk: number) => Promise<unknown>
) {
  const chunks = chunk(items, times);

  await chunks.reduce(async (last, chunk, index) => {
    await last;
    log.debug(`Processing chunk ${index + 1} of ${chunks.length}`);
    await Promise.all(chunk.map((chunk) => process(chunk, index)));
  }, Promise.resolve());
}
