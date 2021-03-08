declare module "*.mdx" {
  import React from "react";
  let MDXComponent: React.ComponentType<{ components: Record<string, any> }>;
  export default MDXComponent;
}
