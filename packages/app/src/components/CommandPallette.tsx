import * as React from "react";
import { Command } from "@fwoosh/components";
import { headerCase } from "change-case";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoryTree } from "@fwoosh/hooks";
import {
  MDXPageTreeItem,
  StoryData,
  StoryTree,
  StoryTreeItem,
} from "@fwoosh/types";
import useMousetrap from "react-hook-mousetrap";
import { Bookmark, Code } from "react-feather";

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
      console.log(toProcess);
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
        const parts = item.story.grouping.split("/");

        if (item.type === "mdx") {
          if (parts[0] === tree.name) {
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

        return (
          <Command.Item
            key={item.story.slug}
            value={`${item.story.grouping}#${item.story.title}`}
            grouping={parts.join(" / ")}
            title={item.story.title}
            onSelect={() => onNavigate(item.story)}
            icon={<Code />}
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
  }, []);

  useMousetrap("meta+k", () => openSet(true));

  return (
    <Command.Dialog open={open} onOpenChange={openSet} loop>
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
              <Command.Item
                key={item.story.slug}
                value={
                  item.type === "mdx"
                    ? item.story.grouping
                    : `${item.story.grouping}#${item.story.slug}`
                }
                title={item.story.title}
                onSelect={() => onNavigate(item.story)}
                icon={item.type === "mdx" ? <Bookmark /> : <Code />}
              />
            );
          })}
        </Command.List>
      </Command.Content>
    </Command.Dialog>
  );
}
