import React from "react";
import { useDocs } from "@fwoosh/app/docs";
import { components } from "./components.js";
import * as Tabs from "./Tabs.js";
import { styled } from "./stitches.js";

const Wrapper = styled("div", {
  px: 4,
});

interface TableProps {
  doc: ReturnType<typeof useDocs>[number];
}

const Table = ({ doc }: TableProps) => {
  return (
    <components.table>
      <thead>
        <components.tr>
          <components.th>Prop</components.th>
          <components.th>Type</components.th>
          <components.th>Default</components.th>
          <components.th>Description</components.th>
        </components.tr>
      </thead>
      <tbody>
        {Object.entries(doc.props).map(([prop, propDoc]) => (
          <components.tr key={`${doc.displayName}-${prop}`}>
            <components.td>
              <components.code>{prop}</components.code>
            </components.td>
            <components.td>
              {propDoc.type.name && (
                <components.code>{propDoc.type.name}</components.code>
              )}
            </components.td>
            <components.td>
              {propDoc.defaultValue?.value && (
                <components.code>{propDoc.defaultValue?.value}</components.code>
              )}
            </components.td>
            <components.td>{propDoc.description}</components.td>
          </components.tr>
        ))}
      </tbody>
    </components.table>
  );
};

interface PropsTableProps {
  docs: ReturnType<typeof useDocs>;
}

export const PropsTable = ({ docs }: PropsTableProps) => {
  if (!docs?.length) {
    return null;
  }

  if (docs.length === 1) {
    return (
      <Wrapper>
        <Table doc={docs[0]} />
      </Wrapper>
    );
  }

  return (
    <Tabs.Root defaultValue={docs?.[0].displayName}>
      <Tabs.List>
        {docs?.map((doc) => (
          <Tabs.Trigger
            key={`trigger-${doc.displayName}`}
            value={doc.displayName}
          >
            {doc.displayName}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {docs?.map((doc) => (
        <Tabs.Content
          key={`content-${doc.displayName}`}
          value={doc.displayName}
        >
          <Table doc={doc} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
