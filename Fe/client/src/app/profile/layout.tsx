"use client";

import React, { useState } from "react";
import PageAnimate from "@/components/PageAnimate";
import Image from "next/image";
import home from "@/assets/icons/home.png";
import { useRouter } from "next/navigation";

type typeSidebar = {
	name: string;
	route: string;
};

const sideBarItemsValue: typeSidebar[] = [
	{ name: "Thông Tin", route: "" },
	{ name: "Cho Thuê", route: "/order" },
	{ name: "Tìm Phòng", route: "./find" },
	{ name: "Yêu thích", route: "./favorite" },
	{ name: "Liên Hệ", route: "./contact" },
];

function Layout({ children }: { children: React.ReactNode }) {
	const [sidebarItem, setSidebarItem] = useState(sideBarItemsValue[0]);
	const route = useRouter();

	function handleChangSideBarItem(Sidebar: typeSidebar) {
		setSidebarItem(Sidebar);
		// route.push(Sidebar.route)
	}

	return (
		<PageAnimate>
			<div className="container my-[64px]">
				<div className="flex flex-col lg:flex-row gap-[36px]">
					<div className="flex flex-row lg:flex-col gap-[16px] w-full lg:min-w-0 lg:w-[250px] mt-[60px] overflow-x-auto whitespace-nowrap">
						{sideBarItemsValue.map((item) => {
							return (
								<div
									key={item.name}
									className={`px-[24px] py-[8px] hover:bg-Neutral-w100  w-full rounded-[8px] border-solid flex items-center gap-[10px] ${
										sidebarItem.name === item.name
											? "bg-Neutral-w100"
											: undefined
									}`}
									onClick={() => handleChangSideBarItem(item)}
								>
									<Image
										src={home}
										alt="home"
										className=" w-[24px] h-[24px] inline-block"
									/>
									<span className="ct-text-primary mr-[6px] block">
										{item.name}
									</span>
								</div>
							);
						})}
						<div className="px-[24px] py-[8px] hover:bg-Neutral-w100  w-full rounded-[8px] border-solid flex items-center gap-[10px]">
							<Image
								src={home}
								alt="home"
								className=" w-[24px] h-[24px] inline-block"
							/>
							<span className="ct-text-primary mr-[6px] block">
								Đăng suất
							</span>
						</div>
					</div>
					<div className="w-[1px] bg-Neutral-W200"></div>
					<div className="w-full ct-center flex-col">
						<span className="text-[20px] hidden lg:block font-semibold">
							{sidebarItem.name}
						</span>
						<div className="mt-[30px]">{children}</div>
					</div>
				</div>
			</div>
		</PageAnimate>
	);
}

export default Layout;
