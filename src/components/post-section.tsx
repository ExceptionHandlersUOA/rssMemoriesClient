"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { ImageIcon, PlusIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PostFormData = {
	title: string;
	description: string;
	tags: string[];
	files: FileList | null;
};

const defaultTags: string[] = [
	"Memories",
	"m",
	"me",
	"mem",
	"memp",
	"memo",
	"memm",
	"memmm",
	"memmmmm",
	"memor",
	"memorie",
	"memory",
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
];

export const PostSection = () => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [commandInputValue, setCommandInputValue] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<PostFormData>({
		defaultValues: {
			title: "",
			description: "",
			tags: [],
			files: null,
		},
	});

	const tags = watch("tags");

	const addTag = (tag: string) => {
		if (tag.trim() && !tags.includes(tag.trim())) {
			const updatedTags = [...tags, tag.trim()];
			setValue("tags", updatedTags);
			setCommandInputValue("");
			setIsPopoverOpen(false);
		}
	};

	const removeTag = (index: number) => {
		const updatedTags = tags.filter((_, i) => i !== index);
		setValue("tags", updatedTags);
	};

	const handleImageClick = () => {
		document.getElementById("file-upload")?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const newFiles = Array.from(files);
			setUploadedFiles((prev) => [...prev, ...newFiles]);
			setValue("files", files);
		}
	};

	const removeFile = (index: number) => {
		setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
		const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
		if (updatedFiles.length === 0) {
			setValue("files", null);
		}
	};

	const onSubmit = async (data: PostFormData) => {
		try {
			// Handle form submission here
			console.log("Form data:", data);
			console.log("Uploaded files:", uploadedFiles);

			// Reset form after successful submission
			setUploadedFiles([]);
			setValue("title", "");
			setValue("description", "");
			setValue("tags", []);
			setValue("files", null);
		} catch (error) {
			console.error("Error submitting post:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="w-full max-w-3xl flex-col space-y-2 bg-card justify-center mx-auto p-4 shadow-md rounded-lg">
				<Input
					{...register("title", {
						required: "Please enter a title",
						minLength: { value: 1, message: "title cannot be empty" },
					})}
					placeholder="Title"
					className={cn(
						"text-xl md:text-xl font-semibold border-none shadow-none",
					)}
				/>
				{errors.description && (
					<p className="text-sm text-destructive">
						{errors.description.message}
					</p>
				)}

				<div className="flex items-center flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Badge key={tag} className="flex items-center gap-1">
							<span>{tag}</span>
							<button
								type="button"
								onClick={() => removeTag(index)}
								className="hover:text-destructive transition-colors"
							>
								<X className="size-3" />
							</button>
						</Badge>
					))}
					<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
						<PopoverTrigger asChild>
							<Badge className="cursor-pointer" variant="secondary">
								<PlusIcon className="size-3" />
								<span>Add Tag</span>
							</Badge>
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
										{defaultTags.map((tag) => (
											<CommandItem
												key={tag}
												value={tag}
												onSelect={(value: string) => {
													addTag(value);
													setIsPopoverOpen(false);
												}}
											>
												{tag}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
								<CommandGroup className="border-t">
									{commandInputValue.trim() && (
										<CommandItem
											value={commandInputValue}
											onSelect={(value: string) => {
												addTag(value);
												setCommandInputValue("");
												setIsPopoverOpen(false);
												defaultTags.push(value);
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
					<p className="text-sm text-destructive">
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
						<ImageIcon className="size-6 cursor-pointer hover:text-primary transition-colors" />
					</Button>
					<div className="flex-grow overflow-x-scroll">
						{uploadedFiles.length > 0 && (
							<div className="flex gap-2">
								{uploadedFiles.map((file, index) => (
									<div
										key={`${file.name}-${file.size}-${index}`}
										className="relative group"
									>
										<div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-md">
											<span className="text-sm truncate max-w-[150px]">
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
								))}
							</div>
						)}
					</div>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Posting..." : "Post"}
					</Button>
				</div>
			</section>
		</form>
	);
};
