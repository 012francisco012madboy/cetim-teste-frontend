import { toast } from "@/components/ui/toast";
import type { Product } from "@/interface/product";
import { getErrorMessage, getProductById } from "@/services/product-service";
import { useEffect, useState } from "react";

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        if (!id) {
            toast.add({
                type: "error",
                description: "Produto inválido.",
                priority: "high",
            });

            return () => {
                isMounted = false;
            };
        }

        const loadProduct = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getProductById(id);

                if (isMounted) {
                    setProduct(data);
                }
            } catch (e) {
                if (isMounted) {
                    setError(getErrorMessage(e));

                    toast.add({
                        type: "error",
                        description: getErrorMessage(e),
                        priority: "high",
                    });
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, [id]);


    return { product, isLoading, error };
}