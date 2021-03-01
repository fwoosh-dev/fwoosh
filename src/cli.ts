import { app, MultiCommand, Option } from "command-line-application";
import ms from "pretty-ms";
import ora from "ora";
import path from "path";
import fs from "fs-extra";

import { buildPages, BuildPageOptions } from "./utils/build-page.js";
import { watchPages } from "./utils/watch.js";
import { getCacheDir } from "./utils/get-cache-dir.js";

const sharedOptions: Option[] = [
  {
    name: "dir",
    description: "The directory that contains the mdx files for your website.",
    type: String,
    defaultOption: true,
    defaultValue: "docs",
  },
  {
    name: "out-dir",
    description: "The directory that the built website should ",
    type: String,
  },
];

const fwoosh: MultiCommand = {
  name: "fwoosh",
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
  const buildOptions = options as BuildPageOptions;

  if (!buildOptions.outDir) {
    buildOptions.outDir = path.join(buildOptions.dir, "out");
  }

  buildOptions.layouts = [];

  buildOptions.layouts.push(path.join(buildOptions.dir, "layouts"));

  if (options) {
    if (options._command === "build") {
      await buildPages(buildOptions);
    } else if (options._command === "clean") {
      fs.rmSync(buildOptions.outDir, { recursive: true, force: true });
      fs.rmSync(getCacheDir(), { recursive: true, force: true });
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
