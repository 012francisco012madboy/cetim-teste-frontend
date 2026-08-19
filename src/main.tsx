import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Rotas from "./router"
import GlobalProvider from "./context/global-provider"
import { Toaster } from "./components/ui/toast"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster/>
    
    <ThemeProvider>
      <GlobalProvider>
        <Rotas />
      </GlobalProvider>
    </ThemeProvider>
  </StrictMode>
)
