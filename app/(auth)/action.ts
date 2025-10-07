"use server";

import { cookies, headers } from "next/headers";

export async function getAccessToken() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;
	return { accessToken, refreshToken };
}

export async function getPreviousPath(defaultPath = "/dashboard") {
	const headersList = await headers();
	const referer = headersList.get("referer");
	const currentPath = headersList.get("x-invoke-path") || "/";
	return referer || currentPath || defaultPath;
}
