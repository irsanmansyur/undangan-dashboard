"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Template } from "@/types/template";
import type {
	PaymentMethod,
	Quote,
	Ucapan,
	VideoInfo,
	WeddingAcara,
	WeddingFirstStep,
	WeddingMempelai,
} from "@/types/wedding";
import { AppConfig } from "@/utils/configs/app";
import { useFetcher } from "~/hooks/fetcher";
import { renderStepIndicator } from "../(ui)/step-indicator";
import Step1 from "./(ui)/step-1";
import Step2 from "./(ui)/step-2";
import Step3 from "./(ui)/step-3";
import Step4 from "./(ui)/step-4";
import { useStoreCreateWedding } from "./store";

export default function CreateWeddingPage() {
	const { step, wedding } = useStoreCreateWedding();
	const { exec: fetchTemplates } = useFetcher<Template[]>();
	const [_weddingId, _setWeddingId] = useState<string | null>(null);

	// Step 1 data
	const [_step1Data, _setStep1Data] = useState<WeddingFirstStep>({
		templateId: "",
		coverPhoto: "",
		backgroundMusic: "",
	});
	const [_coverPhotoFile, _setCoverPhotoFile] = useState<File | null>(null);
	const [_groomPhotoFile, _setGroomPhotoFile] = useState<File | null>(null);
	const [_bridePhotoFile, _setBridePhotoFile] = useState<File | null>(null);

	// Step 2 data
	const [_step2Data, _setStep2Data] = useState<WeddingMempelai>({
		groom: {
			namaLengkap: "",
			anakKe: "",
			namaAyah: "",
			namaIbu: "",
			instagram: "",
			photoUrl: "",
		},
		bride: {
			namaLengkap: "",
			anakKe: "",
			namaAyah: "",
			namaIbu: "",
			instagram: "",
			photoUrl: "",
		},
	});

	// Step 3 now combines step 2 and 3 data
	const [_showResepsiPria, _setShowResepsiPria] = useState(false);
	const [_showResepsiWanita, _setShowResepsiWanita] = useState(false);

	// Step 3 data
	const [_step3Data, _setStep3Data] = useState<WeddingAcara>({
		akadNikah: {
			tanggal: "",
			waktu: "",
			alamat: "",
			tempat: "",
		},
	});

	// Step 3 data (love story & gallery)
	const [_loveStories, _setLoveStories] = useState<
		{ year: string; title: string; desc: string; image?: File }[]
	>([{ year: "", title: "", desc: "" }]);
	const [_galleryPhotos, _setGalleryPhotos] = useState<
		{ file: File | null; caption: string }[]
	>([{ file: null, caption: "" }]);

	// Step 4 data (ucapanPenutup, quotes, paymentMethods, video)
	const [_ucapanPenutup, _setUcapanPenutup] = useState<Ucapan>({
		title: "",
		desc: "",
	});
	const [_quotes, _setQuotes] = useState<Quote[]>([
		{
			title: "",
			defaultText: "",
			otherText: "",
			source: "",
		},
	]);
	const [_paymentMethods, _setPaymentMethods] = useState<PaymentMethod[]>([
		{
			name: "",
			type: "bank",
			account: "",
			holder: "",
		},
	]);
	const [_video, _setVideo] = useState<VideoInfo | undefined>();

	// Load templates on mount
	useEffect(() => {
		fetchTemplates(`${AppConfig.BackendUrl}/wedding-templates`);
	}, [fetchTemplates]);

	return (
		<div className="container mx-auto p-6 max-w-3xl">
			<div className="mb-6">
				<Link
					href="/dashboard/wedding"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Weddings
				</Link>
			</div>
			{renderStepIndicator(step)}
			{/* Step 1: Basic Info */}
			{step === 1 && <Step1 />}

			{/* Step 2: Mempelai & Acara */}
			{step === 2 && <Step2 wedding={wedding} />}

			{/* Step 3: Love Story & Gallery */}
			{step === 3 && <Step3 />}

			{/* Step 4: Additional Details */}
			{step === 4 && <Step4 wedding={wedding} />}
		</div>
	);
}
