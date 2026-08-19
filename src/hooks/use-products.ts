import { toast } from "@/components/ui/toast";
import type { Product } from "@/interface/product";
import { getErrorMessage, getProducts } from "@/services/product-service";
import { useEffect, useState, useCallback } from "react";

interface Props {
    search: string;
    category: string | null;
    page: number;
    limit?: number;
}

export function useProducts({ search, category, page, limit = 12 }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);

        try {
            const skip = (page - 1) * limit
            const data = await getProducts({
                search,
                category: category ?? undefined,
                limit,
                skip,
            });
            setProducts(data.products);
            setTotal(data.total);
        } catch (e) {
            toast.add({
                type: "error",
                description: getErrorMessage(e),
                priority: "high"
            })
        } finally {
            setIsLoading(false);
        }
    }, [search, category, page, limit]);

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            try {
                const skip = (page - 1) * limit;
                const data = await getProducts({
                    search,
                    category: category ?? undefined,
                    limit,
                    skip,
                });
                setProducts(data.products);
                setTotal(data.total);
            } catch (e) {
                toast.add({
                    type: "error",
                    description: getErrorMessage(e),
                    priority: "high"
                })
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts()
    }, [search, category, page, limit]);

    return { products, total, isLoading, limit, refetch: fetchProducts };
}

export const useSearchText = () => {
    const [search, setSearch] = useState("")

    return {
        search, setSearch
    };
}