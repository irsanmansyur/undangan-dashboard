import { useCallback, useEffect, useMemo, useState } from "react";

type FetchState<T> = {
	loading: boolean;
	resp: T | null;
	errors: string | null;
};

export function useFetch<T = unknown>() {
	const [state, setState] = useState<FetchState<T>>({
		loading: false,
		resp: null,
		errors: null,
	});

	const fetchData = useCallback(async (url: string, options?: RequestInit) => {
		setState({ loading: true, resp: null, errors: null });
		let headers: HeadersInit = options?.headers || {};
		// kalau body bukan FormData → pastikan ada content-type JSON
		if (!(options?.body instanceof FormData)) {
			headers = {
				"Content-Type": "application/json",
				...headers,
			};
		}
		try {
			const res = await fetch(url, {
				...options,
				headers,
			});

			if (!res.ok) {
				throw new Error(`Request gagal (${res.status})`);
			}
			const data = (await res.json()) as T;
			setState({ loading: false, resp: data, errors: null });
			return data;
		} catch (err: unknown) {
			let message = "Unknown error";
			if (err instanceof Error) {
				message = err.message;
			}
			setState({
				loading: false,
				resp: null,
				errors: message,
			});
			return null;
		}
	}, []);

	return {
		...state,
		fetchData,
	};
}

export const useFetcNow = <T = unknown>(
	url: string,
	options?: RequestInit,
	delay = 500, // default 500ms
) => {
	const { loading, resp, fetchData } = useFetch<T>();
	const urlOri = useMemo(() => url, [url]);
	const opt = useMemo(() => options, [options]);

	useEffect(() => {
		if (!urlOri) return;
		const handler = setTimeout(() => {
			fetchData(urlOri, opt);
		}, delay);

		return () => clearTimeout(handler);
	}, [urlOri, opt, delay, fetchData]);
	return { loading, resp };
};
