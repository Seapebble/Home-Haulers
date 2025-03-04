import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type { PageContextClient } from "vike/types";

export { render };

function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  const container = document.getElementById("react-root");
  if (!container) {
    console.error("❌ Error: No `react-root` element found in HTML.");
    return;
  }

  if (pageContext.isHydration) {
    hydrateRoot(container, <Page {...pageProps} />);
  } else {
    createRoot(container).render(<Page {...pageProps} />);
  }
}
