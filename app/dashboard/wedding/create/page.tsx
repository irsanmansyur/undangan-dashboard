"use client";

import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Step1Form } from "@/components/wedding/step1-form";
import { Step3Form } from "@/components/wedding/step3-form";
import { Step4Form } from "@/components/wedding/step4-form";
import type { Template } from "@/types/template";
import type {
	PaymentMethod,
	Quote,
	Ucapan,
	VideoInfo,
	WeddingAcara,
	WeddingCollection,
	WeddingFirstStep,
	WeddingMempelai,
} from "@/types/wedding";
import { AppConfig } from "@/utils/configs/app";
import { useFetcher } from "~/hooks/fetcher";
import { renderStepIndicator } from "../(ui)/step-indicator";
import Step1 from "./(ui)/step-1";
import Step2 from "./(ui)/step-2";
import { useStoreCreateWedding } from "./store";
import Step3 from "./(ui)/step-3";
import Step4 from "./(ui)/step-4";

export default function CreateWeddingPage() {
	const { step, wedding } = useStoreCreateWedding();

	const router = useRouter();
	const { data: templatesData, exec: fetchTemplates } =
		useFetcher<Template[]>();
	const { loading, error, request, data } = useFetcher<WeddingCollection>();
	const [weddingId, setWeddingId] = useState<string | null>(null);

	// Step 1 data
	const [step1Data, setStep1Data] = useState<WeddingFirstStep>({
		templateId: "",
		coverPhoto: "",
		backgroundMusic: "",
	});
	const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
	const [groomPhotoFile, setGroomPhotoFile] = useState<File | null>(null);
	const [bridePhotoFile, setBridePhotoFile] = useState<File | null>(null);

	// Step 2 data
	const [step2Data, setStep2Data] = useState<WeddingMempelai>({
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
	const [showResepsiPria, setShowResepsiPria] = useState(false);
	const [showResepsiWanita, setShowResepsiWanita] = useState(false);

	// Step 3 data
	const [step3Data, setStep3Data] = useState<WeddingAcara>({
		akadNikah: {
			tanggal: "",
			waktu: "",
			alamat: "",
			tempat: "",
		},
	});

	// Step 3 data (love story & gallery)
	const [loveStories, setLoveStories] = useState<
		{ year: string; title: string; desc: string; image?: File }[]
	>([{ year: "", title: "", desc: "" }]);
	const [galleryPhotos, setGalleryPhotos] = useState<
		{ file: File | null; caption: string }[]
	>([{ file: null, caption: "" }]);

	// Step 4 data (ucapanPenutup, quotes, paymentMethods, video)
	const [ucapanPenutup, setUcapanPenutup] = useState<Ucapan>({
		title: "",
		desc: "",
	});
	const [quotes, setQuotes] = useState<Quote[]>([
		{
			title: "",
			defaultText: "",
			otherText: "",
			source: "",
		},
	]);
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
		{
			name: "",
			type: "bank",
			account: "",
			holder: "",
		},
	]);
	const [video, setVideo] = useState<VideoInfo | undefined>();

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
			{step === 2 && <Step2 wedding={wedding!} />}

			{/* Step 3: Love Story & Gallery */}
			{step === 3 && <Step3 />}

			{/* Step 4: Additional Details */}
			{step === 4 && <Step4 wedding={wedding!} />}
		</div>
	);
}
