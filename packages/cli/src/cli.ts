import { app, MultiCommand, Option } from "command-line-application";
import ms from "pretty-ms";
import ora from "ora";
import { lilconfig } from "lilconfig";

import { FwooshOptions } from "./types.js";

const loadEsm = (filepath: string) => import(filepath);

const name = "fwoosh";
const explorer = lilconfig(name, {
  searchPlaces: [
    "package.json",
    `.${name}rc`,
    `.${name}rc.json`,
    `.${name}rc.js`,
    `.${name}rc.cjs`,
    `${name}.config.mjs`,
    `${name}.config.js`,
    `${name}.config.json`,
  ],
  loaders: {
    ".js": loadEsm,
    ".mjs": loadEsm,
  },
});

const storiesOption: Option = {
  name: "stories",
  description: "Globs to match story files",
  type: String,
  defaultOption: true,
  multiple: true,
  defaultValue: "**/*.stories.{js,jsx,tsx}",
};

const sharedOptions: Option[] = [
  storiesOption,
  {
    name: "out-dir",
    description: "The directory that the built website should ",
    type: String,
    defaultValue: "./out",
  },
  {
    name: "title",
    description: "The title for the storybook/docs",
    type: String,
    defaultValue: "Component",
  },
  {
    name: "log-level",
    description: "The amount of logs to print",
    type: String,
    defaultValue: "log",
    typeLabel: "log | info | debug | trace",
  },
];

const fwooshCli: MultiCommand = {
  name,
  description: "A lightening quick component development",
  commands: [
    {
      name: "build",
      description: "Do a production build of the website",
      options: sharedOptions,
    },
    {
      name: "dev",
      description: "Start the development server",
      options: sharedOptions,
    },
    {
      name: "clean",
      description: "Clean up all the output files",
      options: sharedOptions,
    },
  ],
};

async function run() {
  const start = performance.now();
  const options = app(fwooshCli);
  const { config = {} } = (await explorer.search()) || {};
  const fwooshOptions = { ...options, ...config.default } as FwooshOptions;

  if (config.stories) {
    fwooshOptions.stories = config.stories;
  }

  if (options?.logLevel) {
    process.env.LOG_LEVEL = options.logLevel;
  }

  // Dynamic import so we can set env vars before loading
  const { Fwoosh } = await import("./fwoosh.js");
  const fwoosh = new Fwoosh(fwooshOptions);

  await fwoosh.loadPlugins();

  if (options) {
    if (options._command === "build") {
      await fwoosh.clean();
      await fwoosh.build();
    } else if (options._command === "clean") {
      await fwoosh.clean();
      ora("").succeed("Cleaned output files.");
    } else {
      await fwoosh.dev();
    }
  }

  const { log } = await import("@fwoosh/utils");
  const end = performance.now();
  log.info(`Dev server start up took: ${ms(end - start)}`);
}

run();
