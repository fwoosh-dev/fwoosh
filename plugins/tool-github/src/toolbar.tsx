import React from "react";
import { IconButton, Toolbar } from "@fwoosh/components";
import { GitHub as GithubIcon } from "react-feather";
import { styled } from "@fwoosh/styling";

const Anchor = styled("a", {
  cursor: "pointer",
});

export default function Github() {
  return (
    <Toolbar.Button asChild={true}>
      <IconButton
        as={Anchor}
        target="_blank"
        href={process.env.FWOOSH_GITHUB_URL}
      >
        <GithubIcon />
      </IconButton>
    </Toolbar.Button>
  );
}
