import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AppConfig } from "./utils/configs/app";

const protectedPaths = ["/dashboard", "/profile", "/settings"];
export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	if (pathname.startsWith("/backend")) {
		return proxyRequest(pathname);
	}

	const isProtectedPath = protectedPaths.some((path) =>
		pathname.startsWith(path),
	);
	// Check for authentication token in cookies
	const authToken = request.cookies.get("accessToken")?.value;

	// If no auth token, redirect to login with return URL
	if (isProtectedPath && !authToken) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("from", request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Allow authenticated users to proceed
	return NextResponse.next();
}

function proxyRequest(pathname: string) {
	const nextPath = pathname.replace("/backend", "");
	const rewriteUrl = new URL(AppConfig.ApiUrl + nextPath);
	return NextResponse.rewrite(rewriteUrl);
}

// Configure matcher to only run on dashboard routes
export const config = {
	matcher: ["/backend/:path*", "/dashboard/:path*", "/login"],
};
