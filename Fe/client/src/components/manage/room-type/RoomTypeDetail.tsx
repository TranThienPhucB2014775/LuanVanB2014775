import React from "react";
import { cookies } from "next/headers";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { Activity, Bed, FileText, Info, Users, Wifi } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function RoomTypeDetail({ roomTypeId, isManage = false }: { roomTypeId: string; isManage?: boolean }) {

	const cookieStore = cookies();


	const res = await roomTypeApiRequest.getRoomType({
		sessionToken: cookieStore.get("sessionToken")?.value ?? "",
		roomTypeId
	});

	const details = [
		{ icon: <Bed className="w-5 h-5" />, label: "Tên loại phòng", value: res.payload?.result.name },
		{ icon: <Info className="w-5 h-5" />, label: "Thông tin", value: res.payload?.result.info },
		{ icon: <Wifi className="w-5 h-5" />, label: "Tiện ích", value: res.payload?.result.utility },
		{ icon: <FileText className="w-5 h-5" />, label: "Mô tả", value: res.payload?.result.description },
		{ icon: <Users className="w-5 h-5" />, label: "Giới hạn", value: `${res.payload?.result.maxOccupancy} Người` },
		{
			icon: <Activity className="w-5 h-5" />,
			label: "Trạng thái",
			value: res.payload?.result.isAvailable ? "Đang hoạt động" : "Ngừng hoạt động",
			status: res.payload?.result.isAvailable
		}
	];

	return (
		<div className="h-fit w-full bg-background p-4 flex items-center justify-center">
			<Card className="w-full max-w-4xl shadow-lg">
				<CardContent className="pt-6">
					<div className="pb-4">
						<div className="flow-root">
							<dl className="divide-y divide-border text-sm">
								{details.map((detail, index) => (
									<div key={index}
										 className="grid grid-cols-1 gap-1 py-4 even:bg-muted sm:grid-cols-3 sm:gap-4 rounded-lg transition-colors duration-200 hover:bg-accent hover:text-accent-foreground">
										<dt className="font-medium text-foreground flex items-center gap-2 pl-2">
											{detail.icon}
											{detail.label}
										</dt>
										<dd className="text-muted-foreground sm:col-span-2 flex items-center pl-2 sm:pl-0">
											{"status" in detail ? (
												<Badge variant={detail.status ? "default" : "destructive"}
													   className="text-xs font-semibold">
													{detail.value}
												</Badge>
											) : (
												detail.value
											)}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

				</CardContent>
				<CardFooter className="flex justify-end">
					<Link
						href={
							isManage
								? `/manage/${res.payload?.result.apartmentId}`
								: `/apartment/${res.payload?.result.apartmentId}`
						}
					>
						<Button variant="outline">
							<BuildingOffice2Icon width={24} />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}

export default RoomTypeDetail;