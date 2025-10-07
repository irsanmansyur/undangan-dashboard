"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import ImageCard from "./image-card";
import { AppConfig } from "~/utils/configs/app";
import { useFetch } from "~/hooks/fetch-new";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
type GalleryImageProps = {
	children?: React.ReactNode;
	weddingId: string;
	onDeletedAction?: (wedding: WEDDING.Collection) => void;
	gallery: FILE.Gallery;
	index: number;
};

const GalleryImage: React.FC<GalleryImageProps> = ({
	index,
	gallery,
	weddingId,
	onDeletedAction,
}) => {
	const { loading, errors, fetchData } = useFetch<{
		data: WEDDING.Collection;
	}>();

	async function remove() {
		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${weddingId}/gallery/${gallery.url}`,
			{
				method: "DELETE",
			},
		);
		if (resp) {
			onDeletedAction?.(resp.data);
		} else {
			toast.error(errors || "Unknown error");
		}
	}
	return (
		<>
			<div className="space-y-4 rounded-lg border p-4">
				<div className="flex items-center justify-between">
					<h4 className="font-medium">Photo {index + 1}</h4>
					<Button
						disabled={loading}
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => remove()}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-y-2 grid">
					<ImageCard
						imageUrl={`${AppConfig.BackendUrl}/files/${gallery.url}`}
					/>
					<Label className="truncate pr-3">
						Caption <br />
						{`"${gallery.caption || ""}"`}
					</Label>
				</div>
			</div>
		</>
	);
};

export default GalleryImage;
