"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppConfig } from "@/utils/configs/app";
import { useFetch } from "~/hooks/fetch-new";
import { jsonToFormData } from "~/lib/form";
import { useStorePage } from "~/stores/page";

/**
 * Schema
 */
const loveStorySchema = z.object({
	title: z.string().min(1, "Title is required"),
	desc: z.string().min(1, "Description is required"),
	year: z.string(),
	id: z.string().optional(),
	image: z
		.any()
		.refine((v) => v instanceof File, { message: "Image is required" })
		.refine((v: File) => v?.type.startsWith("image/"), {
			message: "File must be an image",
		})
		.optional(),
});

type LoveStoryForm = z.infer<typeof loveStorySchema>;

type LoveStoryModalProps = {
	triggerLabel?: string;
	weddingId: string;
	/** called with FormData (multipart) so you can upload directly */
	onAddAction: (formData: WEDDING.Collection) => Promise<void> | void;
};

export function LoveStoryModal({
	triggerLabel = "Add LoveStory",
	onAddAction,
	weddingId,
}: LoveStoryModalProps) {
	const { generateNewPageId } = useStorePage();
	const { loading, errors, fetchData } = useFetch<{
		data: WEDDING.Collection;
	}>();

	const form = useForm<LoveStoryForm>({
		resolver: zodResolver(loveStorySchema),
		defaultValues: { image: undefined, desc: "", title: "", year: "" },
	});

	const { control, handleSubmit, reset, setValue } = form;
	const [open, setOpen] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// cleanup objectURL when modal closed or file changed
	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const onSubmit = async (data: LoveStoryForm) => {
		// prepare FormData for multipart upload
		const fd = jsonToFormData(data);
		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${weddingId}/love-story`,
			{
				method: "POST",
				body: fd,
			},
		);
		generateNewPageId();
		if (!resp || errors) return;

		await onAddAction(resp.data);
		setOpen(false);
		reset();
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline">
					{triggerLabel}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg w-[95vw]">
				<DialogHeader>
					<DialogTitle>Add LoveStory Item</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* IMAGE (file input with preview) */}
						<FormField
							control={control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image</FormLabel>
									<FormControl>
										<input
											type="file"
											accept="image/*"
											onChange={(e) => {
												const f = e.target.files?.[0];
												// update react-hook-form
												field.onChange(f);
												// preview
												if (previewUrl) {
													URL.revokeObjectURL(previewUrl);
												}
												if (f) {
													setPreviewUrl(URL.createObjectURL(f));
												} else {
													setPreviewUrl(null);
												}
											}}
											className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-muted file:text-sm file:font-medium"
										/>
									</FormControl>
									<FormMessage />
									{previewUrl && (
										<div className="mt-3 flex items-start gap-3">
											<Image
												width={122}
												height={122}
												src={previewUrl}
												alt="preview"
												className="h-28 w-28 object-cover rounded border"
											/>
											<div className="flex-1">
												<p className="text-sm text-muted-foreground">Preview</p>
												<div className="mt-2 flex gap-2">
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() => {
															// remove selection
															field.onChange(undefined);
															if (previewUrl) {
																URL.revokeObjectURL(previewUrl);
																setPreviewUrl(null);
															}
															// also clear the native file input by resetting the form (cheap)
															// but keep other fields - so we patch
															setValue("image", undefined);
														}}
													>
														<Trash2 className="h-4 w-4" /> Remove
													</Button>
												</div>
											</div>
										</div>
									)}
								</FormItem>
							)}
						/>

						{/* ALT (required) */}
						<FormField
							control={control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="e.g. Our First Meeting" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="year"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Year{" "}
										<span className="text-xs text-muted-foreground">
											(e.g. 2020)
										</span>
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="desc"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setOpen(false);
									reset();
									if (previewUrl) {
										URL.revokeObjectURL(previewUrl);
										setPreviewUrl(null);
									}
								}}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={loading}>
								{loading ? "Uploading..." : "Add"}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
