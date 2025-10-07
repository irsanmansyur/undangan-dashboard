import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppConfig } from "@/utils/configs/app";

interface ImagePreviewProps {
	existingUrl?: string;
	newFile?: File;
	onRemove?: () => void;
	showRemove?: boolean;
}

export function ImagePreview({
	existingUrl,
	newFile,
	onRemove,
	showRemove = false,
}: ImagePreviewProps) {
	const imageUrl = newFile
		? URL.createObjectURL(newFile)
		: existingUrl
			? `${AppConfig.BackendUrl}/files/${existingUrl}`
			: null;

	if (!imageUrl) return null;

	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-lg border">
			<Image
				src={imageUrl}
				alt="Preview"
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 400px"
			/>
			{showRemove && onRemove && (
				<Button
					type="button"
					variant="destructive"
					size="icon"
					className="absolute right-2 top-2"
					onClick={onRemove}
				>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
