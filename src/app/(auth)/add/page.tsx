import { redirect } from "next/navigation"

export default function AddPage() {
  redirect("/dashboard?tab=feed")
}
