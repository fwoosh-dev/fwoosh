/* eslint-disable @typescript-eslint/no-empty-function */

import { styled } from "@fwoosh/components";
import * as React from "react";

const ErrorMessage = styled("h1", {
  text: "2xl",
  color: "$gray9",
  fontWeight: "bold",
  textAlign: "center",
});

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return <ErrorMessage>Something went wrong!</ErrorMessage>;
    }
    return this.props.children;
  }
}
