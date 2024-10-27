import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header2";
import Footer from "@/components/footer/Footetr2";
import PageAnimate from "@/components/PageAnimate";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

import AppProvider, { useAppContext } from "@/app/app-provider";
import { cookies } from "next/headers";
import { authApiRequest } from "@/apiRequests";
import SlideSession from "@/components/slideSession";
import 'rc-slider/assets/index.css';
import "@/assets/css/ custom-slider.css"
// import 'semantic-ui-css/semantic.min.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "RentRoomHub - Nền tảng kết nối người thuê và chủ nhà",
	description: "Nền tảng kết nối người thuê và chủ nhà."
};

export default async function RootLayout({
											 children
										 }: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = cookies();

	const introspect = async () => {
		const token = cookieStore.get("sessionToken")?.value ?? "";

		if (!token) return {
			isAuth: false,
			avatarUrl: ""
		};
		const res = await authApiRequest.info(token);
		if (res.code !== 0) {
			return {
				isAuth: false,
				avatarUrl: ""
			};
		}
		return {
			isAuth: true,
			avatarUrl: res.payload?.result.imgAvatar || ""
		};
	};

	const isAuth: {
		isAuth: boolean;
		avatarUrl: string;
	} = await introspect();

	return (
		<html lang="en">
		<head>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Karla:ital,wght@0,200..800;1,200..800&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prata&display=swap"
				rel="stylesheet"
			/>
		</head>
		<body>
		<AppProvider>
			<Toaster />
			<div className="font-font-inter">
				<Header />
				<PageAnimate>{children}</PageAnimate>
				<Footer />
			</div>
			<SlideSession
				isAuth={isAuth}
				token={cookieStore.get("sessionToken")?.value ?? ""}
			/>
		</AppProvider>
		</body>
		</html>
	);
}
