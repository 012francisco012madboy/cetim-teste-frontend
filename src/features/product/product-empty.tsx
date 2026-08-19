import { Search, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Fragment, useContext } from "react"
import { GlobalContext } from "@/context/global-context"

export function ProductEmpty() {
    const { search, setSearch } = useContext(GlobalContext)

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Search />
                </EmptyMedia>
                <EmptyTitle>Sem resultado</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    Nenhum resultado encontrado {
                        search != "" && (
                            <Fragment>
                                {" "}na busca por <span className="font-bold">"{search}"</span>
                            </Fragment>
                        )
                    }
                </EmptyDescription>
            </EmptyHeader>
            {
                search != "" &&
                <EmptyContent>
                    <Button variant="outline" onClick={() => setSearch("")}>
                        <XIcon />
                        Cancelar
                    </Button>
                </EmptyContent>
            }
        </Empty>
    )
}
