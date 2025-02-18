"use client";

import React, { useEffect, useState } from "react";
import ManageTop from "@/components/manage/ManageTop";
import { DoorClosed } from "lucide-react";
import RoomTypeFilter from "@/components/manage/room-type/RoomTypeFilter";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import Pagination from "@/components/Pageinate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import roomApiRequest from "@/apiRequests/room";
import { roomResponse } from "@/dto/response/roomResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListRoomTypePage from "@/components/manage/room-type/ListRoomTypePage";
import ReportIssuePage from "@/components/rental/reportIssue/ReportIssuePage";
import RevenueStatistics from "@/components/manage/RevenueStatistics/RevenueStatistics";
import Reviews from "@/components/feedBack/Reviews";
import ListRoom from "@/components/manage/room/ListRoom";
import WriteNotification from "@/components/manage/WriteNotification";
import apartmentApiRequest from "@/apiRequests/apartment";
import roomTypeApiRequest from "@/apiRequests/roonType";

function RoomTypePage({ roomTypeId, children, isManage = true }: {
	roomTypeId: string;
	children: React.ReactNode;
	isManage?: boolean
}) {
	return (
		<>
			<h1 className="text-center text-3xl font-bold py-4">Thông tin phòng trọ</h1>
			{children}
			<Tabs defaultValue="list-room" className="w-full container">
				<TabsList className="flex flex-row gap-2 w-fit">
					<TabsTrigger value="list-room">Dánh sách phòng</TabsTrigger>
					{isManage && <TabsTrigger value="notification">Viết thông báo</TabsTrigger>}
					{isManage && <TabsTrigger value="RevenueStatistics">Doanh thu</TabsTrigger>}
				</TabsList>
				<TabsContent value="list-room">
					<ListRoom roomTypeId={roomTypeId} isManage={isManage} />
				</TabsContent>
				{isManage &&
					<TabsContent value="RevenueStatistics">
						<RevenueStatistics roomTypeId={roomTypeId} />
					</TabsContent>
				}
				{
					isManage &&
					<TabsContent value="notification">
						< WriteNotification
							sendNotification={roomTypeApiRequest.sendNotification}
							id={roomTypeId}
						/>
					</TabsContent>
				}
			</Tabs>
		</>
	);
}

export default RoomTypePage;