"use client"

import { SearchIcon, SlidersHorizontal } from "lucide-react"

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

export function SearchFilter() {
  return (
    <div className="w-full">
      <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
        <InputGroupInput placeholder="Buscar produto" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="secondary" className="p-2 h-full! cursor-pointer">Filtro <SlidersHorizontal className="size-4" /></InputGroupButton>} />
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
