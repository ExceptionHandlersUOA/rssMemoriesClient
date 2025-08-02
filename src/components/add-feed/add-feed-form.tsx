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
import { PlusIcon } from "lucide-react"
import { AddFeedRequest, AddFeedUrlRequestSchema } from "@/lib/schemas"
import { useAddFeed } from "@/lib/mutations/feeds"
import { toast } from "sonner"

export const AddFeedForm = () => {
  const mutation = useAddFeed()

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
    } catch (error) {
      toast("Feed was not added :(")
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Add your Memories from a feed on the Web
          </CardTitle>
          <CardDescription>
            A description so audience can better understand what this does
          </CardDescription>
        </CardHeader>
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
                        placeholder="Feed URL"
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
                <PlusIcon />
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  )
}
