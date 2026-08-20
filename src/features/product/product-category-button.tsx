import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context/global-context";
import { getCategories } from "@/services/product-service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

interface Props {
    selected: string | null;
    onSelect: (category: string | null) => void;
}

export default function ProductCategoryButton({ selected, onSelect }: Props) {
    const { search } = useContext(GlobalContext)
    const [categories, setCategories] = useState<string[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        getCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    function updateScrollState() {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }

    useEffect(() => {
        updateScrollState();
    }, [categories]);

    function scrollByAmount(amount: number) {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    }

    return (
        categories.length != 0 &&
        <div className="flex flex-col gap-2">
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    disabled={!selected}
                    className="max-w-fit text-xs"
                    onClick={() => {
                        onSelect(null);
                        scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                    }}
                >
                    Limpar filtro
                </Button>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    variant="secondary"
                    className="w-8 rounded-full flex sm:hidden"
                    aria-label="Rolar categorias para a esquerda"
                    disabled={!canScrollLeft}
                    onClick={() => scrollByAmount(-150)}
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    role="group"
                    aria-label="Filtrar por categoria"
                    className="flex gap-1 sm:gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-hide"
                >
                    <Button
                        onClick={() => onSelect(null)}
                        aria-pressed={selected === null || search !== ""}
                        variant={(selected === null || search !== "") ? "default" : "outline"}
                        className="shrink-0"
                    >
                        Todas
                    </Button>
                    {
                        categories.map((cat) => (
                            <Button
                                key={cat}
                                onClick={() => onSelect(cat)}
                                aria-pressed={selected === cat}
                                variant={(selected === cat && search === "") ? "default" : "outline"}
                                className="shrink-0"
                            >
                                {cat}
                            </Button>
                        ))
                    }
                </div>
                <Button
                    onClick={() => scrollByAmount(150)}
                    disabled={!canScrollRight}
                    variant="secondary"
                    className="w-8 rounded-full flex sm:hidden"
                    aria-label="Rolar categorias para a direita"
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}