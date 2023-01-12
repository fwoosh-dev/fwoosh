import * as React from "react";
import { Command } from "@fwoosh/components";
import { headerCase } from "change-case";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoryTree } from "@fwoosh/hooks";
import commandScore from "command-score";
import { Interweave } from "interweave";
import {
  MDXPageTreeItem,
  StoryData,
  StoryTree,
  StoryTreeItem,
} from "@fwoosh/types";
import useMousetrap from "react-hook-mousetrap";
import { Bookmark, Code } from "react-feather";

const CommandPalletteContext = React.createContext<{
  search: string;
}>({
  search: "",
});

function StoryCommandTreeChild({
  groupName,
  item,
  onNavigate,
}: {
  groupName: string;
  item: MDXPageTreeItem | StoryTreeItem;
  onNavigate: (story: StoryData) => void;
}) {
  const { search } = React.useContext(CommandPalletteContext);
  const parts = item.story.grouping.split("/");
  const highlightedSearchResult = React.useMemo(() => {
    if (!search || item.type !== "story" || !item.story.comment) {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(item.story.comment, "text/html");
    const matches = doc.evaluate(
      // TODO get the actual text element
      `//p[contains(., '${search}')]`,
      doc,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    );

    let match = matches.iterateNext();

    const textNodeIndex = Array.from(match?.childNodes || []).findIndex((n) =>
      n.textContent?.includes(search)
    );

    if (match && textNodeIndex !== -1) {
      const [before, after] =
        match.childNodes[textNodeIndex].textContent?.split(search) || [];

      const beforeNode = document.createTextNode(before);
      const afterNode = document.createTextNode(after);
      const highlightNode = document.createElement("mark");
      highlightNode.textContent = search;

      match.replaceChild(afterNode, match.childNodes[textNodeIndex]);
      match.insertBefore(highlightNode, afterNode);
      match.insertBefore(beforeNode, highlightNode);

      return (match as HTMLElement).innerHTML;
    }
  }, [search, item]);

  if (item.type === "mdx") {
    if (parts[0] === groupName) {
      parts.shift();
    }
    const pageName = parts.pop()!;
    const newGrouping = parts.join(" / ");

    return (
      <Command.Item
        key={item.story.slug}
        value={item.story.title}
        grouping={newGrouping}
        title={pageName}
        onSelect={() => onNavigate(item.story)}
        icon={<Bookmark />}
      />
    );
  }

  parts.shift();

  if (highlightedSearchResult) {
    parts.push(item.story.title);
  }

  return (
    <Command.Item
      key={item.story.slug}
      value={`${item.story.grouping}#${item.story.title}|||${item.story.comment}`}
      grouping={parts.join(" / ")}
      title={
        highlightedSearchResult ? (
          <Interweave content={highlightedSearchResult} />
        ) : (
          item.story.title
        )
      }
      onSelect={() => onNavigate(item.story)}
      icon={<Code />}
    />
  );
}

function StoryCommandTree({
  tree,
  onNavigate,
}: {
  tree: StoryTree;
  onNavigate: (story: StoryData) => void;
}) {
  const items = React.useMemo(() => {
    const allChildren: (StoryTreeItem | MDXPageTreeItem)[] = [];
    const toProcess = [...tree.children];

    while (toProcess.length > 0) {
      const currentItem = toProcess.shift();

      if (currentItem) {
        if (currentItem.type === "tree") {
          toProcess.push(...currentItem.children);
        } else {
          allChildren.push(currentItem);
        }
      }
    }

    return allChildren;
  }, []);

  return (
    <Command.Group heading={<Command.Heading>{tree.name}</Command.Heading>}>
      {items.map((item) => {
        return (
          <StoryCommandTreeChild
            key={item.story.slug}
            groupName={tree.name}
            item={item}
            onNavigate={onNavigate}
          />
        );
      })}
    </Command.Group>
  );
}

export function CommandPallette() {
  const tree = useStoryTree();
  const [open, openSet] = React.useState(true);
  const [value, valueSet] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isStorybook = location.pathname.startsWith("/storybook");

  const onNavigate = React.useCallback((story: StoryData) => {
    let url = "";

    if (isStorybook) {
      if (story.type === "basic") {
        url = `/storybook/${story.slug}`;
      } else {
        url = `/storybook/docs/${story.slug}`;
      }
    } else {
      url = `/docs/${story.grouping.replace(/\//g, "-")}`;

      if (story.type === "basic") {
        url += `#${headerCase(story.title.replace(/\s/g, "-")).toLowerCase()}`;
      }
    }

    navigate(url);
    openSet(false);
    valueSet("");
  }, []);

  useMousetrap("meta+k", () => openSet(true));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={openSet}
      loop={true}
      filter={(value, search) => {
        const [slug, content] = value.split("|||");

        if (content && content.includes(search)) {
          return 1;
        }

        return commandScore(slug, search);
      }}
    >
      <CommandPalletteContext.Provider value={{ search: value }}>
        <Command.Content>
          <Command.Input
            placeholder="Search documentation and stories..."
            value={value}
            onValueChange={valueSet}
          />

          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            {!value && <Command.Heading>Jump to a page</Command.Heading>}
            {tree.map((item) => {
              if (item.type === "tree") {
                return (
                  <StoryCommandTree
                    key={item.id}
                    tree={item}
                    onNavigate={onNavigate}
                  />
                );
              }

              return (
                <StoryCommandTreeChild
                  key={item.story.slug}
                  item={item}
                  groupName=""
                  onNavigate={onNavigate}
                />
              );
            })}
          </Command.List>
        </Command.Content>
      </CommandPalletteContext.Provider>
    </Command.Dialog>
  );
}
