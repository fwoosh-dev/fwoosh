import { useQuery } from "react-query";

export const useMdxContent = (content: string) => {
  const { data } = useQuery(
    content,
    async () => {
      if (process.env.NODE_ENV === "production") {
        return content;
      }

      // In dev we generate props only as necessary to be quicker
      return new Promise<string>((resolve) => {
        const socket = new WebSocket(
          `ws://localhost:${process.env.FWOOSH_DEV_SERVER_PORT}/get-mdx-content`
        );

        socket.addEventListener("open", () => {
          socket.send(content);
        });

        socket.addEventListener("message", (event) => {
          resolve(event.data);
        });
      });
    },
    { suspense: true }
  );

  return data;
};
