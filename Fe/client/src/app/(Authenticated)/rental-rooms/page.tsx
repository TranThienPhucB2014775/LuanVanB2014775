"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, History, FileText, Users, User } from "lucide-react";
import CurrentRoomsPage from "@/components/rental/CurrentRoomsPage";
import RentalHistoryPage from "@/components/rental/RentalHistoryPage";

export default function RentalRoomManagement() {
	const [activeTab, setActiveTab] = useState("current-rooms");
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Quản lý phòng đang thuê</h1>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					<TabsTrigger value="current-rooms">
						<Home className="w-4 h-4 mr-2" />
						Phòng đang thuê
					</TabsTrigger>
					<TabsTrigger value="rental-history">
						<History className="w-4 h-4 mr-2" />
						Phòng đã thuê
					</TabsTrigger>
				</TabsList>
				<TabsContent value="current-rooms">
					< CurrentRoomsPage />
				</TabsContent>
				<TabsContent value="rental-history">
					<RentalHistoryPage />
				</TabsContent>
			</Tabs>
		</div>
	);
}