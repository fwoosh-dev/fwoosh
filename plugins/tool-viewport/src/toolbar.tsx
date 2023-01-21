import React from "react";
import { IconButton, Toolbar, Tooltip, DropdownMenu } from "@fwoosh/components";
import { Check, Crop } from "react-feather";

import { sizes, useCurrentSize } from "./useCurrentSize";

export default function Viewport() {
  const [currentSizes, setSize] = useCurrentSize();

  return (
    <DropdownMenu.Root>
      <Tooltip message="Modify viewport">
        <Toolbar.Button asChild={true}>
          <DropdownMenu.Trigger asChild={true}>
            <IconButton>
              <Crop />
            </IconButton>
          </DropdownMenu.Trigger>
        </Toolbar.Button>
      </Tooltip>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5}>
          {sizes.map(({ name }) => (
            <DropdownMenu.CheckboxItem
              key={name}
              checked={currentSizes.some((s) => s.name === name)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSize([
                    ...currentSizes,
                    sizes.find((s) => s.name === name)!,
                  ]);
                } else {
                  setSize(currentSizes.filter((s) => s.name !== name));
                }
              }}
            >
              <DropdownMenu.ItemIndicator>
                <Check />
              </DropdownMenu.ItemIndicator>
              {name}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
