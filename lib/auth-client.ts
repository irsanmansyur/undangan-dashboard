import { jwtPayload } from "./utils";

export const login = async (accessToken: string) => {
	const payload = jwtPayload(accessToken);
	await cookieStore.set({
		name: "accessToken",
		value: accessToken,
		expires: payload.exp * 1000,
		path: "/",
		sameSite: "lax",
	});
};
