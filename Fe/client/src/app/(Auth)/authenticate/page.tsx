"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAppContext } from "@/app/app-provider";
import authApiRequest from "@/apiRequests/auth";
import { loginResponse } from "@/dto/response";

const Page = () => {
	const { setUser } = useAppContext();
	const router = useRouter();

	useState(async () => {
		console.log(window.location.href);

		const authCodeRegex = /code=([^&]+)/;
		const isMatch = window.location.href.match(authCodeRegex);
		console.log(isMatch);

		if (isMatch) {
			const authCode = isMatch[1];

			const res = await authApiRequest.outbound(authCode);
			if (res.code === 0) {
				console.log(res?.payload?.result.token);
				setUser(res?.payload?.result.token ?? null);
			}

			// localStorage.setItem("token", (res?.payload as loginResponse).result.token);

			router.push("/");
		}
	});

	return (
		<>
			<Button disabled>
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				Đang xác thực...
			</Button>
		</>
	);
};

export default Page;
