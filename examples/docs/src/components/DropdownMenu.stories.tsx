import * as React from "react";
import type { StoryMeta, Story } from "fwoosh";
import { Check, MoreHorizontal, ExternalLink } from "react-feather";
import { IconButton, ChevronRightIcon } from "@fwoosh/components";
import * as DropdownMenu from "@fwoosh/components/src/DropdownMenu.js";

export const meta: StoryMeta = {
  title: "Theming/Components/DropdownMenu",
  component: [DropdownMenu.Root, DropdownMenu.Content, DropdownMenu.Trigger],
};

type CheckedState = boolean | "indeterminate";

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 */
export const Basis: Story = () => {
  const [bookmarksChecked, setBookmarksChecked] =
    React.useState<CheckedState>(true);
  const [urlsChecked, setUrlsChecked] = React.useState<CheckedState>(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <ExternalLink />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Item>
            New Tab <DropdownMenu.RightSlot>⌘+T</DropdownMenu.RightSlot>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            New Window <DropdownMenu.RightSlot>⌘+N</DropdownMenu.RightSlot>
          </DropdownMenu.Item>
          <DropdownMenu.Item disabled>
            New Private Window{" "}
            <DropdownMenu.RightSlot>⇧+⌘+N</DropdownMenu.RightSlot>
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              More Tools
              <DropdownMenu.RightSlot>
                <ChevronRightIcon />
              </DropdownMenu.RightSlot>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenu.Item>
                  Save Page As…{" "}
                  <DropdownMenu.RightSlot>⌘+S</DropdownMenu.RightSlot>
                </DropdownMenu.Item>
                <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
                <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator>
              <Check />
            </DropdownMenu.ItemIndicator>
            Show Bookmarks <DropdownMenu.RightSlot>⌘+B</DropdownMenu.RightSlot>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenu.ItemIndicator>
              <Check />
            </DropdownMenu.ItemIndicator>
            Show Full URLs
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.Label>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem value="pedro">
              <DropdownMenu.ItemIndicator>
                <MoreHorizontal />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="colm">
              <DropdownMenu.ItemIndicator>
                <MoreHorizontal />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
