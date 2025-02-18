import React from "react";
import { cookies } from "next/headers";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { Activity, Bed, FileText, Info, Users, Wifi, UserCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import summaryApiRequest from "@/apiRequests/summary";
import InvoiceUnPaidCard from "@/components/manage/InvoiceUnPaidCard";
import { renderTextWithLineBreaks } from "@/util/renderTextWithLineBreaks";

async function RoomTypeDetail({ roomTypeId, isManage = false }: { roomTypeId: string; isManage?: boolean }) {
	const cookieStore = cookies();

	const res = await roomTypeApiRequest.getRoomType({
		sessionToken: cookieStore.get("sessionToken")?.value ?? "",
		roomTypeId
	});

	const details = [
		{ icon: <Bed className="w-5 h-5" />, label: "Tên loại phòng", value: res.payload?.result.name },
		{
			icon: <Info className="w-5 h-5" />,
			label: "Thông tin",
			value: renderTextWithLineBreaks(res.payload?.result.info)
		},
		{
			icon: <Wifi className="w-5 h-5" />,
			label: "Tiện ích",
			value: renderTextWithLineBreaks(res.payload?.result.utility)
		},
		{
			icon: <FileText className="w-5 h-5" />,
			label: "Mô tả",
			value: renderTextWithLineBreaks(res.payload?.result.description)
		},
		{ icon: <Users className="w-5 h-5" />, label: "Giới hạn", value: `${res.payload?.result.maxOccupancy} Người` },
		{
			icon: <UserCheck className="w-5 h-5" />,
			label: "Số người hiện tại",
			value: `${res.payload?.result.currentOccupancy} Người`
		},
		{
			icon: <Activity className="w-5 h-5" />,
			label: "Trạng thái",
			value: res.payload?.result.isAvailable ? "Đang hoạt động" : "Ngừng hoạt động",
			status: res.payload?.result.isAvailable
		}
	];

	const invoiceUnPaid = await summaryApiRequest.getInvoiceUnPaid({
		sessionToken: cookieStore.get("sessionToken")?.value || "",
		params: "roomTypeId=" + roomTypeId
	});

	return (
		<div className="container mx-auto p-4 space-y-6">
			<Card className="w-full shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Chi tiết loại phòng</CardTitle>
				</CardHeader>
				<CardContent>
					{/*<ScrollArea className="h-[60vh]">*/}
						<div className="space-y-6">
							{details.map((detail, index) => (
								<div key={index}
									 className="bg-muted rounded-lg p-4 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground">
									<div className="flex items-center gap-2 mb-2">
										{detail.icon}
										<h3 className="font-semibold">{detail.label}</h3>
									</div>
									<div className="pl-7">
										{"status" in detail ? (
											<Badge variant={detail.status ? "default" : "destructive"}
												   className="text-sm">
												{detail.value}
											</Badge>
										) : (
											<p className="text-sm text-muted-foreground">{detail.value}</p>
										)}
									</div>
								</div>
							))}
						</div>
					{/*</ScrollArea>*/}
				</CardContent>
				<CardFooter className="flex justify-end">
					<Link
						href={
							isManage
								? `/manage/${res.payload?.result.apartmentId}`
								: `/apartment/${res.payload?.result.apartmentId}`
						}
					>
						<Button variant="outline" className="flex items-center gap-2">
							<BuildingOffice2Icon className="w-5 h-5" />
							Xem căn hộ
						</Button>
					</Link>
				</CardFooter>
			</Card>
			{invoiceUnPaid.payload?.result && (
				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-semibold">Hóa đơn chưa thanh toán</CardTitle>
					</CardHeader>
					<CardContent>
						<InvoiceUnPaidCard invoiceUnPaid={invoiceUnPaid.payload?.result} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}

export default RoomTypeDetail;