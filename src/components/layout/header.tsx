import { Moon, Sun } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Content } from "./content";
import { SearchFilter } from "./search-filter";
import { useTheme } from "../theme-provider";

const Header = () => {
    const { theme, setTheme } = useTheme()

    return (
        <Content>
            <div className="pt-4 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary">Teste Frontend</Badge>
                    <Button
                        variant="ghost"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label={theme === "dark" ? "Ativar o modo claro" : "Ativar o modo escuro"}
                        aria-pressed={theme === "dark"}
                    >
                        {
                            theme === "dark" ?
                                <Sun className="size-4" aria-hidden="true" /> :
                                <Moon className="size-4" aria-hidden="true" />
                        }
                    </Button>
                </div>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">Descubra produtos com <br className="hidden sm:flex" /> <span className="text-primary">pesquisa instantânea</span>.</h1>
                <p className="text-muted-foreground">Explore centenas de artigos, filtre por categoria e guarde os seus favoritos <br /> tudo numa experiência rápida e responsiva.</p>
                <SearchFilter />
            </div>
        </Content>
    );
}

export default Header;