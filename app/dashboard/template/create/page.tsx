"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppConfig } from "@/utils/configs/app";
import { useForm } from "react-hook-form";
import { templateSchema, TemplateSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import ImageInput from "./image-pratinjauh";
import { toast } from "sonner";
import { jsonToFormData } from "~/lib/form";
import { useFetch } from "~/hooks/fetch-new";

export default function CreateTemplatePage() {
	const router = useRouter();
	const form = useForm<TemplateSchema>({
		resolver: zodResolver(templateSchema),
	});
	const { loading, fetchData } = useFetch();

	const handleSubmit = async (data: TemplateSchema) => {
		const formData = jsonToFormData(data);
		try {
			const resp = await fetchData(
				`${AppConfig.BackendUrl}/wedding-templates`,
				{
					method: "POST",
					body: formData,
					credentials: "include",
				},
			);
			if (resp) router.push("/dashboard/template");
		} catch (_err) {
			toast.error("Failed to create template. Please try again.");
		}
	};

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<div className="mb-6">
				<Link
					href="/dashboard/template"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Templates
				</Link>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Create New Template</CardTitle>
					<CardDescription>
						Add a new wedding invitation template with background sound
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-6"
						>
							{/* IMAGE (file input with preview) */}
							<FormField
								control={form.control}
								name="thumbnail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Thumbnail <span className="text-destructive ml-1">*</span>
										</FormLabel>
										<FormControl className="h-[300px] relative">
											<ImageInput
												onFileChange={(f) => {
													field.onChange(f);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`templateName`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Template Name <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Input placeholder="." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`sound`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Sound
											<span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="audio/*"
												onChange={(e) => {
													const file = e.target.files?.[0];
													field.onChange(file); // simpan ke react-hook-form
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-6">
								<div className="flex gap-3 justify-end">
									<Button
										type="button"
										variant="outline"
										onClick={() => router.back()}
										disabled={loading}
									>
										Cancel
									</Button>
									<Button type="submit" disabled={loading}>
										{loading && <Loader2 className="animate-spin" />}
										{loading ? "Creating..." : "Create Template"}
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
