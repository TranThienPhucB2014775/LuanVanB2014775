import { NextResponse } from "next/server";

export async function middleware(req: any) {
	const { sessionToken } = req.cookies;
	const jwt = require("jsonwebtoken");

	const role = jwt.decode(sessionToken).scope || "GUEST";

	const roleRoutes = {
		LANDLORD: ["/profile", "/manage"],
		TENANT: ["/profile"],
		GUEST: ["/", "/login", "/register", "/about", "/contact", "/listing", "/listing/[id]"]
	};

	// @ts-ignore
	if (!roleRoutes[role]?.includes(pathname)) {
		return NextResponse.redirect(`${origin}/404`);
	}

	return NextResponse.next();
}


export const config = {
	matcher: ["/", "/login", "/register", "/about", "/contact", "/listing", "/listing/[id]", "/profile", "/manage"]
};
