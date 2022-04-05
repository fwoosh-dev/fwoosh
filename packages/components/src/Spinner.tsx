import { useEffect, useState } from "react";
import { keyframes, styled } from "./stitches";

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
  width: "$10",
  height: "$10",
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

export interface LazyLoaderProps extends React.ComponentProps<typeof Wrapper> {
  delay?: number;
}

export const Spinner = ({ delay = 1000, ...props }: LazyLoaderProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return (
    <Wrapper {...props}>
      <SpinnerComponent />
      <Message>Loading...</Message>
    </Wrapper>
  );
};
