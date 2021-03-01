import { app, MultiCommand, Option } from "command-line-application";
import ms from "pretty-ms";
import ora from "ora";
import path from "path";
import fs from "fs-extra";
import { cosmiconfig } from "cosmiconfig";

import { buildPages, BuildPageOptions } from "./utils/build-page.js";
import { watchPages } from "./utils/watch.js";
import { getCacheDir } from "./utils/get-cache-dir.js";

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

const fwoosh: MultiCommand = {
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
      description: "Clean up all output files",
      options: sharedOptions,
    },
  ],
};

async function run() {
  const start = process.hrtime();
  const options = app(fwoosh);
  const { config } = (await explorer.search()) || {};
  const buildOptions = { ...config, ...options } as BuildPageOptions;

  if (config.dir && buildOptions.dir === dirOption.defaultValue) {
    buildOptions.dir = config.dir;
  }

  if (!buildOptions.outDir) {
    buildOptions.outDir = path.join(buildOptions.dir, "out");
  }

  buildOptions.layouts = [];

  buildOptions.layouts.push(path.join(buildOptions.dir, "layouts"));

  const clean = () => {
    fs.rmSync(buildOptions.outDir, { recursive: true, force: true });
    fs.rmSync(getCacheDir(), { recursive: true, force: true });
  };

  if (options) {
    if (options._command === "build") {
      clean();
      await buildPages(buildOptions);
    } else if (options._command === "clean") {
      clean();
      ora("").succeed("Cleaned output files.");
    } else {
      await watchPages(
        {
          port: 3000,
        },
        buildOptions
      );
    }
  }

  const end = process.hrtime(start);
  console.info(`\n🔥 Took ${ms(end[1] / 1000000)}`);
}

run();
