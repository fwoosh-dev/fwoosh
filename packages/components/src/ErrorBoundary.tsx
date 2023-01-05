/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from "react";
import { styled } from "./stitches";

const ErrorMessage = styled("h1", {
  text: "2xl",
  color: "$primary11",
  fontWeight: "bold",
  textAlign: "center",
});

const ErrorWrapper = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "$primary3",
});

export class ErrorBoundary extends React.Component<
  {},
  { error: Error | undefined }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch() {}

  render() {
    if (this.state.error) {
      return (
        <ErrorWrapper>
          <ErrorMessage>{this.state.error.message}</ErrorMessage>
        </ErrorWrapper>
      );
    }
    return this.props.children;
  }
}
