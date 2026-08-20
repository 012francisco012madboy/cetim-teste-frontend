import { Container } from "@/components/layout/container";
import { ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
    return (
        <Container>
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <Spinner className="size-6"/>
                <ItemTitle>A carregar página...</ItemTitle>
            </div>
        </Container>
    );
}

export default Loading;