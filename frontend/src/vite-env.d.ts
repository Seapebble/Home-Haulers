/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_BACKEND_URL: string;
    readonly VITE_BACKEND_API_URL: string;
    readonly VITE_ALLOWED_META_PAGES: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  