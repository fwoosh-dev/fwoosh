import * as React from "react";
import { useDocgen } from "@fwoosh/app/docs";
import { stories } from "@fwoosh/app/stories";
import { PropsTable, components, DelayedRender } from "@fwoosh/components";
import { styled, keyframes } from "@fwoosh/styling";
import { PanelPluginProps } from "fwoosh";

const Wrapper = styled("div", {
  px: 4,
  width: "100%",
});

function PropsPanelContent({ storyId }: PanelPluginProps) {
  const [, story] =
    Object.entries(stories).find(([slug]) => slug === storyId) || [];
  const docs = useDocgen(
    storyId,
    (story?.component as any)._result || story?.meta
  );

  console.log({ storyId, docs });

  return (
    <Wrapper>
      <PropsTable key={storyId} docs={docs} />
    </Wrapper>
  );
}

const pulse = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(100%)" },
});

const PlaceholderBox = styled("div", {
  height: "$6",
  width: "100%",
  borderRadius: "$sm",
  background: "$gray4",
  position: "relative",
  overflow: "hidden",

  "&:after": {
    animation: `${pulse} 1.2s ease-in-out infinite`,
    content: "",
    position: "absolute",
    inset: 0,
    linearGradient: "90deg, $gray4, $gray5, $gray4",
  },
});

const placeholderBoxRow = (
  <>
    <components.tr>
      <components.td>
        <PlaceholderBox style={{ width: 150 }} />
      </components.td>
      <components.td>
        <PlaceholderBox style={{ width: 450 }} />
      </components.td>
    </components.tr>
  </>
);

function PropsPanelSkeleton() {
  return (
    <DelayedRender delay={2500}>
      <Wrapper>
        <components.p>
          <PlaceholderBox style={{ width: "80%" }} />
        </components.p>

        <components.table>
          <thead>
            <components.tr>
              <components.th style={{ width: 200 }}>
                <PlaceholderBox style={{ width: 100 }} />
              </components.th>
              <components.th>
                <PlaceholderBox style={{ width: 200 }} />
              </components.th>
            </components.tr>
          </thead>
          <tbody>
            {placeholderBoxRow}
            {placeholderBoxRow}
            {placeholderBoxRow}
          </tbody>
        </components.table>
      </Wrapper>
    </DelayedRender>
  );
}

export default function PropsPanel(props: PanelPluginProps) {
  return (
    <React.Suspense fallback={<PropsPanelSkeleton />}>
      <PropsPanelContent {...props} />
    </React.Suspense>
  );
}
