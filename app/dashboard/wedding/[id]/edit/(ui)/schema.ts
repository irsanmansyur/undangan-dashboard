import z from "zod";

export const formSchemaUpdate2 = z.object({
	priaPhoto: z
		.instanceof(File)
		.optional()
		.refine((file) => !file || file.type.startsWith("image/"), {
			message: "File harus berupa gambar",
		}),
	wanitaPhoto: z
		.instanceof(File)
		.optional()
		.refine((file) => !file || file.type.startsWith("image/"), {
			message: "File harus berupa gambar",
		}),
	priaNamaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
	priaAnakKe: z.string(),
	priaNamaAyah: z.string(),
	priaNamaIbu: z.string(),
	priaInstagram: z.string().optional(),

	wanitaNamaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
	wanitaAnakKe: z.string(),
	wanitaNamaAyah: z.string(),
	wanitaNamaIbu: z.string(),
	wanitaInstagram: z.string().optional(),

	akadTanggal: z.string().min(1, "Tanggal akad wajib diisi"),
	akadWaktu: z.string().min(1, "Waktu akad wajib diisi"),
	akadAlamat: z.string().min(1, "Alamat akad wajib diisi"),
	akadTempat: z.string().min(1, "Tempat akad wajib diisi"),

	resepsiPria: z.boolean(),
	resepsiPriaTanggal: z.string().min(1, "Tanggal akad wajib diisi").optional(),
	resepsiPriaWaktu: z.string().min(1, "Waktu akad wajib diisi").optional(),
	resepsiPriaAlamat: z.string().min(1, "Alamat akad wajib diisi").optional(),
	resepsiPriaTempat: z.string().min(1, "Tempat akad wajib diisi").optional(),

	resepsiWanita: z.boolean(),
	resepsiWanitaTanggal: z.string().optional(),
	resepsiWanitaWaktu: z.string().min(1, "Waktu akad wajib diisi").optional(),
	resepsiWanitaAlamat: z.string().min(1, "Alamat akad wajib diisi").optional(),
	resepsiWanitaTempat: z.string().min(1, "Tempat akad wajib diisi").optional(),
});
// .superRefine((data, ctx) => {
// 	if (data.resepsiWanita) {
// 		if (!data.resepsiWanitaTanggal) {
// 			ctx.addIssue({
// 				path: ["resepsiWanitaTanggal"],
// 				code: "custom",
// 				message: "Tanggal resepsi wanita wajib diisi",
// 			});
// 		}
// 		if (!data.resepsiWanitaWaktu) {
// 			ctx.addIssue({
// 				path: ["resepsiWanitaWaktu"],
// 				code: "custom",
// 				message: "Waktu resepsi wanita wajib diisi",
// 			});
// 		}
// 		if (!data.resepsiWanitaAlamat) {
// 			ctx.addIssue({
// 				path: ["resepsiWanitaAlamat"],
// 				code: "custom",
// 				message: "Alamat resepsi wanita wajib diisi",
// 			});
// 		}
// 		if (!data.resepsiWanitaTempat) {
// 			ctx.addIssue({
// 				path: ["resepsiWanitaTempat"],
// 				code: "custom",
// 				message: "Tempat resepsi wanita wajib diisi",
// 			});
// 		}
// 	}
// });
export type FormSchemaUpdate2 = z.infer<typeof formSchemaUpdate2>;
