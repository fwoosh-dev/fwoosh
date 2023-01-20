import React from "react";
import { IconButton, Toolbar } from "@fwoosh/components";
import { GitHub as GithubIcon } from "react-feather";

export default function Github() {
  return (
    <Toolbar.Button asChild={true}>
      <IconButton as="a" target="_blank" href={process.env.FWOOSH_GITHUB_REPO}>
        <GithubIcon />
      </IconButton>
    </Toolbar.Button>
  );
}
