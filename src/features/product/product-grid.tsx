import { Content } from "@/components/layout/content";
import { ProductCard } from "./product-card";

const ProductGrid = () => {
    return (
        <Content>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    Array.from({length: 6}).map((_, index) => (
                        <ProductCard key={index}/>
                    ))
                }
            </div>
        </Content>
    );
}
 
export default ProductGrid;