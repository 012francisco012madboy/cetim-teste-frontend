import { Container } from "@/components/layout/container";
import { Content } from "@/components/layout/content";
import { Button } from "@/components/ui/button";
import ProductEach from "@/features/product/product-each";
import { ProductEachSkeleton } from "@/features/product/product-each-skeleton";
import { ProductEmpty } from "@/features/product/product-empty";
import { useProduct } from "@/hooks/use-product";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const Product = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { product, isLoading } = useProduct(id);

    return (
        <Container>
            <Content>
                <Button
                variant="ghost"
                className="max-w-fit"
                onClick={() => navigate(-1)}
                >
                    <ArrowLeft />
                    Voltar à página inicial
                </Button>
                {
                    isLoading ?
                        <ProductEachSkeleton /> :
                        product !== null ?
                            <ProductEach product={product} /> :
                            null
                }
            </Content>
            {
                !isLoading && product === null &&
                <div className="flex-1 flex items-center justify-center">
                    <ProductEmpty />
                </div>
            }
        </Container>
    );
}

export default Product;