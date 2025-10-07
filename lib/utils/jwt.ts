export function getPayload<T = { exp: number } & unknown>(token: string) {
	const tokenParts = token.split(".");
	if (tokenParts.length !== 3) {
		throw new Error("Invalid token format");
	}

	return JSON.parse(atob(tokenParts[1])) as T;
}

export function isTokenExpiringSoon(
	exp: number,
	thresholdSeconds = 120,
): boolean {
	try {
		const expMs = exp * 1000;
		const now = Date.now();
		const thresholdMs = thresholdSeconds * 1000;
		return expMs <= now + thresholdMs;
	} catch {
		return true; // kalau gagal decode, anggap expired
	}
}
