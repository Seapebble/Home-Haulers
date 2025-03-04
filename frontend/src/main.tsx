import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { isSSR } from './utils/isSRR.ts'
import App from './App.tsx'

// ✅ Attach `isSSR` to `window` so it can be used anywhere
if (typeof window !== "undefined") {
  (window as any).isSSR = isSSR;
}

console.log("Running in SSR?", isSSR()); // ✅ Test in console
//console.log("MyComponent - Running in SSR?", (window as any).isSSR()); // ✅ Call isSSR globally

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
