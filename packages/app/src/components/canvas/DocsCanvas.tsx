import {
  Content,
  Sidebar,
  SidebarItems,
  SidebarLayout,
  Spinner,
} from "@fwoosh/components";
import * as React from "react";
import { useStateDesigner } from "@state-designer/react";

import { DocsToolbar } from "../DocsToolbar";
import { machine } from "./machine";
import { Canvas } from "./Canvas";
import { CanvasContext } from "./constants";
import { useStoryId } from "@fwoosh/hooks";
import { DocsSidebarTree } from "../sidebar/DocsSidebarTree";

export function DocsCanvas() {
  const appState = useStateDesigner(machine);
  const storyId = useStoryId();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (storyId) {
      machine.send("CENTER_SHAPE", {
        id: storyId,
        client: {
          height: containerRef.current?.clientHeight,
          width: containerRef.current?.clientWidth,
        },
      });
    }
  }, [storyId]);

  return (
    <CanvasContext.Provider value={{ containerRef }}>
      <DocsToolbar />
      <SidebarLayout>
        <Sidebar>
          <SidebarItems>
            <React.Suspense fallback={<Spinner delay={2000} size={8} />}>
              <DocsSidebarTree />
            </React.Suspense>
          </SidebarItems>
        </Sidebar>
        <Content ref={containerRef}>
          <Canvas appState={appState} mode="docs" />
        </Content>
      </SidebarLayout>
    </CanvasContext.Provider>
  );
}
