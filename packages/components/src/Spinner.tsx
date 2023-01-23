import * as React from "react";
import { keyframes, styled } from "@fwoosh/styling";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const SpinnerComponent = styled("div", {
  borderRadius: "50%",
  position: "relative",
  borderTop: ".3rem solid $gray6",
  borderRight: ".3rem solid $gray6",
  borderBottom: ".3rem solid $gray6",
  borderLeft: ".3rem solid $primary10",
  transform: "translateZ(0)",
  animation: `${spin} 1.1s infinite linear`,

  "&:after": {
    borderRadius: "50%",
    width: "$20",
    height: "$20",
  },
});

const Message = styled("div", {
  text: "sm",
  color: "$gray10",
});

const Wrapper = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "$2",
});

export interface LazyLoaderProps {
  /** Delay the spinner being shown for N ms. */
  delay?: number;
  children: React.ReactNode;
}

export const DelayedRender = ({ delay = 1000, children }: LazyLoaderProps) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

type SpinnerProps = Pick<LazyLoaderProps, "delay"> &
  React.ComponentProps<typeof Wrapper> & {
    /** The size the spinner should display at. */
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    /** The message to display below the spinner. */
    children?: React.ReactNode;
  };

export const Spinner = ({
  delay = 1000,
  size = 10,
  children,
  ...props
}: SpinnerProps) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <Wrapper {...props}>
      <SpinnerComponent
        css={{
          opacity: show ? 1 : 0,
          width: `$${size}`,
          height: `$${size}`,
        }}
      />
      {children && <Message>{children}</Message>}
    </Wrapper>
  );
};
