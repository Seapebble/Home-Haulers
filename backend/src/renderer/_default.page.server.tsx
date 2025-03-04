import React from "react";
import { renderToString } from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import type { PageContextServer } from "vike/types";

export { render };

async function render(pageContext: PageContextServer) {
  const { Page, pageProps = {} } = pageContext;

  if (!Page) {
    throw new Error("❌ Missing Page component! Ensure it's exported correctly.");
  }

  // ✅ Convert React to SSR HTML
  const pageHtml = renderToString(<Page {...pageProps} />);

  // ✅ Properly formatted return object
  return {
    documentHtml: escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageContext.pageExports?.title || "Home Haulers"}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`,
  };
}
