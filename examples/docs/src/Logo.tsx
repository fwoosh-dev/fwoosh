import * as React from "react";

import logo from "../public/logo.svg";
import logoDark from "../public/logo-dark.svg";
import { styled } from "@fwoosh/styling";

const LightLogo = styled("img", {
  aspectRatio: "134/512",
  '[data-color-mode="dark"] &': {
    display: "none",
  },
});

const DarkLogo = styled("img", {
  aspectRatio: "134/512",
  display: "none",

  '[data-color-mode="dark"] &': {
    display: "block",
  },
});

export const Logo = () => {
  return (
    <div>
      <LightLogo src={logo} />
      <DarkLogo src={logoDark} />
    </div>
  );
};

export const LogoWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mt: 16,
});

export const Tagline = styled("div", {
  textAlign: "center",
  my: 12,
  text: "2xl",
  color: "$gray11",
});
