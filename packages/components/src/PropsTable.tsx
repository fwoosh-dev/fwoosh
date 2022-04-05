import React from "react";
import { useDocs } from "@fwoosh/app/docs";
import { components } from "./components.js";
import * as Tabs from "./Tabs.js";
import { styled } from "./stitches.js";

const NoPropMessage = styled("div", {
  text: "2xl",
  color: "$gray10",
});

const Wrapper = styled("div", {
  px: 4,
});

interface TableProps {
  doc: ReturnType<typeof useDocs>[number];
}

const Table = ({ doc }: TableProps) => {
  const rows = Object.entries(doc.props);

  return (
    <>
      {doc.description && <components.p>{doc.description}</components.p>}
      {rows.length > 0 ? (
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
            {rows.map(([prop, propDoc]) => (
              <components.tr key={`${doc.displayName}-${prop}`}>
                <components.td>
                  <div style={{ minWidth: 100, maxWidth: 200 }}>
                    <components.code>{prop}</components.code>
                  </div>
                </components.td>
                <components.td>
                  <div
                    style={{ minWidth: 100, maxWidth: 300, overflow: "auto" }}
                  >
                    {propDoc.type.name && (
                      <components.code>{propDoc.type.name}</components.code>
                    )}
                  </div>
                </components.td>
                <components.td style={{ minWidth: 100, maxWidth: 200 }}>
                  <div style={{ minWidth: 100, maxWidth: 200 }}>
                    {propDoc.defaultValue?.value && (
                      <components.code>
                        {propDoc.defaultValue?.value}
                      </components.code>
                    )}
                  </div>
                </components.td>
                <components.td style={{ width: "100%" }}>
                  <div style={{ minWidth: 100 }}>{propDoc.description}</div>
                </components.td>
              </components.tr>
            ))}
          </tbody>
        </components.table>
      ) : (
        <NoPropMessage>
          This component has no documented properties. Some properties might be
          ignored though, such as HTML attributes.
        </NoPropMessage>
      )}
    </>
  );
};

interface PropsTableProps {
  docs: ReturnType<typeof useDocs>;
}

const Panel = styled(Tabs.Content, {
  p: 4,
});

export const PropsTable = ({ docs }: PropsTableProps) => {
  if (!docs) {
    return null;
  }

  if (!docs.length) {
    return <NoPropMessage>No property documentation found.</NoPropMessage>;
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
        <Panel key={`content-${doc.displayName}`} value={doc.displayName}>
          <Table doc={doc} />
        </Panel>
      ))}
    </Tabs.Root>
  );
};
