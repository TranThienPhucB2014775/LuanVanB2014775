"use client";

import React, { useState } from "react";

import logo from "@/assets/img/transparent_2024-05-31T06-05-03.png";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/Instagram.png";
import youtube from "@/assets/icons/Youtube.png";
import Image from "next/image";

function Footer() {
	const [isOpenSupport, setIsOpenSupport] = useState(false);
	const [isOpenSupport2, setIsOpenSupport2] = useState(false);
	const [isOpenSupport3, setIsOpenSupport3] = useState(false);

	function handleOpenSupport() {
		setIsOpenSupport((prev) => !prev);
	}

	function handleOpenSupport2() {
		setIsOpenSupport2((prev) => !prev);
	}

	function handleOpenSupport3() {
		setIsOpenSupport3((prev) => !prev);
	}

	return (
		<footer className="bg-Neutral-w100 w-full">
			<div className="container mx-auto max-w-ct-max-width bg-neutral-W900 px-[12px] ">
				<div className="flex flex-col gap-[20px] lg:gap-0 lg:flex-row justify-between px-[24px] py-[74px] lg:px-0">
					<div className="lg:w-[270px] flex flex-col gap-[12px]">
						<div className="flex items-center gap-[16px]">
							<div className="inline-block border-[1px] rounded-[6px] border-solid border-Neutral-B100 h-[44px] w-[44px] ct-center bg-Neutral-N700">
								<Image
									src={logo}
									alt="logo"
									className="mx-auto my-[2px]"
									height={"80"}
									width={"80"}
								/>
							</div>
							<span className="font-extrabold leading-[1.2] text-[20px] tracking-[-1px] text-Neutral-N900">
								Ecommerce
							</span>
						</div>
						<span className="text-[14px] leading-[175%] font-normal text-Neutral-N500">
							DevCut is a YouTube channel for practical
							project-based learning.
						</span>
						<div className="flex flex-row gap-[24px]">
							<Image
								src={facebook}
								alt="facebook"
								className="h-[24px] w-[24px]"
								height={"24"}
								width={"24"}
							/>
							<Image
								src={instagram}
								alt="instagram"
								className="h-[24px] w-[24px]"
								height={"24"}
								width={"24"}
							/>
							<Image
								src={youtube}
								alt="youtube"
								className="h-[24px] w-[24px]"
								height={"24"}
								width={"24"}
							/>
						</div>
					</div>
					<div>
						<ul className="flex flex-col lg:flex-row lg:gap-[72px] text-[14px] font-medium leading-[175%] text-Neutral-B300">
							<li className="w-full transition-all ease-linear duration-300">
								<div
									className="flex justify-between"
									onClick={handleOpenSupport}
								>
									<span>Hỗ Trợ</span>
									{!isOpenSupport ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 12h14"
											/>
										</svg>
									)}
								</div>
								<ul
									className={`lg:mt-[40px] lg:block ${
										!isOpenSupport ? "hidden" : "block"
									} `}
								>
									<li>FAQ</li>
									<li>Điều Khoản Sử Dụng</li>
									<li>Chính Sách Bảo Mật</li>
								</ul>
							</li>
							<li className="w-full transition-all ease-linear duration-300">
								<div
									className="flex justify-between"
									onClick={handleOpenSupport2}
								>
									<span>Hỗ Trợ</span>
									{!isOpenSupport2 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 12h14"
											/>
										</svg>
									)}
								</div>
								<ul
									className={`lg:mt-[40px] lg:block ${
										!isOpenSupport2 ? "hidden" : "block"
									} `}
								>
									<li>FAQ</li>
									<li>Điều Khoản Sử Dụng</li>
									<li>Chính Sách Bảo Mật</li>
								</ul>
							</li>
							<li className="w-full transition-all ease-linear duration-300">
								<div
									className="flex justify-between"
									onClick={handleOpenSupport3}
								>
									<span>Hỗ Trợ</span>
									{!isOpenSupport3 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 lg:hidden"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 12h14"
											/>
										</svg>
									)}
								</div>
								<ul
									className={`lg:mt-[40px] lg:block ${
										!isOpenSupport3 ? "hidden" : "block"
									} `}
								>
									<li>FAQ</li>
									<li>Điều Khoản Sử Dụng</li>
									<li>Chính Sách Bảo Mật</li>
								</ul>
							</li>

							{/*<li>*/}
							{/*    <span>Chúng Tôi</span>*/}
							{/*    <ul className='mt-[40px]'>*/}
							{/*        <li>Về Chúng Tôi</li>*/}
							{/*        <li>Liên Hệ</li>*/}
							{/*    </ul>*/}
							{/*</li>*/}
							{/*<li>*/}
							{/*    <span>Cửa Hàng</span>*/}
							{/*    <ul className='mt-[40px]'>*/}
							{/*        <li>Chính Sách Vận Chuyển</li>*/}
							{/*        <li>Thanh Toán</li>*/}
							{/*        <li>Giỏ Hàng</li>*/}
							{/*    </ul>*/}
							{/*</li>*/}
						</ul>
					</div>
					<div>
						<span>Thanh Toán</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
