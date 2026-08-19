import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ItemDescription } from "@/components/ui/item"
import { Heart, StarIcon } from "lucide-react"
import { useNavigate } from "react-router"

export function ProductCard() {
  const navigate = useNavigate()

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0" onClick={() => navigate("/product")}>
      <CardAction className="absolute right-0 z-30 p-(--card-spacing)">
        <Heart className="size-6 text-primary" />
      </CardAction>
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <Badge variant="secondary">Featured</Badge>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Design systems meetup</CardTitle>
        </div>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>99$</CardTitle>
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-primary"/>
            <ItemDescription>2.4</ItemDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
