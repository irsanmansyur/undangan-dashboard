"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import {
	PaymentMethodsForm,
	UcapanPenutup,
	VideoForm,
} from "~/components/wedding/step4-form";
import { useFetch } from "~/hooks/fetch-new";
import { paymentMethodSchema, quoteSchema, videoSchema } from "~/lib/schema";
import { useStoreWedding } from "~/stores/wedding";
import type { WeddingCollection } from "~/types/wedding";
import { AppConfig } from "~/utils/configs/app";
import { Quotes } from "../../../(ui)/quotes";

type Step4Props = {
	wedding: WeddingCollection;
	children?: React.ReactNode;
};

const formSchema = z.object({
	video: videoSchema.optional(),
	quotes: z.array(quoteSchema).min(1, "Minimal 1 quote"),
	paymentMethods: z.array(paymentMethodSchema).optional(),
	ucapanPenutup: z
		.object({
			title: z.string().min(1, "Judul penutup wajib diisi"),
			desc: z.string().min(1, "Deskripsi penutup wajib diisi"),
		})
		.optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

const Step4: React.FC<Step4Props> = ({ wedding }) => {
	const defaultValues = {
		quotes: wedding.quotes || [],
		video: wedding.video || { url: "", title: "" },
		ucapanPenutup: wedding.ucapanPenutup || { title: "", desc: "" },
		paymentMethods: wedding.paymentMethods || [],
	};
	const { setWedding } = useStoreWedding();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});
	const { loading, errors: errorsFetch, fetchData } = useFetch();
	const router = useRouter();
	async function onSubmit(data: FormSchema) {
		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${wedding.id}/step-4`,
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
		);
		if (resp) {
			setWedding({ step: 1 });
			toast.success("Wedding updated successfully");
			return router.push("/dashboard/wedding");
		}
		// error handling
		toast.error(errorsFetch || "Unknown error");
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Step 4: Additional Details</CardTitle>
				<CardDescription>
					Update closing message, quotes, payment methods, and video (Optional)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<UcapanPenutup control={form.control} />
						<Quotes control={form.control} />
						<PaymentMethodsForm control={form.control} />
						<VideoForm control={form.control} />
						<div className="flex justify-between">
							<Button
								type="button"
								variant="outline"
								disabled={loading}
								onClick={() => {
									setWedding({ step: 3 });
								}}
							>
								<ArrowLeft className="h-4 w-4" /> Back
							</Button>
							<Button type="submit" disabled={loading}>
								{loading && <Loader2 className="h-4 w-4 animate-spin" />}
								{loading ? "Updating..." : "Complete"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default Step4;
