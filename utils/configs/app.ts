export const AppConfig = {
	ApiUrl: process.env.API_URL || "http://localhost:8000",
	BackendUrl:
		process.env.NEXT_PUBLIC_BACKEND_URL ||
		"http://localhost:3001/backend/api/v1",
	FrontendUrl: process.env.NEXT_PUBLIC_FRONT_END_URL || "http://localhost:3002",
};
