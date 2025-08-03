"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { PlusIcon } from "lucide-react"
import { AddFeedRequest, AddFeedUrlRequestSchema } from "@/lib/schemas"
import { useAddFeed } from "@/lib/mutations/feeds"
import { toast } from "sonner"
import { useQueryState } from "nuqs"

export const AddFeedForm = () => {
  const mutation = useAddFeed()
  const [, setIsOpen] = useQueryState("add-feed", {
    defaultValue: false,
    parse: (value): boolean => {
      return value === "true"
    },
    serialize: (value): string => {
      return value ? "true" : "false"
    },
  })

  const form = useForm<AddFeedRequest>({
    resolver: zodResolver(AddFeedUrlRequestSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = async (addFeedDetails: AddFeedRequest) => {
    try {
      mutation.mutate(addFeedDetails)
      toast("Feed was added successfully!")
      setIsOpen(false)
      form.reset()
    } catch (error) {
      toast("Feed was not added :(")
    }
  }

  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>Add New Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full items-center gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Feed URL"
                        {...field}
                        className={cn(
                          form.formState.errors.url &&
                            "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="cursor-pointer" type="submit">
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
