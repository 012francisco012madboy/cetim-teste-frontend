"use client"

import { SearchIcon, SlidersHorizontal, XIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    <div className="w-full">
      <InputGroup>
        <InputGroupAddon>
        {
          search != "" ?
          <InputGroupButton variant="ghost" onClick={() => setSearch("")}>
            <XIcon/>
          </InputGroupButton> :
          <SearchIcon />
        }
        </InputGroupAddon>
        <InputGroupInput placeholder="Buscar produto" value={search} onChange={(e) => setSearch(e.target.value)} />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="secondary" className="p-2 h-full">Filtro <SlidersHorizontal className="size-4" /></InputGroupButton>} />
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Favoritos</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
