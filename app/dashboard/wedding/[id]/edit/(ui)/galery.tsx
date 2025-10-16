"use client";
import React from "react";
import GalleryImage from "./galery-image";
import { AddGalleryModal } from "./gallery-add";

type GalleryProps = {
	galleries: FILE.Gallery[];
	weddingId: string;
};

const Gallery: React.FC<GalleryProps> = ({ galleries: gl, weddingId }) => {
	const [galleries, setGallery] = React.useState(gl);
	return (
		<div className="space-y-4 grid grid-cols-2 gap-2">
			{galleries.map((gallery, index) => (
				<GalleryImage
					weddingId={weddingId}
					key={gallery.url}
					gallery={gallery}
					index={index}
					removeGalleryPhoto={(i) => {
						const newGallery = galleries.filter((_, idx) => idx !== i);
						setGallery(newGallery);
					}}
				/>
			))}
			<AddGalleryModal weddingId={weddingId} onAddAction={() => {}} />
		</div>
	);
};

export default Gallery;
