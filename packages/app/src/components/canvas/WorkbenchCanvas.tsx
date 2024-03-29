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
import { WorkbenchSidebarTree } from "../sidebar/WorkbenchSidebarTree";
import { machine } from "./machine";
import { Canvas } from "./Canvas";
import { CanvasContext, INITIAL_WORKBENCH_PAGE } from "./constants";
import { useStoryId } from "@fwoosh/hooks";

export function WorkbenchCanvas() {
  const modifiedMachine = React.useMemo(() => {
    machine.data = INITIAL_WORKBENCH_PAGE;
    return machine;
  }, []);
  const appState = useStateDesigner(modifiedMachine);
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
              <WorkbenchSidebarTree />
            </React.Suspense>
          </SidebarItems>
        </Sidebar>
        <Content ref={containerRef}>
          <Canvas appState={appState} mode="workbench" />
        </Content>
      </SidebarLayout>
    </CanvasContext.Provider>
  );
}
