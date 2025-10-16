"use client";
import Image from "next/image";
import type React from "react";

type ImageCardProps = {
	children?: React.ReactNode;
	imageUrl: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {
	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-lg border">
			<Image
				src={imageUrl}
				alt="Preview"
				fill
				className="object-cover"
				sizes="(max-width: 768px) 100vw, 300px"
			/>
		</div>
	);
};

export default ImageCard;
