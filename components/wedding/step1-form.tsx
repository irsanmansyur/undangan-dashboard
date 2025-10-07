import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Template } from "@/types/template";
import type { WeddingFirstStep } from "@/types/wedding";
import { ImagePreview } from "./image-preview";

interface Step1FormProps {
	step1Data: WeddingFirstStep;
	setStep1Data: (data: WeddingFirstStep) => void;
	coverPhotoFile: File | null;
	setCoverPhotoFile: (file: File | null) => void;
	templates: Template[] | undefined;
	onSubmit: (e: React.FormEvent) => void;
	isEdit?: boolean;
}

export function Step1Form({
	step1Data,
	setStep1Data,
	coverPhotoFile,
	setCoverPhotoFile,
	templates,
	onSubmit,
	isEdit = false,
}: Step1FormProps) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="space-y-3">
				<Label htmlFor="templateId">
					Template <span className="text-destructive">*</span>
				</Label>
				<select
					id="templateId"
					value={step1Data.templateId}
					onChange={(e) =>
						setStep1Data({ ...step1Data, templateId: e.target.value })
					}
					required
					className="w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Select a template</option>
					{templates?.map((template) => (
						<option key={template.id} value={template.id}>
							{template.templateName}
						</option>
					))}
				</select>
			</div>

			<div className="space-y-3">
				<Label htmlFor="coverPhoto">
					{isEdit ? "Replace Cover Photo (Optional)" : "Cover Photo"}{" "}
					{!isEdit && <span className="text-destructive">*</span>}
				</Label>
				<div className="flex justify-center items-center p-4">
					<ImagePreview
						existingUrl={isEdit ? (step1Data.coverPhoto as string) : undefined}
						newFile={coverPhotoFile || undefined}
					/>
				</div>
				<Input
					id="coverPhoto"
					type="file"
					accept="image/*"
					onChange={(e) => setCoverPhotoFile(e.target.files?.[0] || null)}
					required={!isEdit}
				/>
			</div>

			<div className="space-y-3">
				<Label htmlFor="backgroundMusic">Background Music ID (Optional)</Label>
				<Input
					id="backgroundMusic"
					type="text"
					placeholder="Enter music ID"
					value={step1Data.backgroundMusic}
					onChange={(e) =>
						setStep1Data({
							...step1Data,
							backgroundMusic: e.target.value,
						})
					}
				/>
			</div>

			<div className="flex justify-end">
				<Button type="submit">
					Next <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</form>
	);
}
