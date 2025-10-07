import z from "zod";

export const videoSchema = z.object({
	url: z.string().url("URL video tidak valid").min(1, "URL video wajib diisi"),
	title: z.string().min(1, "Judul video wajib diisi"),
});

export const quoteSchema = z.object({
	title: z.string().min(1, "Judul quote wajib diisi"),
	defaultText: z.string().min(1, "Default text wajib diisi"),
	otherText: z.string().min(1, "Other text wajib diisi"),
	source: z.string().min(1, "Sumber wajib diisi"),
});
export const ucapanSchema = z.object({
	title: z.string().min(1, "Judul ucapan wajib diisi"),
	desc: z.string().min(1, "Deskripsi ucapan wajib diisi"),
});
export const paymentMethodSchema = z.object({
	name: z.string().min(1, "Nama metode pembayaran wajib diisi"),
	type: z.enum(["bank", "e-wallet"], "Tipe metode pembayaran tidak valid"),
	account: z.string().min(1, "Nomor rekening/akun wajib diisi"),
	holder: z.string().min(1, "Nama pemegang akun wajib diisi"),
});
