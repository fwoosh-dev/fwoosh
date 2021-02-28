import { app, MultiCommand, Option } from "command-line-application";
import ms from "pretty-ms";

import { buildPages, BuildPageOptions } from "./utils/build-page.js";
import { watchPages } from "./utils/watch.js";

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
    defaultValue: "docs/out",
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
  ],
};

async function run() {
  const start = process.hrtime();
  const options = app(fwoosh);

  if (options) {
    if (options._command === "build") {
      await buildPages(options as BuildPageOptions);
    } else {
      await watchPages(
        {
          port: 3000,
        },
        options as BuildPageOptions
      );
    }
  }

  const end = process.hrtime(start);
  console.info(`\n🔥 Took ${ms(end[1] / 1000000)}`);
}

run();
