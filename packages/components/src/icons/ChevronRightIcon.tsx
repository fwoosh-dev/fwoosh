import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const ChevronRightIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <path d="m9 18 6-6-6-6" stroke="currentColor" />
  </svg>
);

const ForwardRef = forwardRef(ChevronRightIcon);
const Memo = memo(ForwardRef);
export default Memo;
