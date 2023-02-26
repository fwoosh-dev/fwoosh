import * as React from "react";
import stream from "stream";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { HeadProvider } from "react-head";
import { StaticRouter } from "react-router-dom/server";

import { App } from "./App";
import { getCssText } from "@fwoosh/styling";
import { WorkbenchCanvasShapesContext } from "./hooks/context";

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const shapes = JSON.parse(process.env.FWOOSH_SHAPES || "[]");

function ServerApp({ url }: { url: string }) {
  return (
    <WorkbenchCanvasShapesContext.Provider value={shapes}>
      <StaticRouter location={url} basename={process.env.FWOOSH_BASE_NAME}>
        <App />
      </StaticRouter>
    </WorkbenchCanvasShapesContext.Provider>
  );
}

class ReactStream extends stream.Writable {
  private chunks: string[] = [];

  _write(chunk: any, enc: any, next: any) {
    this.chunks.push(chunk.toString());
    next();
  }

  get() {
    return this.chunks.join("");
  }
}

export async function render(url: string) {
  const headTags: any[] = [];
  const result = new Promise((resolve) => {
    const stream = renderToPipeableStream(
      <HeadProvider headTags={headTags}>
        <ServerApp url={url} />
      </HeadProvider>,
      {
        // bootstrapScripts: ["/main.js"],
        onAllReady() {
          const rstream = new ReactStream();
          stream.pipe(rstream);
          resolve(rstream.get());
        },
        onError(error) {
          console.error("onError", error);
          process.exit();
        },
      }
    );
  });

  return { result: await result, headTags };
}

export function renderStyle() {
  return renderToString(
    <style
      type="text/css"
      id="stitches"
      dangerouslySetInnerHTML={{ __html: getCssText() }}
    />
  );
}
