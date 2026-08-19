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
      <InputGroupInput placeholder="Buscar produto" value={search} onChange={(e) => setSearch(e.target.value)} />
      <InputGroupAddon align="inline-end">
        {
          search != "" &&
          <InputGroupButton variant="ghost" onClick={() => setSearch("")}>
            <XIcon />
          </InputGroupButton>
        }
      </InputGroupAddon>
    </InputGroup>
  )
}
