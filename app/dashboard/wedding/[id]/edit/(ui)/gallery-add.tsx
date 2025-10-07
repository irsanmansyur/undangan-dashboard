"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import { useFetch } from "~/hooks/fetch-new";
import { AppConfig } from "~/utils/configs/app";
import { useStorePage } from "~/stores/page";

/**
 * Schema
 */
const gallerySchema = z.object({
	image: z
		.any()
		.refine((v) => v instanceof File, { message: "Image is required" })
		.refine((v: File) => v && v.type.startsWith("image/"), {
			message: "File must be an image",
		}),
	alt: z.string().min(1, "Alt text is required"),
	caption: z.string().optional(),
});

type GalleryForm = z.infer<typeof gallerySchema>;

type GalleryModalProps = {
	triggerLabel?: string;
	weddingId: string;
	/** called with FormData (multipart) so you can upload directly */
	onAddAction: (formData: FormData) => Promise<void> | void;
	loading?: boolean;
	/** if true, modal will not auto-close after onAddAction */
	keepOpenOnAdd?: boolean;
};

export function AddGalleryModal({
	triggerLabel = "Add Gallery",
	onAddAction,
	loading = false,
	weddingId,
	keepOpenOnAdd = false,
}: GalleryModalProps) {
	const { generateNewPageId } = useStorePage();
	const { loading: loadingAdd, errors, fetchData } = useFetch();

	const form = useForm<GalleryForm>({
		resolver: zodResolver(gallerySchema),
		defaultValues: { image: undefined as any, alt: "", caption: "" },
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

	const onSubmit = async (data: GalleryForm) => {
		// prepare FormData for multipart upload
		const fd = new FormData();
		fd.append("image", data.image as File);
		fd.append("alt", data.alt);
		if (data.caption) fd.append("caption", data.caption);
		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${weddingId}/gallery`,
			{
				method: "POST",
				body: fd,
			},
		);
		generateNewPageId();
		if (!resp) return;

		await onAddAction(fd);
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
					<DialogTitle>Add Gallery Item</DialogTitle>
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
											<img
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
															setValue("image" as any, undefined);
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
							name="alt"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alt text</FormLabel>
									<FormControl>
										<Input
											placeholder="Describe the image (for accessibility)"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* CAPTION (optional) */}
						<FormField
							control={control}
							name="caption"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Caption (optional)</FormLabel>
									<FormControl>
										<Textarea placeholder="Short caption" {...field} />
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
