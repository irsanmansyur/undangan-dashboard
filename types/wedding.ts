export interface PersonInfo {
	namaLengkap: string;
	anakKe: string;
	namaAyah: string;
	namaIbu: string;
	instagram?: string;
	photoUrl: string;
}

export interface EventInfo {
	tanggal: string;
	waktu: string;
	alamat: string;
	tempat: string;
}

export interface Quote {
	title: string;
	defaultText: string;
	otherText: string;
	source: string;
}

export interface LoveStory {
	image?: string;
	year: string;
	title: string;
	desc: string;
}

export interface GalleryItem {
	url: string;
	alt: string;
	caption?: string;
}

export interface PaymentMethod {
	name: string;
	type: "bank" | "e-wallet";
	account: string;
	holder: string;
}

export interface VideoInfo {
	url: string;
	title: string;
}

export interface Ucapan {
	title: string;
	desc: string;
}

export interface UcapanData {
	nama: string;
	ucapan: string;
	createdAt: string;
	isAnonymous: boolean;
	hadir: boolean;
}

export interface UndanganUntuk {
	nama: string;
	alamat?: string;
}

// Step 1: First form
export interface WeddingFirstStep {
	templateId: string;
	coverPhoto: File | string;
	backgroundMusic?: string;
}

// Step 2: Mempelai
export interface WeddingMempelai {
	groom: PersonInfo;
	bride: PersonInfo;
}

// Step 3: Acara
export interface WeddingAcara {
	akadNikah: EventInfo;
	resepsiPria?: EventInfo;
	resepsiWanita?: EventInfo;
}

// Full wedding collection
export interface WeddingCollection {
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
}

export interface WeddingResponse {
	data: WeddingCollection[];
}
