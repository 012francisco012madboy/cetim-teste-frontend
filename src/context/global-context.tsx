import { createContext } from "react"

interface GlobalContextData {
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
  search: string
  setSearch: (value: string) => void
  category: string | null
  setCategory: (value: string | null) => void
}

export const GlobalContext = createContext({} as GlobalContextData)