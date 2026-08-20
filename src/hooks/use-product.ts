import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, getProductById } from "@/services/product-service";

export function useProduct(id: string | undefined) {
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id!),
        enabled: !!id,
    });

    useEffect(() => {
        if (!id) {
            toast.add({
                type: "error",
                description: "Produto inválido.",
                priority: "high",
            });
            return;
        }

        if (error) {
            toast.add({
                type: "error",
                description: getErrorMessage(error),
                priority: "high",
            });
        }
    }, [id, error]);

    return { product: product ?? null, isLoading, error };
}