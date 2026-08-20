import { Container } from "@/components/layout/container"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"

export function Index404() {
    return (
        <Container>
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>404 - Página não encontrada</EmptyTitle>
                    <EmptyDescription>
                        A página que procuras não existe ou foi removida. Verifica o endereço
                        ou volta à página inicial.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <EmptyDescription>
                        Desejas voltar? <a href="/">Página inicial</a>
                    </EmptyDescription>
                </EmptyContent>
            </Empty>

        </Container>
    )
}
