/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from "react";
import { styled } from "@fwoosh/styling";
import { ErrorResponse } from "@remix-run/router";

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

interface ErrorBoundaryProps {
  fullScreen?: boolean;
  children?: React.ReactNode;
  error?: Error | ErrorResponse;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error | ErrorResponse | undefined }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: props.error };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch() {}

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    let content: React.ReactNode = null;

    if (this.state.error instanceof Error) {
      content = <ErrorMessage>{this.state.error.message}</ErrorMessage>;
    } else {
      const { status, statusText } = this.state.error;

      content = (
        <ErrorMessage>
          {status} {statusText}
        </ErrorMessage>
      );
    }

    return (
      <ErrorWrapper
        css={this.props.fullScreen ? { height: "100vh", width: "100vw" } : {}}
      >
        {content}
      </ErrorWrapper>
    );
  }
}
