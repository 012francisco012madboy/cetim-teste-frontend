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

const ProductGrid = () => {
    const { page, setPage, search, category, setCategory } = useContext(GlobalContext)

    const { products, total, isLoading, limit } = useProducts({ search, category, page });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    function handleCategorySelect(value: string | null) {
        setCategory(value);
        setPage(1);
    }

    return (
        <Content>
            <ProductCategoryButton selected={category} onSelect={handleCategorySelect} />
            {
                isLoading ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div> :
                    products.length === 0 ?
                        <ProductEmpty /> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
            }

            {
                !isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                            variant="secondary"
                        >
                            Anterior
                        </Button>
                        <ItemDescription>Página {page} de {totalPages}</ItemDescription>
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages}
                            variant="secondary"
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