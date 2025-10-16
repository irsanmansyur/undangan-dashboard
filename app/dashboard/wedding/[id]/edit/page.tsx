"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { WeddingCollection } from "@/types/wedding";
import { AppConfig } from "@/utils/configs/app";
import { useFetcNow } from "~/hooks/fetch-new";
import { useStorePage } from "~/stores/page";
import { useStoreWedding } from "~/stores/wedding";
import { renderStepIndicator } from "../../(ui)/step-indicator";
import Step1 from "./(ui)/step-1";
import Step2 from "./(ui)/step-2";
import Step3 from "./(ui)/step-3";
import Step4 from "./(ui)/step-4";

export default function EditWeddingPage() {
	const params = useParams();
	const weddingId = params.id as string;
	const { step } = useStoreWedding();
	const { pageId } = useStorePage();
	const { resp: weddingData, loading } = useFetcNow<{
		data: WeddingCollection;
	}>(`${AppConfig.BackendUrl}/weddings/${weddingId}?pageId=${pageId}`);

	if (loading || !weddingData) {
		return (
			<div className="flex min-h-[400px] items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-3xl p-6">
			<div className="mb-6">
				<Link
					href="/dashboard/wedding"
					onClick={() => useStoreWedding.setState({ step: 1 })}
					className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Weddings
				</Link>
			</div>
			{renderStepIndicator(step)}
			{weddingData && step === 1 && <Step1 wedding={weddingData.data} />}
			{weddingData && step === 2 && <Step2 wedding={weddingData.data} />}
			{weddingData && step === 3 && <Step3 wedding={weddingData.data} />}
			{weddingData && step === 4 && <Step4 wedding={weddingData.data} />}
		</div>
	);
}
