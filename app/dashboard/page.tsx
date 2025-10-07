import { getProfile } from "./action";

export default async function DashboardPage() {
	const profile = await getProfile();
	return <div className="min-h-screen bg-base-200">Hello</div>;
}
