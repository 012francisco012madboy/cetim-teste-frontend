import { Container } from "@/components/layout/container";
import { Content } from "@/components/layout/content";
import { Button } from "@/components/ui/button";
import ProductEach from "@/features/product/product-each";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Product = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Content>
                <Button variant="ghost" className="max-w-48 cursor-pointer" onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Voltar à página inicial
                </Button>
                <ProductEach/>
            </Content>
        </Container>
    );
}

export default Product;