import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Rotas from "./router"
import GlobalProvider from "./context/global-provider"
import { Toaster } from "./components/ui/toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />

    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalProvider>
          <Rotas />
        </GlobalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
