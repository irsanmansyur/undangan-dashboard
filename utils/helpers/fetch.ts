import { HttpException } from "../exceptions/http-exception";
import { ValidateException } from "../exceptions/validate-exception";

export async function fetcher<T = unknown, B = unknown>(
	url: string,
	options?: RequestInit,
) {
	return fetch(url, options)
		.then(async (response) => {
			if (!response.ok) {
				return response.json().then((data) => {
					if (response.status === 422) {
						throw new ValidateException(data as APP.ApiErrorsValidateResponse);
					}
					throw new HttpException(data, response.status);
				});
			}
			const res = await response.json();
			return {
				...res,
				statusCode: response.status,
			} as unknown as APP.ApiResponse<T> & { statusCode: number } & B;
		})
		.catch(async (e) => {
			if (e?.status === 401) {
				if (typeof window !== "undefined") {
					const redirectTo = window.location.pathname + window.location.search;
					window.location.href = `/login?redirectTo=${redirectTo}`;
				}
			}
			if (e instanceof HttpException || e instanceof ValidateException) {
				throw e;
			}
			throw new HttpException({
				message: e.message || "An unexpected error occurred",
			});
		});
}

export function normalizeHeaders(
	headers?: HeadersInit,
): Record<string, string> {
	let normalized: Record<string, string>;

	if (!headers) {
		normalized = {};
	} else if (headers instanceof Headers) {
		normalized = Object.fromEntries(headers.entries());
	} else if (Array.isArray(headers)) {
		normalized = Object.fromEntries(headers);
	} else {
		normalized = { ...headers }; // sudah Record<string,string>
	}

	return normalized;
}

export function getBaseUrl() {
	if (typeof window !== "undefined") {
		return window?.location.origin;
	}

	// Server-side: pakai environment variable atau default localhost
	return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
