import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/Logo.png";
import React from "react";

export function Logo(): JSX.Element {
	return (
		<Link href="/" className="flex items-center space-x-2">
			<div className="rounded-full bg-Neutral-N900 w-[40px] h-[40px]">
				<Image src={logo} alt="Ecommerce logo" className="h-10 w-10" width={40} height={40} />
			</div>
			<span className="hidden font-bold text-xl sm:inline-block">RentRoomHub</span>
		</Link>
	);
}