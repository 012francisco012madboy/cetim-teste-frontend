import { Badge } from "../ui/badge";
import { Content } from "./content";
import { SearchFilter } from "./search-filter";

const Header = () => {
    return (
        <Content>
            <div className="pt-4 flex flex-col gap-8">
                <Badge variant="secondary">Teste Frontend</Badge>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">Descubra produtos com <br /> <span className="text-primary">pesquisa instantânea</span>.</h1>
                <p className="text-muted-foreground">Explore centenas de artigos, filtre por categoria e guarde os seus favoritos <br /> tudo numa experiência rápida e responsiva.</p>
                <SearchFilter />
            </div>
        </Content>
    );
}

export default Header;