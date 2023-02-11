import consola from "consola";
import ms from "pretty-ms";
import { performance } from "perf_hooks";

const perfLogger = consola.create({
  level: process.env.MEASURE_PERF ? Infinity : -Infinity,
});

export const perfLog = (name: string) => {
  const start = performance.now();

  return () => {
    const end = performance.now();
    perfLogger.info(`[perf: ${ms(end - start).padEnd(8, " ")}]: ${name}`);
  };
};
