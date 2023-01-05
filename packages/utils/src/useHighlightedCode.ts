import { useQuery } from "react-query";

export const useHighlightedCode = ({ code }: { code: string }) => {
  const { data } = useQuery(
    code,
    async () => {
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
