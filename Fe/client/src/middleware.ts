import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const sessionToken = req.cookies.get("sessionToken")?.value;
	const { pathname, origin } = req.nextUrl;

	const jwt = require("jsonwebtoken");

	const role: string = sessionToken ? (jwt.decode(sessionToken) as { scope?: string }).scope || "GUEST" : "GUEST";

	const commonRoutes: RegExp[] = [
		/^\//, /^\/contact/, /^\/profile/, /^\/reviews/,
		/^\/rental-rooms/, /^\/verification/,
		/^\/notification/, /^\/user/, /^\/apartment/,
		/^\/listings/, /^\/manage-rental-post/,/^\/tenant-post/
	];

	const roleRoutes: Record<string, RegExp[]> = {
		ROLE_LANDLORD: [...commonRoutes, /\/manage/],
		ROLE_ADMIN: [...commonRoutes, /\/manage/],
		ROLE_TENANT: [...commonRoutes],
		GUEST: []
	};

	const isAllowed = roleRoutes[role]?.some(route => route.test(pathname));

	if (!isAllowed && pathname !== "/404") {
		return NextResponse.redirect(`${origin}/404`);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/profile",
		"/apartment/:path*",
		"/roomType/:path*",
		"/room/:path*",
		"/manage/:path*",
		"/user/:path*",
		"/reviews/:path*",
		"/listings/createRentalPost",
		"/manage-rental-post",
		"/tenantPost/createTenantPost",
	]
};
