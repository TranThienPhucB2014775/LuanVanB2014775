"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import authApiRequest from "@/apiRequests/auth";
import { UserMenu } from "@/components/Header/UserMenu";
import { NavItems } from "@/components/Header/NavItems";
import { Logo } from "@/components/Header/Logo";
import { MobileMenu } from "@/components/Header/MobileMenu";

interface NavItem {
	name: string;
	pathName: string;
	display: boolean;
}

const navItems: NavItem[] = [
	{ name: "Tin cho thuê", pathName: "/listings", display: true },
	{ name: "Tin tìm phòng ở", pathName: "/tenant-post", display: true },
	{ name: "Liên hệ", pathName: "/contact", display: true },
	{ name: "Quản lý dãy trọ", pathName: "/manage", display: true },
	{ name: "Người dùng", pathName: "/user", display: false },
	{ name: "Thông báo", pathName: "/notification", display: false },
	{ name: "Phòng của tôi", pathName: "/rental-rooms", display: false },
	{ name: "Loại phòng", pathName: "/room-type", display: false },
	{ name: "Chổ ở", pathName: "/apartment", display: false },
	{ name: "Lịch sử đánh giá", pathName: "/reviews", display: false },
	{ name: "Thông tin", pathName: "/profile", display: false },
	{ name: "Xác minh thông tin", pathName: "/verification", display: false },
	{ name: "Lời mời", pathName: "/invite", display: false },
	{ name: "Quản lý tin cho thuê", pathName: "/manage-rental-post", display: false },
	{ name: "Quản lý tin tìm phòng", pathName: "/manage-tenant-post", display: false },
];

export default function Header(): JSX.Element {
	const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
	const { isAuthenticated, setUser, role, avatarUrl } = useAppContext();
	const router = useRouter();
	const pathName = usePathname();

	const handleLogout = async (): Promise<void> => {
		const token = localStorage.getItem("token") || "";
		await authApiRequest.logoutFromNextClientToNextServer(token);
		localStorage.removeItem("token");
		setUser("", "");
		router.push("/");
	};

	const parts = pathName.split("/");
	const basePath = `/${parts[1]}`;
	const breadCrumbName = navItems.find((item) => item.pathName === basePath);

	return (
		<>
			<header
				className=" top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between">
					<Logo />
					<nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
						<NavItems items={navItems} currentPath={pathName} role={role || "ROLE_TENANT"} />
					</nav>
					<div className="flex items-center space-x-4">
						<UserMenu isAuthenticated={isAuthenticated}
								  avatarUrl={avatarUrl || "@/assets/img/Logo.png"}
								  onLogout={handleLogout}
						/>
						<MobileMenu items={navItems} currentPath={pathName} role={role || "ROLE_TENANT"} />
					</div>
				</div>
			</header>
			{pathName !== "/" && (
				<BreadCrumb routeName={breadCrumbName?.name || ""} value={breadCrumbName?.pathName || ""} />
			)}
		</>
	);
}
