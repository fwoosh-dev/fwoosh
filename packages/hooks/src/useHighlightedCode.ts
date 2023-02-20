import { useQuery } from "react-query";

export const useHighlightedCode = ({
  slug,
  code,
}: {
  code: () => Promise<string>;
  slug: string;
}) => {
  const { data } = useQuery(
    `highlight-code-${slug}`,
    async () => {
      const content = await code();

      // In prod mode we highlight code on the server so we don't need to
      // load the highlighter on the client
      if (process.env.NODE_ENV === "production") {
        return content;
      }

      // TODO switch to web socket for speed
      const res = await fetch("/highlight-code", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "text/plain",
        },
        body: content,
      });
      const { html } = await res.json();

      return html;
    },
    { suspense: true }
  );

  return data;
};
