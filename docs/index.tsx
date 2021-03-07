import * as React from "react";
import { FrontMatter, components as fwoosh, components } from "fwoosh";

import InstallSnippet from "./snippets/install-snippet.mdx";
import HelpSnippet from "./snippets/help-snippet.mdx";

const description = "A lightening quick MDX static website generator";

export const frontMatter: FrontMatter = {
  title: "fwoosh",
  description,
};

export default function Home() {
  return (
    <main>
      <div
        className="flex flex-col items-center justify-center h-96"
        style={{ background: "conic-gradient(at top right, #9CA3AF, white)" }}
      >
        <h1 className="text-8xl text-gray-800 font-extralight mb-6">fwoosh</h1>
        <fwoosh.p className="text-xl text-gray-500 font-semibold">
          {description}
        </fwoosh.p>
      </div>

      <div className="mx-auto my-16 max-w-2xl px-8">
        <h2 className="text-3xl text-center mb-10">
          A 💀 simple static website generator
        </h2>

        <ul className="text-lg space-y-4">
          <li className="flex space-x-2 items-start">
            <div className="text-2xl">⚡️</div>
            <div className="mt-0.5">
              Lightening quick builds powered by{" "}
              <fwoosh.a href="https://esbuild.github.io/">esbuild</fwoosh.a>
            </div>
          </li>
          <li className="flex space-x-2 items-start">
            <div className="text-2xl">🗄</div>
            <div className="mt-0.5">
              File System Based Routing: New pages are as easy as adding a file
            </div>
          </li>
          <li className="flex space-x-2 items-start">
            <div className="text-2xl">📝</div>
            <div className="mt-0.5">
              Pages can be authored in modern JavaScript,{" "}
              <fwoosh.a href="https://www.typescriptlang.org/">
                TypeScript
              </fwoosh.a>
              , or <fwoosh.a href="https://mdxjs.com/">MDX</fwoosh.a>
            </div>
          </li>
          <li className="flex space-x-2 items-start">
            <div className="text-2xl">🎁</div>
            <div className="mt-0.5">
              Build wrappers for you pages using{" "}
              <span className="font-semibold">Layouts</span>
            </div>
          </li>
          <li className="flex space-x-2 items-start">
            <div className="text-2xl">🔌</div>
            <div className="mt-0.5">
              Use plugins to build upon fwoosh, add your own assets, layouts,
              and more
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-gray-200 rounded-xl w-20 h-2 mx-auto my-20" />

      <div className="mx-auto my-16 max-w-2xl px-8">
        <h2 className="text-4xl mb-6">Getting Started</h2>
        <fwoosh.p>First you need to install fwoosh.</fwoosh.p>
        <InstallSnippet components={components} />
        <fwoosh.p>
          Once installed you need to define the place where you are going to
          store your pages. The default is the <fwoosh.code>docs/</fwoosh.code>{" "}
          folder, but this can be customized using the{" "}
          <fwoosh.code>dir</fwoosh.code> option.
        </fwoosh.p>
        <fwoosh.h3 className="mt-10">Usage</fwoosh.h3>
        <fwoosh.p>
          The fwoosh cli comes with a few easy to use commands:
        </fwoosh.p>
        <ul>
          <li>
            <span className="text-xl text-blue-500 font-semibold">clean</span>
            <span>: Delete all of fwoosh's build and output files</span>
          </li>
          <li>
            <span className="text-xl text-blue-500 font-semibold">build</span>
            <span>: Build your static website</span>
          </li>
          <li>
            <span className="text-xl text-blue-500 font-semibold">dev</span>
            <span>: Start the fwoosh development server</span>
          </li>
        </ul>
        <fwoosh.p>
          To get more information about each command use the{" "}
          <fwoosh.code>--help</fwoosh.code> flag.
        </fwoosh.p>
        <HelpSnippet components={components} />

        <fwoosh.h3 className="mt-10">Deploying</fwoosh.h3>

        <fwoosh.p>
          To build your website for deploying use{" "}
          <fwoosh.code>fwoosh build</fwoosh.code>. This creates a set of simple
          HTML and JS files that represent your static website. All you need to
          do is upload it to a server somewhere to be hosted. This can be a
          GitHub pages website, vercel, netlify, an s3 bucket, really anywhere
          you want 🎉
        </fwoosh.p>
      </div>
    </main>
  );
}
