"use client";

import React from "react";
import PageAnimate from "@/components/PageAnimate";
import { useAppContext } from "@/app/app-provider";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";

function Layout({ children }: { children: React.ReactNode }) {

	const { role } = useAppContext();

	return (
		<PageAnimate>
			{
				role !== "ROLE_LANDLORD"
					? <NotFound />
					: children
			}
		</PageAnimate>
	);
}

export default Layout;