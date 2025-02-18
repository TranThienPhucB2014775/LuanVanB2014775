"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PageAnimate from "@/components/PageAnimate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = [
	{ value: "list-apartment", label: "Danh sách dãy trọ", href: "/manage" },
	{ value: "invoice", label: "Tổng hợp", href: "/manage/dashboard" },
	{ value: "tenant", label: "Người thuê", href: "/manage/tenant" },
	{ value: "push-notification", label: "Thông báo", href: "/manage/push-notification" }
];

function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const isManagePath = ["/manage", "/manage/dashboard", "/manage/tenant", "/manage/push-notification"].includes(pathname);

	const getDefaultValue = () => {
		if (pathname === "/manage" || pathname.startsWith("/manage/apartment")) return "list-apartment";
		if (pathname === "/manage/dashboard") return "invoice";
		if (pathname === "/manage/tenant") return "tenant";
		if (pathname === "/manage/push-notification") return "push-notification";
		return "list-apartment";
	};

	if (!isManagePath) {
		return children;
	}

	return (
		<PageAnimate>
			<div className="container my-8">
				<h1 className="text-2xl font-bold mb-6">Quản lý</h1>
				<Tabs defaultValue={getDefaultValue()} className="w-full">
					<TabsList className="grid w-full grid-cols-4 max-w-2xl mb-6">
						{tabItems.map((item) => (
							<TabsTrigger
								key={item.value}
								value={item.value}
								className={pathname === item.href ? "active" : ""}
								asChild
							>
								<Link href={item.href}>{item.label}</Link>
							</TabsTrigger>
						))}
					</TabsList>
					{children}
				</Tabs>
			</div>
		</PageAnimate>
	);
}

export default Layout;