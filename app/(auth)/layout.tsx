import { redirect } from "next/navigation";
import { getAccessToken, getPreviousPath } from "./action";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { accessToken } = await getAccessToken();
	if (accessToken) redirect(await getPreviousPath("/dashboard"));
	return children;
}
