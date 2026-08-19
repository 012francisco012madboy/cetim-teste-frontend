import { useState, type ReactNode } from "react"
import { GlobalContext } from "./global-context";


interface ContextProps {
  children: ReactNode
}

function GlobalProvider({ children }: ContextProps) {
  const [search, setSearchState] = useState("");
  const [category, setCategoryState] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  function setSearch(value: string) {
    setSearchState(value);
    setPage(1);
  }

  function setCategory(value: string | null) {
    setCategoryState(value);
    setPage(1);
  }
  return (
    <GlobalContext.Provider value={{
      page, setPage,
      search, setSearch,
      category, setCategory
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider