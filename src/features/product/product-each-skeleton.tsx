import { Item, ItemContent, ItemGroup, ItemHeader } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductEachSkeleton() {
    return (
        <ItemGroup>
            <Item variant="default" className="grid lg:grid-cols-2 items-start gap-4">
                <ItemHeader>
                    <Skeleton className="aspect-video w-full" />
                </ItemHeader>
                <ItemContent className="gap-4">
                    <Skeleton className="h-4 w-1/2"/>
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-full"/>
                </ItemContent>
            </Item>
        </ItemGroup>
    );
}