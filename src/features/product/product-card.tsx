import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, StarIcon } from "lucide-react"

export function ProductCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
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
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>99$</CardTitle>
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-primary"/>
            <p className="text-muted-foreground">2.4</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
