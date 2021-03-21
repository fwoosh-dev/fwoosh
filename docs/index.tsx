import * as React from "react";
import { FrontMatter } from "fwoosh";
import { components } from "fwoosh/components";
import { tw } from "twind";

import InstallSnippet from "./snippets/install-snippet.mdx";
import HelpSnippet from "./snippets/help-snippet.mdx";
import ConfigurationSnippet from "./snippets/configuration-snippet.mdx";

const description = "A lightening quick MDX static website generator";

export const frontMatter: FrontMatter = {
  title: "fwoosh",
  description,
};

interface CommandDescriptionProps {
  name: string;
  description: string;
}

const CommandDescription = ({ name, description }: CommandDescriptionProps) => (
  <li>
    <span className={tw`text-xl font-semibold text(blue-500 dark:blue-700)`}>
      {name}
    </span>
    <span className="dark:text-gray-200">: {description}</span>
  </li>
);

interface FeatureProps {
  icon: string;
  description: React.ReactNode;
}

const Feature = ({ icon, description }: FeatureProps) => (
  <li className="flex space-x-2 items-start">
    <div className="text-2xl">{icon}</div>
    <div className="mt-0.5 dark:text-gray-200">{description}</div>
  </li>
);

export default function Home() {
  return (
    <main>
      <div
        className={tw`
          flex flex-col items-center justify-center
           h(72 lg:96) 
           ${() => ({ background: "conic-gradient(at top right, #E5E7EB, white)" })}
           dark:bg-gray-800 dark:bg-none	
        `}
      >
        <h1
          className={tw`text(6xl lg:8xl) text(gray-800 dark:white) font-extralight mb(6 lg:8) px-12`}
        >
          <picture>
            <source srcSet="logo-dark.svg" media="(prefers-color-scheme: dark)" className={tw`w-full`} />
            <img src="logo.svg" alt="fwoosh" />
          </picture>
        </h1>
        <p
          className={tw`text-xl text(gray-600 dark:gray-300) text-center px-4`}
        >
          {description}
        </p>
      </div>

      <div className="mx-auto my-16 max-w-2xl px-8">
        <h2
          className={tw`text(2xl lg:3xl) text-center mb-10 dark:text-gray-100`}
        >
          Life's too short waiting for websites to load
        </h2>

        <ul className="text-lg space-y-4">
          <Feature
            icon="⚡️"
            description={
              <>
                Lightening quick builds powered by{" "}
                <components.a href="https://esbuild.github.io/">
                  esbuild
                </components.a>
              </>
            }
          />

          <Feature
            icon="🗄"
            description="File System Based Routing: New pages are as easy as adding a file"
          />

          <Feature
            icon="📝"
            description={
              <>
                Pages can be authored in modern JavaScript,{" "}
                <components.a href="https://www.typescriptlang.org/">
                  TypeScript
                </components.a>
                , or <components.a href="https://mdxjs.com/">MDX</components.a>
              </>
            }
          />

          <Feature
            icon="🎁"
            description={
              <>
                Build wrappers for you pages using{" "}
                <span className="font-semibold">Layouts</span>
              </>
            }
          />

          <Feature
            icon="🔌"
            description="Use plugins to build upon fwoosh, add your own assets, components, layouts, and more"
          />
        </ul>
      </div>

      <div
        className={tw`bg(gray-200 dark:gray-700) rounded-xl w-20 h-2 mx-auto my-20`}
      />

      <div className="mx-auto my-16 max-w-2xl px-8">
        <h2 className="text-4xl mb-6 dark:text-gray-100">Getting Started</h2>

        <components.p>First you need to install fwoosh.</components.p>

        <InstallSnippet components={components} />

        <components.p>
          Once installed you need to define the place where you are going to
          store your pages. The default is the{" "}
          <components.code>docs/</components.code> folder, but this can be
          customized using the <components.code>dir</components.code> option.
        </components.p>

        <components.h3 className="pt-6">Usage</components.h3>

        <components.p>
          The fwoosh cli comes with a few easy to use commands:
        </components.p>

        <ul>
          <CommandDescription
            name="clean"
            description="Delete all of fwoosh's build and output files"
          />
          <CommandDescription
            name="build"
            description="Build your static website"
          />
          <CommandDescription
            name="dev"
            description="Start the fwoosh development server"
          />
        </ul>

        <components.p>
          To get more information about each command use the{" "}
          <components.code>--help</components.code> flag.
        </components.p>

        <HelpSnippet components={components} />

        <components.h3 className="pt-6">Plugins</components.h3>

        <components.p>
          fwoosh comes with a few plugins that you can use to enhance your
          static website
        </components.p>

        <components.ul>
          <components.li>
            <components.code>tailwind</components.code>: Style your pages with
            tailwind, comes with themed markdown components that support dark
            mode
          </components.li>
          <components.li>
            <components.code>layouts</components.code>: This plugin is
            loaded by default but you can use the{" "}
            <components.code>matchDirectory</components.code> option to match
            your layouts with a directory of the same name
          </components.li>
        </components.ul>

        <components.p>
          To use a plugin create a <components.code>fwoosh.config.json</components.code> and specify the name of the plugins
        </components.p>

        <ConfigurationSnippet components={components} />

        <components.h3 className="pt-6">Deploying</components.h3>

        <components.p>
          To build your website for deploying use{" "}
          <components.code>fwoosh build</components.code>. This creates a set of
          simple HTML and JS files that represent your static website. All you
          need to do is upload it to a server somewhere to be hosted. This can
          be a GitHub pages website, vercel, netlify, an s3 bucket, really
          anywhere you want 🎉
        </components.p>
      </div>
    </main>
  );
}
