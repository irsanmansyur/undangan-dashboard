"use client";

import { z } from "zod";
import LoveStoryCard from "../../(ui)/love-story-card";
import { LoveStoryModal } from "../../(ui)/love-story-insert";
import { useStoreCreateWedding } from "../store";

/**
 * Zod schema
 * - image optional, if provided must be File and image/*
 * - year: 4-digit year (ubah ke kebutuhanmu)
 * - title, desc: required
 */
const loveStoryItemSchema = z.object({
	imageDefault: z.string().optional(),
	image: z
		.any()
		.optional()
		.refine((v) => !v || v instanceof File, {
			message: "Image must be a File",
		}),
	year: z
		.string()
		.regex(/^\d{4}$/, { message: "Year must be 4 digits (e.g. 2024)" }),
	title: z.string().min(1, { message: "Title is required" }),
	desc: z.string().min(1, { message: "Description is required" }),
});

const loveStorySchema = z.object({
	items: z.array(loveStoryItemSchema).min(1, "Add at least one story item"),
});

type LoveStoryFormSchema = z.infer<typeof loveStorySchema>;

/**
 * Props:
 * - defaultValues (optional)
 * - onSubmit: receives raw form values (note: images are File objects)
 */
export function LoveStoryForm({
	loveStories,
	weddingId,
}: {
	loveStories: WEDDING.LoveStory[];
	onSubmitAction: (values: LoveStoryFormSchema) => Promise<void> | void;
	submitLabel?: string;
	submitting?: boolean;
	weddingId: string;
}) {
	const { setWedding } = useStoreCreateWedding();

	return (
		<div className="space-y-4">
			{loveStories.map((field, index) => (
				<LoveStoryCard
					key={field.id}
					weddingId={weddingId}
					loveStory={field}
					index={index}
					onDeletedAction={(w) => {
						setWedding({ wedding: w });
					}}
				/>
			))}
			<LoveStoryModal
				weddingId={weddingId}
				onAddAction={(w) => {
					setWedding({ wedding: w });
				}}
			/>
		</div>
	);
}
