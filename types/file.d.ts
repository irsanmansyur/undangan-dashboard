declare namespace FILE {
	type AUDIO = {
		id: string;
		refId: string;
		filename: string;
		fileType: string;
		mimeType: string;
		fileSize: number;
		status: string;
		createdAt: string;
		updatedAt: string;
	};

	type Gallery = {
		url: string;
		alt: string;
		caption?: string;
	};
}
