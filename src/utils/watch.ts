import http from "http";
import path from "path";
import ora from "ora";
import chokidar from "chokidar";
import liveServer from "live-server";
import ms from "pretty-ms";
import { buildPage, BuildPageOptions, PageBuild } from "./build-page.js";
import ansi from "ansi-colors";

const { bold, underline, green } = ansi;

interface WatchPagesOptions {
  port: number;
}

const makeBuildMessage = (pagePath: string, time: number, rebuild = false) => {
  return `${rebuild ? "Rebuild" : "Built"} ${bold(
    `"${pagePath}"`
  )}, took ${green(ms(time / 1000000))}`;
};

export const watchPages = (
  options: WatchPagesOptions,
  buildOptions: BuildPageOptions
) => {
  return new Promise<void>((resolve, reject) => {
    const spinner = ora(`🏃‍♂ fwoosh`).start();
    const builders: PageBuild[] = [];

    chokidar
      .watch(`${buildOptions.dir}/**/*.{mdx,jsx,tsx}`, {
        interval: 0, // No delay
      })
      .on("change", async (path) => {
        const cachedBuilder = builders.find((b) => b.page === path);

        if (cachedBuilder) {
          const start = process.hrtime();
          await cachedBuilder.rebuild();
          const end = process.hrtime(start);
          spinner.text = makeBuildMessage(path, end[1], true);
        }
      });

    const server = (liveServer.start({
      port: options.port,
      root: buildOptions.outDir,
      // @ts-ignore
      watch: buildOptions.outDir,
      logLevel: 0,
      middleware: [
        async ({ url }, res: http.ServerResponse, next) => {
          if (url.includes(".html")) {
            const file = url.replace(".html", ".mdx");
            const pagePath = path.join(buildOptions.dir, file);
            const cachedBuilder = builders.find((b) => b.page === pagePath);

            // Since we also have a file watcher going we don't need build any
            // pages on request if they already been built. The will be taken care
            // of by chokidar
            if (cachedBuilder) {
            } else {
              const start = process.hrtime();
              spinner.start(`Building ${url}...`);
              const builder = await buildPage(pagePath, {
                ...buildOptions,
                watch: true,
              });

              builders.push(builder);
              const end = process.hrtime(start);
              spinner.text = makeBuildMessage(pagePath, end[1]);
            }
          }

          next();
        },
      ],
    }) as unknown) as http.Server;

    server.on("listening", () => {
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
