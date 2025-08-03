"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ImageIcon, PlusIcon, X } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCreateCustomPost } from "@/lib/mutations/posts"
import { useAddFile } from "@/lib/mutations/files"
import { useAddCustomFeed } from "@/lib/mutations/feeds"
import { useFeeds } from "@/query/feeds"
import { FileType } from "@/lib/schemas/enums"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select"

type PostFormData = {
  title: string
  description: string
  tags: string[]
  files: FileList | null
  feedId: string
}

const defaultTags: string[] = [
  "Memories",
  "Childhood",
  "Family",
  "Friends",
  "School Days",
  "Summer",
  "Vacations",
  "Games",
  "Favorite Foods",
  "Celebrations",
  "Milestones",
  "Adventures",
]

export const PostSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [commandInputValue, setCommandInputValue] = useState("")
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([])
  const [showCreateFeedDialog, setShowCreateFeedDialog] = useState(false)
  const [newFeedTitle, setNewFeedTitle] = useState("")

  const { data: feeds, isLoading } = useFeeds()

  const addFileMutation = useAddFile()
  const createPostMutation = useCreateCustomPost()
  const addCustomFeedMutation = useAddCustomFeed()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      files: null,
      feedId: "",
    },
  })

  const tags = watch("tags")

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      const updatedTags = [...tags, tag.trim()]
      setValue("tags", updatedTags)
      setCommandInputValue("")
      setIsPopoverOpen(false)
    }
  }

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setValue("tags", updatedTags)
  }

  const handleImageClick = () => {
    document.getElementById("file-upload")?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles(prev => [...prev, ...newFiles])
      setValue("files", files)

      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file))
      setFilePreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    if (filePreviewUrls[index]) {
      URL.revokeObjectURL(filePreviewUrls[index])
    }

    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    setFilePreviewUrls(prev => prev.filter((_, i) => i !== index))

    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    if (updatedFiles.length === 0) {
      setValue("files", null)
    }
  }

  const handleCreateNewFeed = async () => {
    if (!newFeedTitle.trim()) {
      alert("Please enter a feed title")
      return
    }

    try {
      await addCustomFeedMutation.mutateAsync({
        title: newFeedTitle.trim(),
        description: `Personal feed: ${newFeedTitle.trim()}`,
        imageUrl: null,
        url: `https://personal-feed/${newFeedTitle.toLowerCase().replace(/\s+/g, "-")}`,
      })

      // Since the mutation returns { success: boolean, message: string },
      // we'll use a generated ID or let the user select from the refreshed list
      const generatedId = (
        feeds && feeds.length > 0 ? feeds[feeds.length - 1].feedId + 1 : 1
      ).toString()

      setValue("feedId", generatedId)
      setShowCreateFeedDialog(false)
      setNewFeedTitle("")
    } catch (error) {
      console.error("Error creating new feed:", error)
      alert("Failed to create new feed. Please try again.")
    }
  }

  const handleFeedSelection = (value: string) => {
    const addPersonalFeedValue = (
      feeds && feeds.length > 0 ? feeds[feeds.length - 1].feedId + 1 : 1
    ).toString()

    if (value === addPersonalFeedValue) {
      setShowCreateFeedDialog(true)
    } else {
      setValue("feedId", value)
    }
  }

  const onSubmit = async (data: PostFormData) => {
    try {
      // const filesToUpload = [];

      // Upload files and collect their information
      // for (const file of Array.from(data.files || [])) {
      // 	await addFileMutation.mutateAsync({
      // 		file,
      // 		filename: file.name,
      // 	});

      // 	// Add file info to the array with proper FileType enum
      // 	filesToUpload.push({
      // 		type: file.type.startsWith("image/")
      // 			? FileType.Image
      // 			: FileType.Video,
      // 		fileName: file.name,
      // 	});
      // }

      if (data.feedId === "") {
        throw new Error("Please select a feed")
      }

      await createPostMutation.mutateAsync({
        feedId: data.feedId,
        createCustomPostRequest: {
          post: {
            title: data.title,
            description: data.description,
            media: [],
            body: null,
            sourceUrl: null,
            categories: data.tags,
            favourited: false,
          },
        },
      })

      // Handle form submission here
      console.log("Form data:", data)
      console.log("Uploaded files:", uploadedFiles)
      // console.log("Files to upload:", filesToUpload);
      console.log("Selected feed ID:", data.feedId)

      filePreviewUrls.forEach(url => URL.revokeObjectURL(url))

      // Reset form after successful submission
      setUploadedFiles([])
      setFilePreviewUrls([])
      setValue("title", "")
      setValue("description", "")
      setValue("tags", [])
      setValue("files", null)
      setValue("feedId", "")
    } catch (error) {
      console.error("Error submitting post:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="py-4">
        <CardHeader>
          <CardTitle>
            <Input
              {...register("title", {
                required: "Please enter a title",
                minLength: { value: 1, message: "title cannot be empty" },
              })}
              placeholder="Title"
              className={cn("text-xl font-semibold md:text-xl")}
            />
            <Controller
              name="feedId"
              control={control}
              rules={{ required: "Please select a feed" }}
              render={({ field }) => (
                <Select onValueChange={handleFeedSelection} value={field.value}>
                  <SelectTrigger className="w-[148px]">
                    <SelectValue placeholder="Select Feed" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading feeds...
                      </SelectItem>
                    ) : (
                      <>
                        {feeds
                          ?.filter(feed => feed.platform === "Custom")
                          .map(feed => (
                            <SelectItem
                              key={feed.feedId}
                              value={feed.feedId.toString()}
                            >
                              {feed.title}
                            </SelectItem>
                          ))}
                        <SelectItem
                          value={(feeds && feeds.length > 0
                            ? feeds[feeds.length - 1].feedId + 1
                            : 1
                          ).toString()}
                        >
                          Add Personal Feed
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
        </CardTitle>
        {errors.feedId && (
          <p className="text-destructive text-sm">{errors.feedId.message}</p>
        )}
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  visualDuration: 0.3,
                }}
                layout
              >
                <Badge className="flex items-center gap-1">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <motion.div
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    visualDuration: 0.3,
                  }}
                  layout
                >
                  <Badge
                    className="hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                    variant="secondary"
                  >
                    <PlusIcon className="size-3" />
                    <span>Add Tag</span>
                  </Badge>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <Command>
                  <CommandInput
                    placeholder="Add a tag..."
                    value={commandInputValue}
                    onValueChange={setCommandInputValue}
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {defaultTags.map(tag => {
                        const isSelected = tags.includes(tag)
                        return (
                          <CommandItem
                            key={tag}
                            value={tag}
                            onSelect={(value: string) => {
                              if (!isSelected) {
                                addTag(value)
                                setIsPopoverOpen(false)
                              } else {
                                removeTag(tags.indexOf(value))
                                setIsPopoverOpen(false)
                              }
                            }}
                          >
                            {isSelected && <Check />}
                            <span className="flex-1">{tag}</span>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                  <CommandGroup className="border-t">
                    {commandInputValue.trim() && (
                      <CommandItem
                        value={commandInputValue}
                        onSelect={(value: string) => {
                          addTag(value)
                          setCommandInputValue("")
                          setIsPopoverOpen(false)
                          defaultTags.push(value)
                        }}
                        className="cursor-pointer"
                      >
                        {`Add "${commandInputValue}"`}
                      </CommandItem>
                    )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Textarea
            {...register("description", {
              required: "Please enter something to remember",
              minLength: { value: 1, message: "description cannot be empty" },
            })}
            placeholder="Something to Remember..."
          />
          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
            </p>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
            <Button type="button" onClick={handleImageClick} variant="ghost">
              <ImageIcon className="hover:text-primary size-6 cursor-pointer transition-colors" />
            </Button>
            <div className="flex-grow" />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="flex gap-2 overflow-auto">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="bg-muted flex flex-col items-center justify-center space-y-2 rounded-md p-2 pt-4"
                >
                  {file.type.startsWith("image/") && filePreviewUrls[index] && (
                    <div className="relative h-32 w-32">
                      <Image
                        src={filePreviewUrls[index]}
                        alt={file.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  {file.type.startsWith("video/") && filePreviewUrls[index] && (
                    <div className="relative h-32 w-32 overflow-hidden rounded-md">
                      <video
                        src={filePreviewUrls[index]}
                        className="h-full w-full object-cover"
                        preload="metadata"
                        muted
                        playsInline
                        aria-label={`Video thumbnail for ${file.name}`}
                        style={{
                          pointerEvents: "none",
                          display: "block",
                        }}
                        onLoadedMetadata={e => {
                          // Set to first frame
                          e.currentTarget.currentTime = 0.1
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-2 rounded-md px-3 py-2">
                    <span className="max-w-[150px] truncate text-sm">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </CardContent>
      </Card>

      {/* Create New Feed Dialog */}
      <Dialog
        open={showCreateFeedDialog}
        onOpenChange={setShowCreateFeedDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Personal Feed</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="feed-title" className="text-sm font-medium">
                Feed Title
              </label>
              <Input
                id="feed-title"
                value={newFeedTitle}
                onChange={e => setNewFeedTitle(e.target.value)}
                placeholder="Enter feed title"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateFeedDialog(false)
                setNewFeedTitle("")
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateNewFeed}
              disabled={addCustomFeedMutation.isPending}
            >
              {addCustomFeedMutation.isPending ? "Creating..." : "Create Feed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}
