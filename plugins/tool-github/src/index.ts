import { Plugin, Fwoosh } from "fwoosh";
import { createRequire } from "module";
import parseGithubUrl from "parse-github-url";

const require = createRequire(import.meta.url);

interface GithubOptions {
  /**
   * The repo to link to from the toolbar button.
   *
   * @example "fwoosh-dev/fwoosh"
   * @example "https://github.com/fwoosh-dev/fwoosh"
   */
  repo: string;
}

export default class Github implements Plugin {
  name = "github" as const;

  params: { branch?: string } = {};

  private options: GithubOptions;

  constructor(options: GithubOptions) {
    const info = parseGithubUrl(options.repo);
    const repo = info
      ? `https://${info.host}/${info.pathname}${
          info.hash ? `$${info.hash}` : ""
        }`
      : options.repo;

    this.options = { repo };
  }

  apply(fwoosh: Fwoosh) {
    fwoosh.hooks.registerToolbarControl.tap(this.name, (controls) => {
      return [
        ...controls,
        {
          name: "Github Repo",
          filepath: require.resolve("./toolbar"),
          scope: "global",
        },
      ];
    });

    fwoosh.hooks.modifyViteConfig.tap(this.name, (config) => {
      config.define = config.define ?? {};
      config.define["process.env.FWOOSH_GITHUB_URL"] = `"${this.options.repo}"`;

      return config;
    });
  }
}
