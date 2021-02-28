interface DocumentProps {
  children: React.ReactNode;
  attach?: string;
  frontMatter: {
    title?: string;
    description?: string;
  };
}

export const Document = ({ children, frontMatter, attach }: DocumentProps) => {
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
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{frontMatter.title || "Document"}</title>
          <style>{`
            .ul li {
              list-style-type: disc;
              margin-left: 1.5rem;
            }

            .ol li {
              list-style-type: decimal;
              margin-left: 1.5rem;
            }

            .syntax-dark {
              display: none;
            }
            
            @media (prefers-color-scheme: dark) {
              .syntax-light {
                display: none;
              }
            
              .syntax-dark {
                display: block;
              }
            }            
          `}</style>
        </head>
        
        <body>
          <div id="root">{children}</div>

          {attach && <script type="module" src={attach} />}
        </body>
      </html>
    </>
  );
};
