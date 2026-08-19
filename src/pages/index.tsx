import { Container } from "@/components/layout/container";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Separator } from "@/components/ui/separator";
import ProductGrid from "@/features/product/product-grid";

const Index = () => {
    return (
        <Container>
            <Header/>
            <Separator/>
            <ProductGrid/>
            <Separator/>
            <Footer/>
        </Container>
    );
}

export default Index;