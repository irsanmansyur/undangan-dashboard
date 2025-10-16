declare namespace APP {
	type Sort<T = string> = {
		column: T;
		direction?: "asc" | "desc";
	};
	type Layout<T = Record<string, string>> = Readonly<{
		children: React.ReactNode;
		params: Promise<T>;
	}>;
	type Page<T = Record<string, string>> = Readonly<{
		params: Promise<T>;
	}>;
	type ApiBaseResponse = {
		message: string;
	};
	type ApiErrorResponse = ApiBaseResponse;
	type ApiResponse<T> = ApiBaseResponse & {
		data: T;
	};
	type ApiMeta = {
		meta: {
			limit: number;
			page: number;
			total: number;
			totalPages: number;
		};
	};
	type ApiPaginatedResponse<T> = ApiBaseResponse &
		ApiMeta & {
			data: T[];
		};
	type ApiErrorsValidateResponse = ApiBaseResponse & {
		errors: {
			message?: string;
			[key: string]: string[];
		};
	};
}

declare namespace WEDDING {
	type STEP = 1 | 2 | 3 | 4;
	interface PaymentMethod {
		name: string;
		type: "bank" | "e-wallet";
		account: string;
		holder: string;
	}
	interface VideoInfo {
		url: string;
		title: string;
	}
	interface Ucapan {
		title: string;
		desc: string;
	}
	interface WeddingAcara {
		akadNikah: EventInfo;
		resepsiPria?: EventInfo;
		resepsiWanita?: EventInfo;
	}
	interface WeddingMempelai {
		groom: PersonInfo;
		bride: PersonInfo;
	}
	interface WeddingFirstStep {
		templateId: string;
		coverPhoto: File | string;
		backgroundMusic?: string;
	}
	type UcapanData = {
		nama: string;
		ucapan: string;
		createdAt: string;
		isAnonymous: boolean;
		hadir: boolean;
	};
	type Collection = {
		id: string;
		slug: string;
		templateId: string;
		templateName: string;
		createdAt: string;
		updatedAt: string;
		coverPhoto: string;
		coverPhotoUrl: string;
		mempelai: WeddingMempelai;
		acara: WeddingAcara;
		quotes: Quote[];
		loveStory: WEDDING.LoveStory[];
		gallery: GalleryItem[];
		paymentMethods: PaymentMethod[];
		video?: VideoInfo;
		backgroundMusic?: string;
		ucapan: Ucapan;
		ucapanPenutup?: Ucapan;
	};
	interface GalleryItem {
		url: string;
		alt: string;
		caption?: string;
	}
	interface PersonInfo {
		namaLengkap: string;
		anakKe: string;
		namaAyah: string;
		namaIbu: string;
		instagram?: string;
		photoUrl: string;
	}
	interface EventInfo {
		tanggal: string;
		waktu: string;
		alamat: string;
		tempat: string;
	}

	interface Quote {
		title: string;
		defaultText: string;
		otherText: string;
		source: string;
	}
	type LoveStory = {
		id: string;
		image: string;
		title: string;
		year: string;
		desc: string;
	};
}

declare namespace DASHBOARD {
	type Breadcrumb = { label: string; href?: string };
	type User = {
		email: string;
		exp: number;
		iat: number;
		name: string;
		role: "admin" | "user";
		status: string;
		sub: string;
	};
}
