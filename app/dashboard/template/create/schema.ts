import z from "zod";

export const templateSchema = z.object({
	thumbnail: z
		.any()
		.refine((v) => v instanceof File, { message: "Image is required" })
		.refine((v: File) => v && v.type.startsWith("image/"), {
			message: "File must be an image",
		}),
	templateName: z.string().min(1, "Template name is required"),
	sound: z
		.any()
		.refine((v) => v instanceof File, { message: "Sound is required" })
		.refine((v: File) => v && v.type.startsWith("audio/"), {
			message: "File must be an Sound",
		}),
	caption: z.string().optional(),
});

export type TemplateSchema = z.infer<typeof templateSchema>;
