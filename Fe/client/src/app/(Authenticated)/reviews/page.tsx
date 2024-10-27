import React from "react";
import Reviews from "@/components/feedBack/Reviews";
import { cookies } from "next/headers";

function Page() {

	const cookieStore = cookies();
	const jwt = require("jsonwebtoken");
	const decoded = jwt.decode(cookieStore.get("sessionToken")?.value ?? "");

	return (
		<div className="container">
			<h1 className="text-3xl font-bold text-center pt-8">Lịch sử đánh giá</h1>
			<Reviews itemId={""} userId={decoded.sub} isView={true} />
		</div>
	)
		;
}

export default Page;