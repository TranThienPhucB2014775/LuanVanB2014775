"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User } from "lucide-react";
import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetTrigger
} from "@/components/ui/sheet";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import authApiRequest from "@/apiRequests/auth";
import { mediaLink } from "@/constants/media";
import logo from "@/assets/images/Logo.png";

interface NavItem {
	name: string;
	pathName: string;
	display: boolean;
}

const navItems: NavItem[] = [
	{ name: "Tin cho thuê", pathName: "/listings", display: true },
	{ name: "Tin tìm phòng ở", pathName: "/tenant-post", display: true },
	{ name: "Liên hệ", pathName: "/contact", display: true },
	{ name: "Quản lý", pathName: "/manage", display: true },
	{ name: "Người dùng", pathName: "/user", display: false },
	{ name: "Thông báo", pathName: "/notification", display: false },
	{ name: "Phòng của tôi", pathName: "/rental-rooms", display: false },
	{ name: "Loại phòng", pathName: "/room-type", display: false },
	{ name: "Chổ ở", pathName: "/apartment", display: false },
	{ name: "Lịch sử đánh giá", pathName: "/reviews", display: false },
	{ name: "Thông tin", pathName: "/profile", display: false },
	{ name: "Xác minh thông tin", pathName: "/verification", display: false },
	{ name: "Lời mời", pathName: "/invite", display: false },
	{ name: "Quản lý bài đăng cho thuê", pathName: "/manage-rental-post", display: false }
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
				className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

function Logo(): JSX.Element {
	return (
		<Link href="/" className="flex items-center space-x-2">
			<div className="rounded-full bg-Neutral-N900 w-[40px] h-[40px]">
				<Image src={logo} alt="Ecommerce logo" className="h-10 w-10" width={40} height={40} />
			</div>
			<span className="hidden font-bold text-xl sm:inline-block">RentRoomHub</span>
		</Link>
	);
}

interface NavItemsProps {
	items: NavItem[];
	currentPath: string;
	role: string;
}

function NavItems({ items, currentPath, role }: NavItemsProps): JSX.Element {
	return (
		<>
			{items.map((item) => {
				if (!item.display || (item.pathName === "/manage" && role !== "ROLE_LANDLORD")) return null;
				return (
					<Link
						key={item.pathName}
						href={item.pathName}
						className={`transition-colors hover:text-foreground/80 ${
							currentPath === item.pathName ? "text-foreground" : "text-foreground/60"
						}`}
					>
						{item.name}
					</Link>
				);
			})}
		</>
	);
}

interface UserMenuProps {
	isAuthenticated: boolean;
	avatarUrl: string;
	onLogout: () => Promise<void>;
}

function UserMenu({ isAuthenticated, avatarUrl, onLogout }: UserMenuProps): JSX.Element {
	if (isAuthenticated) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage src={`${mediaLink}/getImg/${avatarUrl}`} alt="User avatar" />
							<AvatarFallback>
								<User className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<MenuLink href="/profile">Thông tin</MenuLink>
						<MenuLink href="/verification">Xác minh thông tin</MenuLink>
						<MenuLink href="/notification">Thông báo</MenuLink>
						<MenuLink href="/invite">Lời mời</MenuLink>
						<MenuLink href="/rental-rooms">Phòng của tôi</MenuLink>
						<MenuLink href="/manage-rental-post">Quản lý tin cho thuê</MenuLink>
						<MenuLink href="/manage-tenant-post">Quản lý tin tìm phòng</MenuLink>
						<MenuLink href="/reviews">Lịch sử đánh giá</MenuLink>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={onLogout}>
						Đăng xuất
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}
	return (
		<>
			<Button variant="ghost" asChild className="hidden md:inline-flex">
				<Link href="/login">Đăng nhập</Link>
			</Button>
			<Button variant="default" asChild className="hidden md:inline-flex">
				<Link href="/register">Đăng ký</Link>
			</Button>
		</>
	);
}

interface MenuLinkProps {
	href: string;
	children: React.ReactNode;
}

function MenuLink({ href, children }: MenuLinkProps): JSX.Element {
	return (
		<DropdownMenuItem asChild>
			<Link href={href}>{children}</Link>
		</DropdownMenuItem>
	);
}

interface MobileMenuProps {
	items: NavItem[];
	currentPath: string;
	role: string;
}

function MobileMenu({ items, currentPath, role }: MobileMenuProps): JSX.Element {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="md:hidden" size="icon">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<nav className="flex flex-col space-y-4">
					<NavItems items={items} currentPath={currentPath} role={role} />
					<Link href="/login"
						  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80">
						Đăng nhập
					</Link>
					<Link href="/register"
						  className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80">
						Đăng ký
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}