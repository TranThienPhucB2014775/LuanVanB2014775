"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import logoGoogle from "@/assets/images/Google.png";

function Layout({ children }: { children: React.ReactNode }) {
	const { user_id } = useParams();
	console.log(user_id);

	return (
		<div className="container py-10">
			<div className="mx-auto w-full max-w-3xl">
				<div className="grid grid-cols-1 justify-items-center gap-12">
					<nav>
						<ul className="flex flex-wrap justify-center gap-10">
							<Link href={`/user/${user_id}?page=1`}>
								<li className="font-semibold tracking-tight text-slate-800">
									Bài đăng
								</li>
							</Link>
							<Link href={`/user/${user_id}/about_me`}>
								<li className="font-semibold tracking-tight text-slate-800">
									Thông tin
								</li>
							</Link>
							<Link href={`/user/${user_id}/contact_me`}>
								<li className="font-semibold tracking-tight text-slate-800">
									Liên hệ
								</li>
							</Link>
						</ul>
					</nav>
					<div className="px-4">
						<div className="grid max-w-lg grid-cols-1 justify-items-center gap-8 mx-auto">
							<div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
								<Image
									src={logoGoogle}
									alt="Margaret Smith"
									className="object-cover"
									style={{
										position: "absolute",
										height: "100%",
										width: "100%",
										left: 0,
										top: 0,
										right: 0,
										bottom: 0,
										color: "transparent",
									}}
									width={160}
									height={160}
								/>
							</div>

							<div className="grid grid-cols-1 gap-2 text-center">
								<h1 className="font-sans font-semibold tracking-tighter text-slate-800 text-3xl md:text-4xl">
									Margaret Smith
								</h1>
								<p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
									Writer at The Daily Times spending all of my
									free time writing stories
								</p>
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
