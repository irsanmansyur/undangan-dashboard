export const utilsString = {
	formatK(num: number): string {
		if (num < 1000) return num.toString();

		const k = num / 1000;

		// jika kelipatan ribuan bulat, tampilkan tanpa desimal
		if (Number.isInteger(k)) return `${k}k`;

		// batasi maksimal 2 desimal
		let str = k.toFixed(2);

		// hapus trailing zero dan titik jika perlu
		str = str.replace(/\.?0+$/, "");

		return `${str}k`;
	},

	toSlug(str: string): string {
		return str
			.toLowerCase() // jadi huruf kecil semua
			.normalize("NFD") // normalize unicode
			.replace(/[\u0300-\u036f]/g, "") // hapus tanda aksen
			.replace(/[^a-z0-9\s-]/g, "") // hapus karakter selain huruf, angka, spasi, strip
			.trim() // hapus spasi depan belakang
			.replace(/\s+/g, "-") // ganti spasi jadi "-"
			.replace(/-+/g, "-"); // hapus duplikat "-"
	},
	randomString(length: number): string {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
};
