import * as React from "react";
import {
  version as reactDomVersion,
  render as ReactDomRender,
} from "react-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { StoryData, StoryParameters } from "@fwoosh/types";
import { stories } from "@fwoosh/app/stories";
import { Spinner, ErrorBoundary } from "@fwoosh/components";
import useLayoutEffect from "@react-hook/passive-layout-effect";

import type { Decorator, Story as ReactStory, StoryMeta } from "./types";

const isReact18 = reactDomVersion.startsWith("18");

function reverse<T>(arr: T[]) {
  return arr.slice().reverse();
}

function useDecorators(story: StoryData | undefined) {
  const [decorators, setDecorators] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.useState<ReactStory<any>["decorators"]>();

  useLayoutEffect(() => {
    async function getDecorators() {
      if (!story) {
        return;
      }

      const [meta, storyComponentImport] = await Promise.all([
        story.meta,
        story.component._payload?._result,
      ]);
      const storyComponent =
        storyComponentImport?.default || storyComponentImport;

      setDecorators([
        ...reverse<Decorator>(storyComponent.decorators || []),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...reverse<Decorator>((meta as StoryMeta<any>).decorators ?? []),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...reverse<Decorator>((window as any).__FWOOSH_DECORATORS__ ?? []),
      ]);
    }

    getDecorators();
  }, [story]);

  return decorators;
}

interface AppProps {
  slug: string;
  params: StoryParameters;
}

function App({ slug, params }: AppProps) {
  const story = stories[slug];
  const decorators = useDecorators(story);

  let content = story?.component;

  if (decorators?.length) {
    for (const decorator of decorators) {
      content = decorator(content, slug, params);
    }
  }

  const Component = content;

  return <Component />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roots: Record<string, any> = {};

export function render(
  el: Element,
  slug: string,
  params: StoryParameters,
  onStart: () => void,
  onComplete: () => void
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!el) {
    return;
  }

  function Fallback() {
    React.useEffect(() => {
      onStart();

      return () => {
        onComplete();
      };
    }, []);
    return <Spinner delay={300} />;
  }

  function OnStart() {
    React.useEffect(() => {
      onComplete();
    }, []);
    return <></>;
  }

  const app = (
    <TooltipPrimitive.Provider>
      <React.Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <App slug={slug} params={params} />
          <OnStart />
        </ErrorBoundary>
      </React.Suspense>
    </TooltipPrimitive.Provider>
  );

  if (isReact18) {
    import("react-dom/client").then(({ createRoot }) => {
      const root = createRoot(el);

      if (roots[slug]) {
        roots[slug].unmount();
        roots[slug] = root;
      }

      root.render(app);
    });
  } else {
    ReactDomRender(app, el);
  }
}
