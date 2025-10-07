"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { AudioPicker } from "~/components/audio";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useFetch, useFetcNow } from "~/hooks/fetch-new";
import { useStoreWedding } from "~/stores/wedding";
import { Template } from "~/types/template";
import { WeddingCollection } from "~/types/wedding";
import { AppConfig } from "~/utils/configs/app";
import { useStoreCreateWedding } from "../store";
type Step1Props = {
	children?: React.ReactNode;
};

const formSchemaUpdate1 = z.object({
	templateId: z.string().min(1, "Template is required"),
	coverPhoto: z
		.instanceof(File)
		.refine((file) => !file || file.type.startsWith("image/"), {
			message: "File harus berupa gambar",
		}),

	backgroundMusic: z.string().optional(),
});
export type FormSchemaUpdate1 = z.infer<typeof formSchemaUpdate1>;

const Step1: React.FC<Step1Props> = () => {
	const { step, setWedding } = useStoreCreateWedding();

	const [preview, setPreview] = useState<string | null>(`/add.png`);

	const { fetchData } = useFetch<{ data: WEDDING.Collection }>();
	const form = useForm<FormSchemaUpdate1>({
		resolver: zodResolver(formSchemaUpdate1),
		defaultValues: { templateId: "" },
	});
	async function onSubmit(data: FormSchemaUpdate1) {
		const formData = new FormData();
		formData.append("templateId", data.templateId);
		if (data.coverPhoto) {
			formData.append("coverPhoto", data.coverPhoto, data.coverPhoto.name);
		}
		if (data.backgroundMusic) {
			formData.append("backgroundMusicId", data.backgroundMusic);
		}
		const response = await fetchData(`${AppConfig.BackendUrl}/weddings`, {
			method: "POST",
			body: formData,
		});
		if (response) {
			setWedding({ step: 2, wedding: response.data });
		}
	}
	const { resp, loading: laodingAudio } = useFetcNow<{ data: FILE.AUDIO[] }>(
		`${AppConfig.BackendUrl}/files/type/sound`,
	);
	const { resp: templateRes } = useFetcNow<{
		data: Template[];
	}>(`${AppConfig.BackendUrl}/wedding-templates`);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 1: Basic Information</CardTitle>
					<CardDescription>Update template and cover photo</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="templateId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Template <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Select
												value={field.value || ""}
												onValueChange={(v) => field.onChange(v)}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Pilih Template..." />
												</SelectTrigger>

												<SelectContent>
													{templateRes?.data.map((a) => (
														<SelectItem key={a.id} value={a.id}>
															{a.templateName}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										{/* error message dari zod */}
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="coverPhoto"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover Photo</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												onChange={(e) => {
													const file = e.target.files?.[0];
													field.onChange(file); // simpan ke react-hook-form
													if (file) {
														setPreview(URL.createObjectURL(file)); // buat preview
													} else {
														setPreview(null);
													}
												}}
											/>
										</FormControl>
										<FormMessage />
										<div className="flex justify-center items-center p-4">
											{preview && (
												<div className="mt-3">
													<img
														src={preview}
														alt="Cover Preview"
														className="h-40 w-full object-cover rounded-lg border"
													/>
												</div>
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="backgroundMusic"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Background Music</FormLabel>
										<FormControl>
											<div>
												<AudioPicker
													audios={resp?.data || []}
													loading={laodingAudio}
													value={field.value}
													onChange={field.onChange} // ← update form
												/>
												<span className="text-xs text-muted-foreground">
													Selected ID: {field.value || "-"}
												</span>
												<div className="text-sm text-muted-foreground">
													Optional. Choose background music for your invitation.
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end">
								<Button type="submit">
									Next <ArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
};

export default Step1;
