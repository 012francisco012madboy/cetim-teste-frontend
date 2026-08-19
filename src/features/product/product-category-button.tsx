import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context/global-context";
import { getCategories } from "@/services/product-service";
import { useContext, useEffect, useState } from "react";

interface Props {
    selected: string | null;
    onSelect: (category: string | null) => void;
}

export default function ProductCategoryButton({ selected, onSelect }: Props) {
    const { search } = useContext(GlobalContext)
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    return (
        <div className="flex flex-wrap gap-2">
            <Button
                onClick={() => onSelect(null)}
                variant={(selected === null || search !== "") ? "default" : "outline"}
            >
                Todas
            </Button>

            {categories.map((cat) => (
                <Button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    aria-pressed={selected === cat}
                    variant={(selected === cat && search === "") ? "default" : "outline"}
                >
                    {cat}
                </Button>
            ))}
        </div>
    );
}