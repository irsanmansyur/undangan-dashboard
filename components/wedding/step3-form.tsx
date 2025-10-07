import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePreview } from "./image-preview";

interface LoveStoryItem {
	year: string;
	title: string;
	desc: string;
	image?: File;
	existingImage?: string;
}

interface GalleryItem {
	file: File | null;
	caption: string;
	existingUrl?: string;
}

interface Step3FormProps {
	loveStories: LoveStoryItem[];
	setLoveStories: (stories: LoveStoryItem[]) => void;
	galleryPhotos: GalleryItem[];
	setGalleryPhotos: (photos: GalleryItem[]) => void;
	onSubmit: (e: React.FormEvent) => void;
	onBack: () => void;
	loading: boolean;
	error: { message?: string[] };
	isEdit?: boolean;
}

export function Step3Form({
	loveStories,
	setLoveStories,
	galleryPhotos,
	setGalleryPhotos,
	onSubmit,
	onBack,
	loading,
	error,
	isEdit = false,
}: Step3FormProps) {
	const addLoveStory = () => {
		setLoveStories([...loveStories, { year: "", title: "", desc: "" }]);
	};

	const removeLoveStory = (index: number) => {
		setLoveStories(loveStories.filter((_, i) => i !== index));
	};

	const updateLoveStory = (
		index: number,
		field: keyof LoveStoryItem,
		value: string | File,
	) => {
		const updated = [...loveStories];
		updated[index] = { ...updated[index], [field]: value };
		setLoveStories(updated);
	};

	const addGalleryPhoto = () => {
		setGalleryPhotos([...galleryPhotos, { file: null, caption: "" }]);
	};

	const removeGalleryPhoto = (index: number) => {
		setGalleryPhotos(galleryPhotos.filter((_, i) => i !== index));
	};

	const updateGalleryPhoto = (
		index: number,
		field: keyof GalleryItem,
		value: File | null | string,
	) => {
		const updated = [...galleryPhotos];
		updated[index] = { ...updated[index], [field]: value };
		setGalleryPhotos(updated);
	};

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			{/* Love Story Section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Love Story</h3>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addLoveStory}
					>
						<Plus className="h-4 w-4" /> Add Story
					</Button>
				</div>
				{loveStories.map((story, index) => (
					<div key={index} className="space-y-4 rounded-lg border p-4">
						<div className="flex items-center justify-between">
							<h4 className="font-medium">Story {index + 1}</h4>
							{loveStories.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeLoveStory(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Year</Label>
								<Input
									value={story.year}
									onChange={(e) =>
										updateLoveStory(index, "year", e.target.value)
									}
									placeholder="2020"
								/>
							</div>
							<div className="space-y-2">
								<Label>Title</Label>
								<Input
									value={story.title}
									onChange={(e) =>
										updateLoveStory(index, "title", e.target.value)
									}
									placeholder="First Meet"
								/>
							</div>
							<div className="col-span-2 space-y-2">
								<Label>Description</Label>
								<Input
									value={story.desc}
									onChange={(e) =>
										updateLoveStory(index, "desc", e.target.value)
									}
									placeholder="Our story begins..."
								/>
							</div>
							<div className="col-span-2 space-y-2">
								<Label>
									{isEdit ? "Replace Image (Optional)" : "Image (Optional)"}
								</Label>
								<ImagePreview
									existingUrl={story.existingImage}
									newFile={story.image}
								/>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) updateLoveStory(index, "image", file);
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Gallery Section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Photo Gallery</h3>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addGalleryPhoto}
					>
						<Plus className="h-4 w-4" /> Add Photo
					</Button>
				</div>
				{galleryPhotos.map((item, index) => (
					<div key={index} className="space-y-4 rounded-lg border p-4">
						<div className="flex items-center justify-between">
							<h4 className="font-medium">Photo {index + 1}</h4>
							{galleryPhotos.length > 1 && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeGalleryPhoto(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}
						</div>
						<div className="space-y-2">
							<Label>{isEdit ? "Replace Photo (Optional)" : "Photo"}</Label>
							<ImagePreview
								existingUrl={item.existingUrl}
								newFile={item.file || undefined}
							/>
							<Input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files?.[0];
									updateGalleryPhoto(index, "file", file || null);
								}}
							/>
						</div>
						<div className="space-y-2">
							<Label>Caption (Optional)</Label>
							<Input
								value={item.caption}
								onChange={(e) =>
									updateGalleryPhoto(index, "caption", e.target.value)
								}
								placeholder="Photo description"
							/>
						</div>
					</div>
				))}
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
					{loading ? (isEdit ? "Updating..." : "Saving...") : "Complete"}
				</Button>
			</div>
		</form>
	);
}
