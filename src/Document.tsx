interface DocumentProps {
  children: React.ReactNode;
  frontMatter: {
    title?: string;
    description?: string;
  };
}

export const Document = ({ children, frontMatter }: DocumentProps) => {
  return (
    <>
      <html lang="en">
        <head>
          {/* TODO: 1st class integration */}
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />

          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{frontMatter.title || "Document"}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
};
