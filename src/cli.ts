import { app, MultiCommand, Option } from "command-line-application";
import ms from "pretty-ms";
import ora from "ora";
import path from "path";
import { cosmiconfig } from "cosmiconfig";

import { Fwoosh, FwooshOptions } from "./fwoosh.js";

const name = "fwoosh";
const explorer = cosmiconfig(name, {
  searchPlaces: [
    "package.json",
    `.${name}rc`,
    `.${name}rc.json`,
    `.${name}rc.yaml`,
    `.${name}rc.yml`,
    `.${name}rc.js`,
    `.${name}rc.cjs`,
    `${name}.config.js`,
    `${name}.config.json`,
    `${name}.config.cjs`,
  ],
});

const dirOption = {
  name: "dir",
  description: "The directory that contains the mdx files for your website.",
  type: String,
  defaultOption: true,
  defaultValue: "docs",
};

const sharedOptions: Option[] = [
  dirOption,
  {
    name: "out-dir",
    description: "The directory that the built website should ",
    type: String,
  },
];

const fwooshCli: MultiCommand = {
  name,
  description: "A lightening quick MDX static website generator.",
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
  const start = process.hrtime();
  const options = app(fwooshCli);
  const { config = {} } = (await explorer.search()) || {};
  const fwooshOptions = { ...config, ...options } as FwooshOptions;

  if (config.dir && fwooshOptions.dir === dirOption.defaultValue) {
    fwooshOptions.dir = config.dir;
  }

  if (!fwooshOptions.outDir) {
    fwooshOptions.outDir = path.join(fwooshOptions.dir, "out");
  }

  const fwoosh = new Fwoosh(fwooshOptions);

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

  const end = process.hrtime(start);
  console.info(`\n🔥 Took ${ms(end[1] / 1000000)}`);
}

run();
