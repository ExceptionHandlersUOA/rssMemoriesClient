import { notFound } from "next/navigation"
import { favourites } from "@/lib/data/favourites"
import { Metadata } from "next"

type Props = {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Category",
  description: "Category details",
}

export default async function MemoryPage({ params }: Props) {
  const decodedId = decodeURIComponent((await params).id)
  const memory = favourites.find(item => item.feedId === parseInt(decodedId))

  if (!memory) {
    notFound()
  }

  return null
}
