import * as React from "react";
import { Command } from "@fwoosh/components";
import { headerCase } from "change-case";
import { useLocation, useNavigate } from "react-router-dom";
import { tree } from "@fwoosh/app/stories";
import commandScore from "command-score";
import { Interweave } from "interweave";
import { StoryData, StoryTree, StoryTreeItem } from "@fwoosh/types";
import useMousetrap from "react-hook-mousetrap";
import { Bookmark, Code } from "react-feather";
import { SearchData } from "@fwoosh/utils";

const CommandPalletteContext = React.createContext<{
  search: string;
}>({
  search: "",
});

function highlightSearchResult(text: string, search: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const matches = doc.evaluate(
    // TODO get the actual text element
    `//p[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${search.toLowerCase()}')]`,
    doc,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );

  let match = matches.iterateNext();

  let textNodeIndex = Array.from(match?.childNodes || []).findIndex((n) =>
    n.textContent?.toLowerCase()?.includes(search?.toLowerCase())
  );

  while (match && match.childNodes[textNodeIndex]) {
    const searchIndex = match.childNodes[textNodeIndex].textContent
      ?.toLowerCase()
      ?.indexOf(search?.toLowerCase());

    if (searchIndex === -1 || typeof searchIndex === "undefined") {
      break;
    }

    const before = match.childNodes[textNodeIndex].textContent!.slice(
      0,
      searchIndex
    );
    const after = match.childNodes[textNodeIndex].textContent!.slice(
      searchIndex + search.length
    );

    const beforeNode = document.createTextNode(before);
    const afterNode = document.createTextNode(after);
    const highlightNode = document.createElement("mark");
    highlightNode.textContent = match.childNodes[
      textNodeIndex
    ].textContent!.slice(searchIndex, searchIndex + search.length);

    match.replaceChild(afterNode, match.childNodes[textNodeIndex]);
    match.insertBefore(highlightNode, afterNode);
    match.insertBefore(beforeNode, highlightNode);

    textNodeIndex = Array.from(match.childNodes).findIndex(
      (n) =>
        n === afterNode &&
        n.textContent?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }

  if (match) {
    return (match as HTMLElement).innerHTML;
  }
}

function StoryCommandTreeChild({
  groupName,
  item,
  onNavigate,
}: {
  groupName: string;
  item: StoryTreeItem;
  onNavigate: (story: StoryData) => void;
}) {
  const { search } = React.useContext(CommandPalletteContext);
  const parts = item.story.grouping.split("/");
  const highlightedSearchResult = React.useMemo(() => {
    if (!search || item.story.type !== "basic" || !item.story.comment) {
      return;
    }

    return highlightSearchResult(item.story.comment, search);
  }, [search, item]);

  if (item.story.type === "mdx") {
    if (parts[0] === groupName) {
      parts.shift();
    }
    const pageName = parts.pop()!;
    const newGrouping = parts.join(" / ");

    return (
      <Command.Item
        key={item.story.slug}
        value={`${newGrouping}-${item.story.title.toLowerCase()}`}
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
      value={`${item.story.grouping}#${
        item.story.title
      }|||${item.story.comment?.toLowerCase()}`}
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

function MDXContentMatch({
  data,
  onNavigate,
}: {
  data: SearchData;
  onNavigate: () => void;
}) {
  const { search } = React.useContext(CommandPalletteContext);
  const highlightedSearchResult = React.useMemo(() => {
    return highlightSearchResult(`<p>${data.content}</p>`, search);
  }, [search, data.content]);

  if (!data.content || !highlightedSearchResult) {
    return null;
  }

  const grouping = data.path.join(" / ");

  return (
    <Command.Item
      key={data.url}
      value={`${grouping}-${data.content.toLowerCase()}`}
      grouping={grouping}
      title={<Interweave content={highlightedSearchResult} />}
      onSelect={onNavigate}
      icon={<Bookmark />}
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
    const allChildren: StoryTreeItem[] = [];
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
  const [open, openSet] = React.useState(false);
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

        if (content && content.toLowerCase().includes(search.toLowerCase())) {
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

            {value && (
              <Command.Group
                heading={<Command.Heading>Results</Command.Heading>}
              >
                {Object.values(window.FWOOSH_SEARCH_INDEX).map((data) => {
                  return data.map((item) => (
                    <MDXContentMatch
                      key={item.url}
                      data={item}
                      onNavigate={() => {
                        const url = item.url.replace(
                          process.env.FWOOSH_BASE_NAME || "",
                          ""
                        );
                        navigate(url);
                        openSet(false);
                        valueSet("");
                      }}
                    />
                  ));
                })}
              </Command.Group>
            )}
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
