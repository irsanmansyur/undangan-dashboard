import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
	EventInfo,
	PersonInfo,
	WeddingAcara,
	WeddingMempelai,
} from "@/types/wedding";
import { ImagePreview } from "./image-preview";

interface Step2FormProps {
	step2Data: WeddingMempelai;
	setStep2Data: (data: WeddingMempelai) => void;
	step3Data: WeddingAcara;
	setStep3Data: (data: WeddingAcara) => void;
	groomPhotoFile: File | null;
	setGroomPhotoFile: (file: File | null) => void;
	bridePhotoFile: File | null;
	setBridePhotoFile: (file: File | null) => void;
	showResepsiPria: boolean;
	setShowResepsiPria: (show: boolean) => void;
	showResepsiWanita: boolean;
	setShowResepsiWanita: (show: boolean) => void;
	onSubmit: (e: React.FormEvent) => void;
	onBack: () => void;
	loading: boolean;
	error: { message?: string[] };
	isEdit?: boolean;
}

export function Step2Form({
	step2Data,
	setStep2Data,
	step3Data,
	setStep3Data,
	groomPhotoFile,
	setGroomPhotoFile,
	bridePhotoFile,
	setBridePhotoFile,
	showResepsiPria,
	setShowResepsiPria,
	showResepsiWanita,
	setShowResepsiWanita,
	onSubmit,
	onBack,
	loading,
	error,
	isEdit = false,
}: Step2FormProps) {
	const updatePersonInfo = (
		type: "groom" | "bride",
		field: keyof PersonInfo,
		value: string,
	) => {
		setStep2Data((prev) => ({
			...prev,
			[type]: {
				...prev[type],
				[field]: value,
			},
		}));
	};

	const updateEventInfo = (
		type: "akadNikah" | "resepsiPria" | "resepsiWanita",
		field: keyof EventInfo,
		value: string,
	) => {
		setStep3Data((prev) => ({
			...prev,
			[type]: {
				...(prev[type] || {}),
				[field]: value,
			},
		}));
	};

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			{/* Groom Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Groom (Mempelai Pria)</h3>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>{isEdit ? "Replace Photo (Optional)" : "Photo"}</Label>
						<ImagePreview
							existingUrl={isEdit ? step2Data.groom.photoUrl : undefined}
							newFile={groomPhotoFile || undefined}
						/>
						<Input
							type="file"
							accept="image/*"
							onChange={(e) => setGroomPhotoFile(e.target.files?.[0] || null)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>
								Full Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.groom.namaLengkap}
								onChange={(e) =>
									updatePersonInfo("groom", "namaLengkap", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Child Order <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.groom.anakKe}
								onChange={(e) =>
									updatePersonInfo("groom", "anakKe", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Father's Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.groom.namaAyah}
								onChange={(e) =>
									updatePersonInfo("groom", "namaAyah", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Mother's Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.groom.namaIbu}
								onChange={(e) =>
									updatePersonInfo("groom", "namaIbu", e.target.value)
								}
								required
							/>
						</div>
						<div className="col-span-2 space-y-2">
							<Label>Instagram</Label>
							<Input
								value={step2Data.groom.instagram}
								onChange={(e) =>
									updatePersonInfo("groom", "instagram", e.target.value)
								}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Bride Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Bride (Mempelai Wanita)</h3>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>{isEdit ? "Replace Photo (Optional)" : "Photo"}</Label>
						<ImagePreview
							existingUrl={isEdit ? step2Data.bride.photoUrl : undefined}
							newFile={bridePhotoFile || undefined}
						/>
						<Input
							type="file"
							accept="image/*"
							onChange={(e) => setBridePhotoFile(e.target.files?.[0] || null)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>
								Full Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.bride.namaLengkap}
								onChange={(e) =>
									updatePersonInfo("bride", "namaLengkap", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Child Order <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.bride.anakKe}
								onChange={(e) =>
									updatePersonInfo("bride", "anakKe", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Father's Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.bride.namaAyah}
								onChange={(e) =>
									updatePersonInfo("bride", "namaAyah", e.target.value)
								}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>
								Mother's Name <span className="text-destructive">*</span>
							</Label>
							<Input
								value={step2Data.bride.namaIbu}
								onChange={(e) =>
									updatePersonInfo("bride", "namaIbu", e.target.value)
								}
								required
							/>
						</div>
						<div className="col-span-2 space-y-2">
							<Label>Instagram</Label>
							<Input
								value={step2Data.bride.instagram}
								onChange={(e) =>
									updatePersonInfo("bride", "instagram", e.target.value)
								}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Akad Nikah */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Akad Nikah</h3>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>
							Date <span className="text-destructive">*</span>
						</Label>
						<Input
							type="date"
							value={step3Data.akadNikah.tanggal}
							onChange={(e) =>
								updateEventInfo("akadNikah", "tanggal", e.target.value)
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label>
							Time <span className="text-destructive">*</span>
						</Label>
						<Input
							type="time"
							value={step3Data.akadNikah.waktu}
							onChange={(e) =>
								updateEventInfo("akadNikah", "waktu", e.target.value)
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label>
							Venue <span className="text-destructive">*</span>
						</Label>
						<Input
							value={step3Data.akadNikah.tempat}
							onChange={(e) =>
								updateEventInfo("akadNikah", "tempat", e.target.value)
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label>
							Address <span className="text-destructive">*</span>
						</Label>
						<Input
							value={step3Data.akadNikah.alamat}
							onChange={(e) =>
								updateEventInfo("akadNikah", "alamat", e.target.value)
							}
							required
						/>
					</div>
				</div>
			</div>

			{/* Optional Resepsi Pria */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="showResepsiPria"
						checked={showResepsiPria}
						onChange={(e) => setShowResepsiPria(e.target.checked)}
						className="rounded"
					/>
					<Label htmlFor="showResepsiPria">Add Resepsi Pria (Optional)</Label>
				</div>
				{showResepsiPria && (
					<div className="grid grid-cols-2 gap-4 pl-6">
						<div className="space-y-2">
							<Label>Date</Label>
							<Input
								type="date"
								value={step3Data.resepsiPria?.tanggal || ""}
								onChange={(e) =>
									updateEventInfo("resepsiPria", "tanggal", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Time</Label>
							<Input
								type="time"
								value={step3Data.resepsiPria?.waktu || ""}
								onChange={(e) =>
									updateEventInfo("resepsiPria", "waktu", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Venue</Label>
							<Input
								value={step3Data.resepsiPria?.tempat || ""}
								onChange={(e) =>
									updateEventInfo("resepsiPria", "tempat", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Address</Label>
							<Input
								value={step3Data.resepsiPria?.alamat || ""}
								onChange={(e) =>
									updateEventInfo("resepsiPria", "alamat", e.target.value)
								}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Optional Resepsi Wanita */}
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="showResepsiWanita"
						checked={showResepsiWanita}
						onChange={(e) => setShowResepsiWanita(e.target.checked)}
						className="rounded"
					/>
					<Label htmlFor="showResepsiWanita">
						Add Resepsi Wanita (Optional)
					</Label>
				</div>
				{showResepsiWanita && (
					<div className="grid grid-cols-2 gap-4 pl-6">
						<div className="space-y-2">
							<Label>Date</Label>
							<Input
								type="date"
								value={step3Data.resepsiWanita?.tanggal || ""}
								onChange={(e) =>
									updateEventInfo("resepsiWanita", "tanggal", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Time</Label>
							<Input
								type="time"
								value={step3Data.resepsiWanita?.waktu || ""}
								onChange={(e) =>
									updateEventInfo("resepsiWanita", "waktu", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Venue</Label>
							<Input
								value={step3Data.resepsiWanita?.tempat || ""}
								onChange={(e) =>
									updateEventInfo("resepsiWanita", "tempat", e.target.value)
								}
							/>
						</div>
						<div className="space-y-2">
							<Label>Address</Label>
							<Input
								value={step3Data.resepsiWanita?.alamat || ""}
								onChange={(e) =>
									updateEventInfo("resepsiWanita", "alamat", e.target.value)
								}
							/>
						</div>
					</div>
				)}
			</div>

			{error.message && (
				<div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
					<p className="text-sm text-destructive">{error.message[0]}</p>
				</div>
			)}

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					disabled={loading}
				>
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
				<Button type="submit" disabled={loading}>
					{loading && <Loader2 className="h-4 w-4 animate-spin" />}
					{loading ? (isEdit ? "Updating..." : "Saving...") : "Next"}
				</Button>
			</div>
		</form>
	);
}
