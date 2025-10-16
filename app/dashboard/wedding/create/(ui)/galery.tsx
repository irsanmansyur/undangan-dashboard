"use client";
import React, { useEffect } from "react";
import { useStoreCreateWedding } from "../store";
import GalleryImage from "./galery-image";
import { AddGalleryModal } from "./gallery-add";

type GalleryProps = {
	galleries: FILE.Gallery[];
	weddingId: string;
};

const Gallery: React.FC<GalleryProps> = ({ galleries: gl, weddingId }) => {
	const [galleries, setGallery] = React.useState(gl);
	const { setWedding, wedding } = useStoreCreateWedding();
	useEffect(() => {
		wedding && setGallery(wedding.gallery || []);
		return () => {};
	}, [wedding]);

	return (
		<div className="space-y-4 grid grid-cols-2 gap-2">
			{galleries.map((gallery, index) => (
				<GalleryImage
					weddingId={weddingId}
					key={gallery.url}
					gallery={gallery}
					index={index}
					onDeletedAction={(w) => {
						setWedding({ wedding: w });
					}}
				/>
			))}
			<AddGalleryModal
				weddingId={weddingId}
				onAddAction={(wd) => {
					setWedding({ wedding: wd });
				}}
			/>
		</div>
	);
};

export default Gallery;
