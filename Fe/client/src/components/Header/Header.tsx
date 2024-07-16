"use client";

import logo from "@/assets/img/transparent_2024-05-31T06-05-03.png";
import logout from "@/assets/icons/arrow-up-tray.png";
import userImg from "@/assets/icons/user-circle.png";
import React, { useEffect, useState } from "react";

import menu from "@/assets/icons/Menu.png";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/app/app-provider";
import { loginResponse } from "@/dto/response/login";
import { isClient } from "@/lib/http";
import authApiRequest from "@/apiRequests/auth";
import { usePathname } from "next/navigation";
import { infoResponse } from "@/dto/response";

function Header() {
	const jwt = require("jsonwebtoken");
	let token: string = "";
	let email: string = "";
	if (isClient()) {
		token = localStorage.getItem("token") ?? "";
		email = localStorage.getItem("email") ?? "";
	}
	const PRIVATE_KEY: string =
		"1TjXchw5FloESb63Kc+DFhTARvpWL4jUGCwfGWxuG5SIf/1y/LgJxHnMqaF6A/ij";

	useEffect(() => {
		async function introspect() {
			if (!token) return;
			const res = await authApiRequest.info(token);
			if (res.code !== 401) {
				setUser(token);
			} else {
				// await authApiRequest.logoutFromNextClientToNextServer(token);
			}
		}

		const interval = setInterval(async () => {
			token = localStorage.getItem("token") ?? "";
			if (!token) return;

			const decoded = jwt.decode(token, PRIVATE_KEY);

			const diffTime = decoded.exp * 1000 - new Date().getTime();
			if (diffTime / 86400000 < 1) {
				authApiRequest.refresh({ token }).then((res) => {
					token = (res.payload as loginResponse).result.token;
					localStorage.setItem(
						"token",
						(res.payload as loginResponse).result.token
					);
					authApiRequest
						.auth({
							sessionToken: (res.payload as loginResponse).result
								.token,
							expiresAt: "",
						})
						.then((res) => {
							console.log(res);
						});
				});
			}
		}, 1000 * 30);

		introspect();

		return () => clearInterval(interval);
	}, []);

	const [toggleMenu, setToggleMenu] = useState(false);
	const { isAuthenticated, setUser } = useAppContext();

	function handleToggleMenu() {
		setToggleMenu((prevState) => !prevState);
	}

	const pathName = usePathname();
	console.log(pathName === "/categories");

	return (
		<>
			<header>
				<div className="mx-auto max-w-ct-max-width bg-neutral-W900 px-[12px] relative">
					<div className="flex items-center justify-between h-[84px] gap-1">
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
						<ul
							className={`lg:flex lg:gap-[32px] z-10 min-w-[120px] lg:translate-y-0 lg:w-full ct-center
                                        flex-col lg:flex-row lg:static bg-white border-[1px] rounded-[6px] border-Neutral-N900
                                        gap-[20px] py-[10px] lg:border-0 after:transition-all after:ease-in-out after:duration-300
                                        absolute top-0 left-0 lg:translate-x-0 ${
											toggleMenu
												? ""
												: "translate-x-[-120%]"
										} `}
						>
							<li
								className={`ct-header-nav-item
									${pathName === "/categories" && "after:w-full"}
									`}
							>
								<Link href="categories">categories</Link>
							</li>
							<li
								className={`ct-header-nav-item
									${pathName === "/about" && "after:w-full"}
									`}
							>
								<Link href="about">about</Link>
							</li>
							<li
								className={`ct-header-nav-item
									${pathName === "/contact" && "after:w-full"}
									`}
							>
								<Link href="contact">contact</Link>
							</li>

							{isAuthenticated ? (
								<li className="ct-header-nav-item lg:hidden">
									<Link href="profile">Profile</Link>
								</li>
							) : (
								<li className="ct-header-nav-item lg:hidden">
									<Link href="login">Login</Link>
								</li>
							)}
							<li className="ct-header-nav-item lg:hidden">
								<Input placeholder="Search" />
							</li>
						</ul>
						{/*end nav*/}
						{/*start right header*/}
						<div className="lg:flex gap-[10px] items-center justify-center hidden">
							<div className="w-[264px] lg:mx-0 mx-[5px] inline-block">
								<Input
									placeholder="Search"
									className="relative"
								>
									{/*<img*/}
									{/*    srcSet={`${search} 2x`}*/}
									{/*    className="search-icon w-[18px] h-[18px]  absolute  top-1/2 translate-y-[-50%] translate-x-[15px]"*/}
									{/*    alt="Search"*/}
									{/*/>*/}
								</Input>
							</div>
							{/* {
                                info ? 
                            } */}
							{isAuthenticated ? (
								<>
									<Link href="/profile">
										<Image
											src={userImg}
											className="w-[35px] h-[30px]"
											alt="profile"
										/>
									</Link>
									<Link href="/profile">
										<Image
											src={logout}
											className="w-[35px] h-[30px] rotate-90"
											alt="profile"
										/>
									</Link>
								</>
							) : (
								<div>
									<Link
										href="login"
										className="ct-header-nav-item"
									>
										Login
									</Link>
								</div>
							)}
							{/*<div>*/}
							{/*    <span>*/}
							{/*      <Link href="login" className="ct-header-nav-item">*/}
							{/*        Login*/}
							{/*      </Link>*/}
							{/*    </span>*/}
							{/*</div>*/}
							{/*<Image src={user} className="w-[25px] h-[25px]" alt="profile"/>*/}
						</div>

						<div className="lg:hidden" onClick={handleToggleMenu}>
							<Image
								src={menu}
								alt={"menu"}
								className="h-[24px] w-[24px]"
								height={"24"}
								width={"24"}
							/>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
