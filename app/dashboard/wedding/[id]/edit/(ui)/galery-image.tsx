"use client";
import { Trash2 } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useFetch } from "~/hooks/fetch-new";
import { AppConfig } from "~/utils/configs/app";
import ImageCard from "./image-card";

type GalleryImageProps = {
	children?: React.ReactNode;
	weddingId: string;
	removeGalleryPhoto: (index: number) => void;
	gallery: FILE.Gallery;
	index: number;
};

const GalleryImage: React.FC<GalleryImageProps> = ({
	index,
	gallery,
	weddingId,
	removeGalleryPhoto,
}) => {
	const { loading, errors, fetchData } = useFetch();

	async function remove() {
		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${weddingId}/gallery/${gallery.url}`,
			{
				method: "DELETE",
			},
		);
		if (resp) return removeGalleryPhoto(index);
		toast.error(errors || "Unknown error");
	}
	return (
		<div className="space-y-4 rounded-lg border p-4">
			<div className="flex items-center justify-between">
				<h4 className="font-medium">Photo {index + 1}</h4>
				{index > 0 && (
					<Button
						disabled={loading}
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => remove()}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="space-y-2 grid">
				<ImageCard imageUrl={`${AppConfig.BackendUrl}/files/${gallery.url}`} />
				<Label className="truncate pr-3">
					Caption <br />
					{`"${gallery.caption || ""}"`}
				</Label>
			</div>
		</div>
	);
};

export default GalleryImage;
