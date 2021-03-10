import { components } from "fwoosh/components";
import NavBarLayout from "../layouts/nav-bar";

export default function BlogIndex() {
  return (
    <NavBarLayout>
      <components.h1>Blog Index</components.h1>

      <components.a href="first">First Post</components.a>
    </NavBarLayout>
  );
}
