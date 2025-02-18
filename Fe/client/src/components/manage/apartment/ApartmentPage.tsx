"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/components/ui/tabs";
import ListRoomTypePage from "@/components/manage/room-type/ListRoomTypePage";
import ReportIssuePage from "@/components/rental/reportIssue/ReportIssuePage";
import Reviews from "@/components/feedBack/Reviews";
import RevenueStatistics from "@/components/manage/RevenueStatistics/RevenueStatistics";
import WriteNotification from "@/components/manage/WriteNotification";
import apartmentApiRequest from "@/apiRequests/apartment";

function ApartmentPage({ apartmentId, children, isManage = true }: {
	apartmentId: string;
	children: React.ReactNode;
	isManage?: boolean
}) {

	return (
		<>
			{/*{memoizedTets}*/}
			<h1 className="text-center text-3xl font-bold py-4">Thông tin</h1>
			{children}
			<Tabs defaultValue="list-room-type" className="w-full">
				<TabsList className="flex flex-row gap-2 w-fit">
					<TabsTrigger value="list-room-type">Dánh sách loại phòng</TabsTrigger>
					{isManage && <TabsTrigger value="report">Liên hệ</TabsTrigger>}
					{isManage && <TabsTrigger value="RevenueStatistics">Doanh thu</TabsTrigger>}
					{isManage && <TabsTrigger value="notification">Viết thông báo</TabsTrigger>}
					<TabsTrigger value="reviews">Đánh giá</TabsTrigger>
				</TabsList>
				<TabsContent value="list-room-type">
					<ListRoomTypePage apartmentId={apartmentId} isManage={isManage} />
				</TabsContent>
				{isManage &&
					<TabsContent value="report">
						<ReportIssuePage roomId={undefined} apartmentId={apartmentId} isManage={isManage} />
					</TabsContent>
				}
				{isManage &&
					<TabsContent value="RevenueStatistics">
						<RevenueStatistics apartmentId={apartmentId} />
					</TabsContent>
				}
				{
					isManage &&
					<TabsContent value="notification">
						< WriteNotification
							sendNotification={apartmentApiRequest.sendNotification}
							id={apartmentId}
						/>
					</TabsContent>
				}
				<TabsContent value="reviews">
					<Reviews itemId={apartmentId} isManage={isManage} userId={""} />
				</TabsContent>

			</Tabs>

		</>
	);
}

export default ApartmentPage;