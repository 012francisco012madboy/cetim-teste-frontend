import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { GlobalContext } from "@/context/global-context";
import type { Product } from "@/interface/product";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { StarIcon } from "lucide-react";
import { useContext } from "react";

interface Props {
    product: Product
}

const ProductEach = ({ product }: Props) => {
    const { isFavorite, toggleFavorite } = useContext(GlobalContext)

    return (
        <ItemGroup>
            <Item variant="default" className="grid lg:grid-cols-2 items-start gap-4">
                <ItemHeader>
                    <div className="w-full aspect-video">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="aspect-video w-full rounded-lg object-contain"
                        />
                    </div>
                </ItemHeader>
                <ItemContent className="gap-4">
                    <Badge variant="secondary" className="capitalize w-fit">{product.category}</Badge>
                    <ItemTitle className="text-2xl font-bold">{product.title}</ItemTitle>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-4 text-primary" />
                            <ItemDescription>{product.rating}</ItemDescription>
                        </div>
                        <ItemDescription>•</ItemDescription>
                        <ItemDescription>{product.stock} em stock</ItemDescription>
                    </div>
                    <ItemDescription>{product.description}</ItemDescription>
                    <ItemTitle className="text-xl font-bold">{product.price}$</ItemTitle>
                    {
                        isFavorite(product.id) ?
                            <Button onClick={() => toggleFavorite(product.id)} className="max-w-48" variant="secondary">
                                <HeartFilled className="text-2xl text-primary!" />
                                Remover dos favoritoos
                            </Button> :
                            <Button onClick={() => toggleFavorite(product.id)} className="max-w-48" variant="default">
                                <HeartOutlined className="text-2xl" />
                                Adicionar aos favoritos
                            </Button>
                    }
                </ItemContent>
            </Item>
        </ItemGroup>
    );
}

export default ProductEach;