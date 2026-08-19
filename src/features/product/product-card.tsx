import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ItemDescription } from "@/components/ui/item"
import type { Product } from "@/interface/product"
import { Heart, StarIcon } from "lucide-react"
import { useNavigate } from "react-router"

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const navigate = useNavigate()

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 cursor-pointer" onClick={() => navigate(`product/${product.id}`)}>
      <CardAction className="absolute right-0 z-30 p-(--card-spacing)">
        <Heart className="size-6 text-primary" />
      </CardAction>
      <div className="w-full aspect-video">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-video w-full object-contain"
        />
      </div>
      <CardHeader>
        <Badge variant="secondary" className="capitalize w-fit">{product.category}</Badge>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{product.title}</CardTitle>
        </div>
        <CardDescription>
          {product.description}
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{product.price}$</CardTitle>
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-primary" />
            <ItemDescription className="line-clamp-2">{product.rating}</ItemDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
