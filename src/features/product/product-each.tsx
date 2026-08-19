import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { StarIcon } from "lucide-react";

const ProductEach = () => {
    return (
        <ItemGroup>
            <Item variant="default" className="grid lg:grid-cols-2 items-start gap-4">
                <ItemHeader>
                    <img
                        src="https://avatar.vercel.sh/shadcn1"
                        alt="Event cover"
                        className="relative z-20 aspect-video w-full rounded-lg object-cover brightness-60 grayscale dark:brightness-40"
                    />
                </ItemHeader>
                <ItemContent className="gap-4">
                    <Badge variant="secondary">Featured</Badge>
                    <ItemTitle className="text-2xl font-bold">Design systems meetup</ItemTitle>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-4 text-primary" />
                            <ItemDescription>2.4</ItemDescription>
                        </div>
                        <ItemDescription>•</ItemDescription>
                        <ItemDescription>99 em stock</ItemDescription>
                    </div>
                    <ItemDescription>A practical talk on component APIs, accessibility, and shipping faster.</ItemDescription>
                    <ItemTitle className="text-xl font-bold">99$</ItemTitle>
                    <Button className="max-w-48 cursor-pointer">Adicionar aos favoritos</Button>
                </ItemContent>
            </Item>
        </ItemGroup>
    );
}

export default ProductEach;