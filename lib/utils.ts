import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function jwtPayload<T = { exp: number } & unknown>(token: string) {
	const tokenParts = token.split(".");
	if (tokenParts.length !== 3) {
		throw new Error("Invalid token format");
	}

	return JSON.parse(atob(tokenParts[1])) as T;
}

export function jwtExpiringSoon(exp: number, thresholdSeconds = 120): boolean {
	try {
		const expMs = exp * 1000;
		const now = Date.now();
		const thresholdMs = thresholdSeconds * 1000;
		return expMs <= now + thresholdMs;
	} catch {
		return true; // kalau gagal decode, anggap expired
	}
}
