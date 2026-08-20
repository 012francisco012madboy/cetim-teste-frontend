import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ItemDescription } from "@/components/ui/item"
import { GlobalContext } from "@/context/global-context"
import type { Product } from "@/interface/product"
import { useContext } from "react"
import { useNavigate } from "react-router"
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons"

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { isFavorite, toggleFavorite } = useContext(GlobalContext)
  const favorite = isFavorite(product.id)

  const navigate = useNavigate()

  return (
    <Card
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/product/${product.id}`);
        }
      }}
      aria-label={`Ver detalhes de ${product.title}`}
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative mx-auto w-full max-w-sm pt-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      <CardAction className="absolute right-0 z-30 p-(--card-spacing)"
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(product.id)
        }}
        aria-pressed={favorite}
        aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {
          favorite ?
            <HeartFilled className="text-xl text-primary!" /> :
            <HeartOutlined className="text-xl text-muted-foreground!" />
        }
      </CardAction>
      <div className="w-full aspect-video">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-video w-full object-contain"
        />
      </div>
      <CardHeader>
        <Badge
          variant="secondary"
          className="capitalize w-fit"
        >
          {product.category}
        </Badge>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{product.title}</CardTitle>
        </div>
        <CardDescription>{product.description}</CardDescription>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{product.price}$</CardTitle>
          <div className="flex items-center gap-1">
            <StarFilled className="text-sm text-primary!" />
            <ItemDescription className="line-clamp-2">
              {product.rating}
            </ItemDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
