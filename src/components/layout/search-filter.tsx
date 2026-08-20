import { SearchIcon, XIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useContext } from "react";
import { GlobalContext } from "@/context/global-context";

export function SearchFilter() {
  const { search, setSearch } = useContext(GlobalContext);

  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        value={search}
        id="product-search"
        aria-label="Buscar produto"
        placeholder="Buscar produto"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        {
          search != "" &&
          <InputGroupButton
            variant="ghost"
            aria-label="Limpar pesquisa"
            onClick={() => setSearch("")}
          >
            <XIcon />
          </InputGroupButton>
        }
      </InputGroupAddon>
    </InputGroup>
  )
}
