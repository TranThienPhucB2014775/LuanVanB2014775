"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListTenant from "@/components/manage/room/ListTenant";
import { CalendarDays, CircleAlert, FileText, Phone, Users } from "lucide-react";
import InventionPage from "@/components/manage/room/InventionPage";
import InvoicePage from "@/components/rental/InvoicePage";
import ReportIssuePage from "@/components/rental/reportIssue/ReportIssuePage";

const tabs = [
	{
		route: "",
		label: "Đang thuê",
		icon: <Users className="w-4 h-4 text-black "/>
	},
	{
		route: "history",
		label: "Đã thuê",
		icon: <CalendarDays className="w-4 h-4 text-yellow-400"/>
	},
	{
		route: "bills",
		label: "Hóa đơn",
		icon: <FileText className="w-4 h-4 text-black"/>
	},
	{
		route: "invitations",
		label: "Lời mời",
		icon: <Users className="w-4 h-4 text-yellow-400"/>
	},
	{
		route: "report",
		label: "Liên hệ",
		icon: <Phone className="w-4 h-4 text-black"/>
	}
];


function RoomPage({
					  roomId,
					  children
				  }: {
	roomId: string
	children: React.ReactNode
}) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
			<h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Thông tin phòng</h1>
			{children}
			<Tabs defaultValue="" className="mt-4 sm:mt-6">
				<TabsList className="flex flex-wrap justify-center mb-4 sm:mb-6 h-14">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.route}
							value={tab.route}
							className="flex items-center px-2 py-1 sm:px-3 sm:py-2 m-0.5 sm:m-1 text-xs sm:text-sm"
						>
							{tab.icon}
							{!isMobile && <span className="ml-1 sm:ml-2">{tab.label}</span>}
						</TabsTrigger>
					))}
				</TabsList>
				<div className="bg-white rounded-lg shadow p-2 sm:p-4">
					<TabsContent value="">
						<ListTenant roomId={roomId} isAvailable={true} />
					</TabsContent>
					<TabsContent value="history">
						<ListTenant roomId={roomId} isAvailable={false} />
					</TabsContent>
					<TabsContent value="bills">
						<InvoicePage roomId={roomId} />
					</TabsContent>
					<TabsContent value="invitations">
						<InventionPage roomId={roomId} />
					</TabsContent>
					<TabsContent value="report">
						<ReportIssuePage roomId={roomId} apartmentId={undefined} isManage={true} />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}

export default RoomPage;