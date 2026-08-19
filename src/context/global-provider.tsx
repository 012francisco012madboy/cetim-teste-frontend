import { useEffect, useState, type ReactNode } from "react"
import { GlobalContext } from "./global-context";

const STORAGE_KEY = "favorites";

function loadFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

interface ContextProps {
  children: ReactNode
}

function GlobalProvider({ children }: ContextProps) {
  const [search, setSearchState] = useState("");
  const [category, setCategoryState] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function setSearch(value: string) {
    setSearchState(value);
    setPage(1);
  }

  function setCategory(value: string | null) {
    setCategoryState(value);
    setPage(1);
  }

  function isFavorite(id: number) {
    return favoriteIds.includes(id);
  }

  function toggleFavorite(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function removeFavorite(id: number) {
    setFavoriteIds((prev) => prev.filter((f) => f !== id));
  }

  return (
    <GlobalContext.Provider value={{
      page, setPage,
      search, setSearch,
      category, setCategory,
      favoriteIds, isFavorite,
      toggleFavorite, removeFavorite
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider