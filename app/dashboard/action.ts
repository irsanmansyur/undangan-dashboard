"use server";
import { cookies } from "next/headers";
import { getPayload } from "~/lib/utils/jwt";

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete("accessToken");
};

export const getProfile = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value as string;
	const user = getPayload(accessToken);
	return user as DASHBOARD.User;
};
