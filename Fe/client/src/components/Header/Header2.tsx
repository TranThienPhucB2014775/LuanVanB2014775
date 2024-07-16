"use client";

import { useAppContext } from "@/app/app-provider";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/assets/img/transparent_2024-05-31T06-05-03.png";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { isClient } from "@/lib/http";
import authApiRequest from "@/apiRequests/auth";
import { loginResponse } from "@/dto/response";
import { useFetch } from "@/useFetch";
import { loginRequest } from "@/dto/request";
import { ApiResponse } from "@/dto/ApiResponse";
import {remove} from "@jridgewell/set-array";

const navItems = [
	{
		name: "Cho thuê",
		pathName: "/listings",
	},
	{
		name: "Tìm trọ",
		pathName: "/housing-wanted",
	},
	{
		name: "Về chúng tôi",
		pathName: "/about",
	},
	{
		name: "Liên hệ",
		pathName: "/contact",
	},
];

function Header() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

	const toggleNavbar = () => {
		setIsNavbarOpen(!isNavbarOpen);
	};

	const { isAuthenticated, setUser } = useAppContext();

	const pathName = usePathname();

	async function handleLogout() {
        const token = localStorage.getItem("token") || "";
        await authApiRequest.logoutFromNextClientToNextServer(token)
        localStorage.removeItem("token");
        setUser("");
	}

	return (
		<header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
			<nav
				className="max-w-ct-max-width w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
				aria-label="Global"
			>
				<Link href="/">
					<div
						className="flex items-center
                                justify-center flex-row gap-[12px] "
					>
						<div className="rounded-full bg-Neutral-N900 w-[40px] h-[40px]">
							<Image
								src={logo}
								alt="logo"
								className=" mx-auto"
								height={80}
								width={80}
							/>
						</div>
						<span className="font-font-Manrope font-extrabold text-[20px] tracking-[-.7px] text-Neutral-B900 leading-normal">
							Ecommerce
						</span>
					</div>
				</Link>
				<div className="md:order-3 flex items-center gap-x-2">
					<button
						type="button"
						className="md:hidden p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						onClick={toggleNavbar}
						aria-controls="navbar-alignment"
						aria-expanded={isNavbarOpen}
						aria-label="Toggle navigation"
					>
						<svg
							className={`${
								isNavbarOpen ? "hidden" : "block"
							} flex-shrink-0 size-4`}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="3" x2="21" y1="6" y2="6" />
							<line x1="3" x2="21" y1="12" y2="12" />
							<line x1="3" x2="21" y1="18" y2="18" />
						</svg>
						<svg
							className={`${
								isNavbarOpen ? "block" : "hidden"
							} flex-shrink-0 size-4`}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
					{isAuthenticated ? (
						<>
							<Link href="profile">
								<Button variant="outline">Thông tin</Button>
							</Link>
							<Button
								variant="destructive"
								onClick={handleLogout}
							>
								Đăng suất
							</Button>
						</>
					) : (
						<>
							<Link href="login">
								<Button variant="outline">Đăng nhập</Button>
							</Link>
							<Link href="register">
								<Button variant="outline">Đăng Kí</Button>
							</Link>
						</>
					)}
					<div className="w-full max-w-48 hidden lg:flex items-center ">
						<Input type="email" placeholder="Email" />
						<Button type="submit">Tìm</Button>
					</div>
				</div>
				<div
					id="navbar-alignment"
					className={`${
						isNavbarOpen ? "block" : "hidden"
					} hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:grow-0 md:basis-auto md:block md:order-2`}
				>
					<div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:mt-0 md:ps-5">
						{navItems.map((item) => (
							<Link key={item.pathName} href={item.pathName}>
								<div
									className={`ct-header-nav-item
									${pathName === item.pathName && "ct-header-nav-item-active"}
									`}
								>
									{item.name}
								</div>
							</Link>
						))}
						<div className="w-full max-w-48 items-center flex md:hidden">
							<Input type="email" placeholder="Email" />
							<Button type="submit">Tìm</Button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;
