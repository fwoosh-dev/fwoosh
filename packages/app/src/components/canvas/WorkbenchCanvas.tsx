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
import { INITIAL_WORKBENCH_PAGE } from "./constants";
import { useDidChange, useStoryId } from "@fwoosh/hooks";

machine.data = INITIAL_WORKBENCH_PAGE;

export function WorkbenchCanvas() {
  const appState = useStateDesigner(machine);
  const storyId = useStoryId();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (!containerRef.current) {
        return;
      }

      // machine.send("CENTER_SHAPE", {
      //   id: storyId,
      //   client: {
      //     height: containerRef.current.clientHeight,
      //     width: containerRef.current.clientWidth,
      //   },
      // });
    });
  }, [storyId]);

  return (
    <>
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
          <Canvas appState={appState} />
        </Content>
      </SidebarLayout>
    </>
  );
}
