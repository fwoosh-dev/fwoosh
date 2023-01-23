import { keyframes, styled, css } from "@fwoosh/styling";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: 220,
  maxHeight: "80vh",
  overflow: "auto",
  backgroundColor: "$gray0",
  borderRadius: "$round",
  padding: "$2 0",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  zIndex: 1000,
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

export const Portal = DropdownMenu.Portal;
export const Root = DropdownMenu.Root;
export const Sub = DropdownMenu.Sub;
export const Trigger = DropdownMenu.Trigger;
export const Content = styled(DropdownMenu.Content, contentStyles);
export const RadioGroup = DropdownMenu.RadioGroup;
export const SubContent = styled(DropdownMenu.SubContent, contentStyles);
export const Arrow = styled(DropdownMenu.Arrow, { fill: "white" });

const itemStyles = {
  all: "unset",
  text: "xs",
  color: "$gray11",
  borderRadius: "$sm",
  display: "flex",
  alignItems: "center",
  height: "$9",
  padding: "0 $1",
  position: "relative",
  paddingLeft: "$9",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$gray7",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "$primary3",
    color: "$primary11",
  },
} as const;

export const Item = styled(DropdownMenu.Item, itemStyles);
export const CheckboxItem = styled(DropdownMenu.CheckboxItem, itemStyles);
export const RadioItem = styled(DropdownMenu.RadioItem, itemStyles);
export const SubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: "$primary3",
    color: "$primary11",
  },
  ...itemStyles,
});

export const Label = styled(DropdownMenu.Label, {
  paddingLeft: "$9",
  height: "$8",
  text: "xs",
  color: "$gray11",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
});

export const Separator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: "$gray5",
  my: 2,
});

export const ItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: "absolute",
  padding: 10,
  left: 0,
  width: "$9",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const RightSlot = styled("div", {
  marginLeft: "auto",
  px: 2,
  color: "$primary10",
  "[data-highlighted] > &": { color: "$primary11" },
  "[data-disabled] &": { color: "$primary6" },
});
