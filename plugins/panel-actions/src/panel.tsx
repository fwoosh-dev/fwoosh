import React from "react";
import { ObjectInspector } from "@devtools-ds/object-inspector";
import { firefox } from "@devtools-ds/themes";
import { useId } from "@radix-ui/react-id";
import { ColorModeContext, styled } from "@fwoosh/styling";
import { useParams } from "react-router-dom";

import { setAddAction } from ".";

type Action = [string, number, any[]];

const createShareState = () => {
  let actions: Action[] = [];
  let slug: string;
  const listeners = new Map<string, (newActions: Action[]) => void>();

  setAddAction((name, id, args) => {
    actions.push([name, id, args]);
    Array.from(listeners.values()).forEach((fn) => {
      fn([...actions]);
    });
  });

  const clearActions = () => {
    actions = [];
    Array.from(listeners.values()).forEach((fn) => {
      fn([]);
    });
  };

  return () => {
    const [currentActions, currentActionsSet] = React.useState(actions);
    const params = useParams<{ storyId: string }>();
    const id = useId();

    React.useEffect(() => {
      listeners.set(id, currentActionsSet);
      return () => {
        listeners.delete(id);
      };
    }, [id]);

    React.useEffect(() => {
      if (params.storyId !== slug) {
        clearActions();
      }

      if (params.storyId) {
        slug = params.storyId;
      }
    }, [params.storyId]);

    return currentActions;
  };
};
const useSharedState = createShareState();

const Wrapper = styled("div", {
  p: 4,
});

const ActionRow = styled("div", {
  display: "flex",
  gap: 1,
});

export const Name = () => {
  const actions = useSharedState();
  return <div>Actions ({actions.length})</div>;
};

export default function ActionPanel() {
  const actions = useSharedState();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Wrapper>
      {actions.map(([name, id, args]) => (
        <ActionRow key={id}>
          <span
            style={{
              color:
                colorMode === "dark"
                  ? firefox.dark.pink01
                  : firefox.light.pink01,
            }}
          >
            {name}:
          </span>
          <ObjectInspector
            theme="firefox"
            colorScheme={colorMode}
            data={args.length === 1 ? args[0] : args}
          />
        </ActionRow>
      ))}
    </Wrapper>
  );
}
