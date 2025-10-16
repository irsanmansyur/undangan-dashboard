"use client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { Button } from "~/components/ui/button";
import { useFetch } from "~/hooks/fetch-new";
import { AppConfig } from "~/utils/configs/app";

type LoveStoryCardProps = {
	loveStory: WEDDING.LoveStory;
	weddingId: string;
	index?: number;
	onDeletedAction?: (formData: WEDDING.Collection) => Promise<void> | void;
};

const LoveStoryCard: React.FC<LoveStoryCardProps> = ({
	loveStory,
	weddingId,
	onDeletedAction,
}) => {
	const url = !loveStory?.image
		? "/no-image.png"
		: `${AppConfig.BackendUrl}/files/${loveStory.image}`;
	const { loading, fetchData } = useFetch<{ data: WEDDING.Collection }>();

	return (
		<div key={loveStory.id} className="rounded-lg border p-4">
			<div className="flex items-center flex-col sm:flex-row gap-4 relative">
				<div className="p-2 flex items-center justify-center shrink-0 h-30 w-30">
					<Image
						src={url}
						alt={loveStory.title}
						width={100}
						height={100}
						className="h-full w-full rounded-md object-cover"
					/>
				</div>
				<div className="space-y-2 w-full">
					<div className="font-bold">
						{loveStory.title}
						<div className="text-sm text-muted-foreground">
							({loveStory.year})
						</div>
					</div>
					<div className="text-sm text-muted-foreground">{loveStory.desc}</div>
					{/* REMOVE BUTTON */}

					<Button
						type="button"
						variant="ghost"
						size="sm"
						disabled={loading}
						className="absolute right-2 top-2"
						onClick={async () => {
							const resp = await fetchData(
								`${AppConfig.BackendUrl}/weddings/${weddingId}/love-story/${loveStory.id}`,
								{
									method: "DELETE",
								},
							);
							if (resp) {
								onDeletedAction?.(resp.data);
							}
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoveStoryCard;
