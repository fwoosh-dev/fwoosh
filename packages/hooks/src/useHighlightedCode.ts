import { useQuery } from "react-query";

export const useHighlightedCode = ({ code }: { code: string }) => {
  // In prod mode we highlight code on the server so we don't need to
  // load the highlighter on the client
  if (process.env.NODE_ENV === "production") {
    return code;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery(
    code,
    async () => {
      // TODO switch to web socket for speed
      const res = await fetch("/highlight-code", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "text/plain",
        },
        body: code,
      });
      const { html } = await res.json();

      return html;
    },
    { suspense: true }
  );

  return data;
};
