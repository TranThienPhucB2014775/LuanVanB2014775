import React from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/components/ui/tabs";
import Link from "next/link";
import rentalPage from "@/components/rental/RentalPage";
import RentalPage from "@/components/rental/RentalPage";
import InvoicePage from "@/components/rental/InvoicePage";
import ReportIssuePage from "@/components/rental/reportIssue/ReportIssuePage";

import contractApiRequest from "@/apiRequests/contract";
import { cookies } from "next/headers";
import NotFound from "@/app/not-found";
import PageAnimate from "@/components/PageAnimate";
import RoomDetail from "@/components/manage/room/RoomDetail";

async function Page({ params }: { params: { roomId: string } }) {

	const cookieStore = cookies();

	const contract = await contractApiRequest.getContractByRoomId(
		{ roomId: params.roomId, sessionToken: cookieStore.get("sessionToken")?.value ?? "" }
	);

	if (contract.code !== 0) {
		return <NotFound />;
	}

	return (
		<div className="pt-5 container">
			<h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Thông tin phòng</h1>
			<RoomDetail roomId={params.roomId} isManage={false} />
			<Tabs defaultValue="info" className="flex flex-col justify-center">
				<TabsList className="flex flex-row gap-2 w-fit">
					<TabsTrigger value="info">Thông tin</TabsTrigger>
					<TabsTrigger value="invoice">Hóa đơn</TabsTrigger>
					<TabsTrigger value="report-issue">Liên hệ</TabsTrigger>
					{/*<TabsTrigger value="review">Đánh giá của bạn</TabsTrigger>*/}
				</TabsList>
				<TabsContent value="info">
					<RentalPage roomId={params.roomId} contract={contract.payload?.result} />
				</TabsContent>
				<TabsContent value="invoice">
					<InvoicePage roomId={params.roomId} />
				</TabsContent>
				<TabsContent value="report-issue">
					<ReportIssuePage roomId={params.roomId} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Page;