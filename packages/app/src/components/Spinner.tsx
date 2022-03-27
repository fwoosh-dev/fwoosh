import { FC, useEffect, useState } from "react";

export interface LazyLoaderProps {
  delay?: number;
}

export const Spinner: FC<LazyLoaderProps> = ({ delay = 250 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <div>Loading...</div>;
};
