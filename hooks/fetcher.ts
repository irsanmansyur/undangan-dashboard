import { useCallback, useEffect, useMemo, useState } from "react";
import { HttpException } from "~/utils/exceptions/http-exception";
import { ValidateException } from "~/utils/exceptions/validate-exception";
import { normalizeHeaders } from "~/utils/helpers/fetch";

export const useFetcher = <T = unknown, B = unknown>() => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<
		| (APP.ApiBaseResponse & {
				data: T;
		  } & B)
		| null
	>(null);
	const [error, setError] = useState<Record<string, string[]>>({});

	const exec = useCallback(async (url: string, options: RequestInit = {}) => {
		setLoading(true);
		setError({});

		const headers: Record<string, string> = normalizeHeaders(options.headers);

		try {
			let body = options.body;

			// auto set Content-Type JSON kalau body bukan FormData/Blob
			if (body && !(body instanceof FormData) && !(body instanceof Blob)) {
				if (
					!Object.keys(headers).some((k) => k.toLowerCase() === "content-type")
				) {
					headers["Content-Type"] = "application/json";
				}
				body = JSON.stringify(body);
			}

			const res = await fetch(url, { ...options, headers, body });

			if (!res.ok) {
				throw new HttpException({ message: res.statusText }, res.status);
			}

			const contentType = res.headers.get("content-type") ?? "";
			let responseData: unknown;

			if (contentType.includes("application/json")) {
				responseData = await res.json();
			} else if (contentType.includes("text/")) {
				responseData = await res.text();
			} else {
				responseData = await res.blob();
			}
			setData(responseData as unknown as APP.ApiBaseResponse & { data: T } & B);
			return responseData as T;
		} catch (e: unknown) {
			if (e instanceof ValidateException) {
				setError(e.response.errors);
			} else if (e instanceof HttpException) {
				setError({ message: [e.message] });
			} else if (e instanceof Error) {
				setError({ message: [e.message] });
			} else {
				setError({ message: ["Unknown error"] });
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const newFetch = async (url: string, opt: RequestInit) => {
		setLoading(true);
		setError({});
		return fetch(url, opt)
			.then((res) => {
				if (!res.ok) {
					throw new HttpException({ message: res.statusText }, res.status);
				}
				return res.json();
			})
			.then((responseData) => {
				setData(responseData.data);
				return responseData.data as T;
			})
			.catch((e) => {
				if (e instanceof ValidateException) {
					setError(e.response.errors);
				} else if (e instanceof HttpException) {
					setError({ message: [e.message] });
				} else {
					setError({ message: [e?.message ?? "Unknown error"] });
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return {
		exec,
		loading,
		data,
		error,
		request: newFetch,
	};
};

export const useFetcherNow = <T, B = unknown>(
	url: string,
	options?: RequestInit,
	delay = 500, // default 500ms
) => {
	const { exec, loading, data } = useFetcher<T, B>();

	const urlOri = useMemo(() => url, [url]);
	const opt = useMemo(() => options, [options]);

	useEffect(() => {
		if (!urlOri) return;
		const handler = setTimeout(() => {
			exec(urlOri, opt);
		}, delay);

		return () => clearTimeout(handler);
	}, [urlOri, opt, delay, exec]);

	return { loading, data };
};
