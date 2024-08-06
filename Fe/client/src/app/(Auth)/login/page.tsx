import React from "react";
import Button from "@/components/Button";
import Image from "next/image";

import FormLogin from "./form-login";

import logoGoogle from "@/assets/images/Google.png";
import Link from "next/link";

export default function Page() {
	const callbackUrl = process.env.NEXT_SECRET_URI;
	const authUrl = process.env.NEXT_AUTH_URI;
	const googleClientId = process.env.NEXT_CLIENT_ID;

	const targetUrl = `${authUrl}?redirect_uri=${callbackUrl}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

	console.log(targetUrl);
	// redirect(targetUrl);

	return (
		<div className="w-full h-[560px] bg-white ct-center">
			<div className="w-[320px]">
				<div className="w-full bg-white">
					<a href={targetUrl}>
						<Button claesses="border-[1px] border-solid border-Neutral-B500 flex flex-row gap-[5px]">
							<Image
								src={logoGoogle}
								width={24}
								height={24}
								alt="Google"
							/>
							<span className="capitalize">
								Đăng nhập với tài khoản Google
							</span>
						</Button>
					</a>
					<div className="mt-[32px] relative w-full after:absolute after:top-1/2 after:left-0 after:w-full after:h-[1px] after:bg-black ct-center">
						<span className="text-center relative bg-white z-10 px-[5px] ">
							Or
						</span>
					</div>
				</div>
				<FormLogin />
			</div>
		</div>
	);
}
