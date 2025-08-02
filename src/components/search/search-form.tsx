"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { SearchIcon } from "lucide-react"

export const SearchDetailsSchema = z.object({
  url: z.url(),
})
export type SearchDetails = z.infer<typeof SearchDetailsSchema>

export const SearchForm = () => {
  const form = useForm<SearchDetails>({
    resolver: zodResolver(SearchDetailsSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = async (searchDetails: SearchDetails) => {
    console.log("pressed")
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-2xl">Find your Memories on the Web</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-8"
        >
          <CardContent className="flex w-full justify-center">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-lg">
                  <FormControl>
                    <Input
                      placeholder="URL"
                      {...field}
                      className={cn(
                        form.formState.errors.url && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mx-2 cursor-pointer text-lg" type="submit">
              <SearchIcon />
            </Button>
          </CardContent>
        </form>
      </Form>
    </div>
  )
}
