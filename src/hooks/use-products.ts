import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, getProducts } from "@/services/product-service";

interface Props {
    search: string;
    category: string | null;
    page: number;
    limit?: number;
}

export function useProducts({ search, category, page, limit = 12 }: Props) {
    const skip = (page - 1) * limit;

    const { data, isLoading, error } = useQuery({
        queryKey: ["products", { search, category, page, limit }],
        queryFn: () =>
            getProducts({
                search,
                category: category ?? undefined,
                limit,
                skip,
            }),
    });

    useEffect(() => {
        if (error) {
            toast.add({
                type: "error",
                description: getErrorMessage(error),
                priority: "high",
            });
        }
    }, [error]);

    return {
        products: data?.products ?? [],
        total: data?.total ?? 0,
        isLoading,
        limit,
    };
}

export const useSearchText = () => {
    const [search, setSearch] = useState("")

    return {
        search, setSearch
    };
}