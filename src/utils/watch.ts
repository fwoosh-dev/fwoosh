import http from "http";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import ms from "pretty-ms";
import { buildPage, BuildPageOptions } from "./build-page.js";
import ansi from "ansi-colors";

const { bold, underline, green } = ansi;

interface WatchPagesOptions {
  port: number;
}

export const watchPages = (
  options: WatchPagesOptions,
  buildOptions: BuildPageOptions
) => {
  return new Promise<void>((resolve, reject) => {
    const spinner = ora(`🏃‍♂ fwoosh`).start();

    const server = new http.Server(async ({ url }, res) => {
      if (!url) {
        return res.end();
      }

      if (url.includes(".html")) {
        spinner.start(`Building ${url}...`);

        const start = process.hrtime();
        const file = url.replace(".html", ".mdx");
        const pagePath = path.join(buildOptions.dir, file);

        await buildPage(pagePath, buildOptions);
        
        res.write(
          await fs.readFile(path.join(process.cwd(), buildOptions.outDir, url))
        );
        res.end();

        const end = process.hrtime(start);
        spinner.text = `Built ${bold(`"${pagePath}"`)}, took ${green(
          ms(end[1] / 1000000)
        )}`;
      } else {
        res.end();
      }
    });

    server.listen(options.port, () => {
      spinner.succeed(
        `Ready on ${underline(`http://localhost:${options.port}/index.html`)}`
      );
    });

    server.on("error", (error) => {
      reject(error);
    });

    server.on("close", () => {
      resolve();
    });
  });
};
