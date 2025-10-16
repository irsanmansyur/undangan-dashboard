import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export type ImageInputProps = {
	initialSrc?: string; // initial image URL (optional)
	defaultSrc?: string; // fallback when nothing provided or on error
	alt?: string;
	className?: string; // wrapper styling
	imgClassName?: string; // img styling
	onFileChange?: (file: File | null) => void; // callback when file chosen or cleared
};

export default function ImageInput({
	initialSrc,
	defaultSrc = "/no-image.png",
	alt = "image",
	className = "w-full h-full rounded-xl overflow-hidden border border-gray-200 relative cursor-pointer",
	imgClassName = "w-full h-full object-cover",
	onFileChange,
}: ImageInputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [src, setSrc] = useState<string | undefined>(initialSrc || defaultSrc);
	const [objectUrl, setObjectUrl] = useState<string | null>(null);

	// cleanup object URL on unmount / when changed
	useEffect(() => {
		return () => {
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [objectUrl]);

	useEffect(() => {
		// if parent changes initialSrc, reflect it
		if (initialSrc) {
			setSrc(initialSrc);
		}
	}, [initialSrc]);

	function openFilePicker() {
		inputRef.current?.click();
	}

	function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) {
			onFileChange?.(null);
			return;
		}

		const url = URL.createObjectURL(file);
		// revoke previous object url
		if (objectUrl) URL.revokeObjectURL(objectUrl);
		setObjectUrl(url);
		setSrc(url);
		onFileChange?.(file);
	}

	function onImageError() {
		// if failed to load, fall back to defaultSrc
		if (src !== defaultSrc) setSrc(defaultSrc);
	}

	function clearToDefault(e?: React.MouseEvent) {
		e?.stopPropagation();
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			setObjectUrl(null);
		}
		setSrc(defaultSrc);
		// clear file input value so the same file can be reselected later
		if (inputRef.current) inputRef.current.value = "";
		onFileChange?.(null);
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openFilePicker();
		}
	}

	return (
		<button
			className={className}
			onClick={openFilePicker}
			onKeyDown={onKeyDown}
			type="button"
		>
			<Image
				width={200}
				height={200}
				src={src as string}
				alt={alt}
				className={imgClassName}
				onError={onImageError}
			/>

			{/* overlay on hover */}
			<div className="absolute inset-0 flex items-end justify-between p-2 bg-black/0 hover:bg-black/20 transition">
				<div className="text-xs text-white opacity-0 hover:opacity-100 transition">
					Klik untuk ganti
				</div>
				<button
					type="button"
					onClick={clearToDefault}
					className="bg-white/80 text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition"
					aria-label="Reset to default image"
				>
					Reset
				</button>
			</div>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={onFileSelected}
			/>
		</button>
	);
}
