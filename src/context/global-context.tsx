import { createContext } from "react"

interface GlobalContextData {
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
  search: string
  setSearch: (value: string) => void
  category: string | null
  setCategory: (value: string | null) => void
  favoriteIds: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
  removeFavorite: (id: number) => void
}

export const GlobalContext = createContext({} as GlobalContextData)