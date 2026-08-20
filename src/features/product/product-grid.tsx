import { Content } from "@/components/layout/content";
import { ProductCard } from "./product-card";
import { useProducts } from "@/hooks/use-products";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { useContext } from "react";
import ProductCategoryButton from "./product-category-button";
import { Button } from "@/components/ui/button";
import { ItemDescription } from "@/components/ui/item";
import { GlobalContext } from "@/context/global-context";
import { ProductEmpty } from "./product-empty";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

const ProductGrid = () => {
    const { page, setPage, search, category, setCategory } = useContext(GlobalContext)
    const debouncedSearch = useDebouncedValue(search, 400);

    const { products, total, isLoading, limit } = useProducts({ search: debouncedSearch, category, page });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    function handleCategorySelect(value: string | null) {
        setCategory(value);
        setPage(1);
    }

    return (
        <Content>
            <ProductCategoryButton
                aria-live="polite"
                selected={category}
                aria-busy={isLoading}
                onSelect={handleCategorySelect}
            />
            {
                isLoading ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div> :
                    products?.length === 0 ?
                        <ProductEmpty /> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
            }

            {
                !isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="secondary"
                            disabled={page === 1}
                            aria-label="Página anterior"
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Anterior
                        </Button>
                        <ItemDescription
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            Página {page} de {totalPages}
                        </ItemDescription>
                        <Button
                            variant="secondary"
                            aria-label="Próxima página"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Próxima
                        </Button>
                    </div>
                )
            }
        </Content>
    );
}

export default ProductGrid;