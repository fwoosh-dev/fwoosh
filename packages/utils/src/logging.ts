import consola from "consola";

export const log = consola.create({
  level:
    process.env.LOG_LEVEL === "info"
      ? 3
      : process.env.LOG_LEVEL === "debug"
      ? 4
      : 2,
});
