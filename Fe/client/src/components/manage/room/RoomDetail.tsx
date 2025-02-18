import React from "react";
import roomApiRequest from "@/apiRequests/room";
import { cookies } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	AlertTriangle,
	Book,
	CheckCircle,
	CreditCard,
	FileText,
	Home,
	LayoutDashboard,
	Mail,
	MapPin,
	Phone,
	UserPlus,
	Users,
	XCircle,
	Zap
} from "lucide-react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authApiRequest } from "@/apiRequests";
import tenantApiRequest from "@/apiRequests/tenant";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormAdditionalCost from "@/components/manage/apartment/FormAdditionalCost";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import TenantForm from "@/components/manage/room/TenantForm";
import { Separator } from "@/components/ui/separator";
import contractApiRequest from "@/apiRequests/contract";
import { formatDate, formatToDate } from "@/util/formatDate";
import DisableContractDialog from "@/components/manage/room/DisableContractDialog";
import { formatCurrency } from "@/util/formatCurrency";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import ListInvoiceUnPaid from "@/components/manage/room/ListInvoiceUnPaid";
import ContractRoomMover from "@/components/manage/room/ContractRoomMover";

async function RoomDetail({ roomId, isManage }: { roomId: string; isManage: boolean }) {
	const cookieStore = cookies();

	const res = await roomApiRequest.getRoomByRoomId({
		sessionToken: cookieStore.get("sessionToken")?.value ?? "",
		roomId: roomId
	});

	const contract = await contractApiRequest.getContractByRoomId({
		roomId: roomId,
		sessionToken: cookieStore.get("sessionToken")?.value ?? ""
	});

	console.log(isManage);

	return (
		<>
			<div className="py-4 space-y-6 w-full">
				<Card>
					<CardHeader>
						<CardTitle className="text-3xl font-bold">{res.payload?.result.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="flex-row flex items-center gap-4">

								<h2 className="text-xl font-semibold flex items-center gap-2 flex-row">
									<Users className="w-5 h-5" />
									Người đang thuê: {res.payload?.result.currentOccupancy}
								</h2>
							</div>
							<div className="flex-row flex items-center gap-4">
								<h2 className="text-xl font-semibold flex items-center gap-2">
									<Book className="w-5 h-5" /> Hoạt động:
								</h2>
								<p className="flex items-center gap-2">
									{res.payload?.result.isAvailable ? (
										<span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Đang hoạt động
                    </span>
									) : (
										<span className="text-red-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Ngưng hoạt động
                    </span>
									)}
								</p>
							</div>
						</div>
						<div className="flex flex-row gap-2 items-center mt-4">
							{isManage &&
								<Dialog>
									<DialogTrigger asChild>
										<div className="">
											<Button>
												<Zap className="w-4 h-4 mr-2" />
												Thêm người thuê
											</Button>
										</div>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Thêm mới người thuê</DialogTitle>
										</DialogHeader>
										<TenantForm roomId={roomId}
													isRoomOccupied={res?.payload?.result.rentStatus === "RENTED"}
													contract={contract.payload?.result}
										/>
									</DialogContent>
								</Dialog>}
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
							<Link
								href={
									isManage
										? `/manage/room-type/${res.payload?.result.roomTypeId}`
										: `/room-type/${res.payload?.result.roomTypeId}`
								}
							>
								<Button variant="outline">
									<LayoutDashboard width={24} />
								</Button>
							</Link>
						</div>
						{contract.code !== 6023 &&
							<>
								<Separator className="my-6" />
								<div className="space-y-4">
									<h3 className="text-xl font-semibold">Thông tin thuê phòng</h3>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="font-medium">Ngày bắt đầu:</p>
											<p>{formatToDate(contract?.payload?.result.startDate ?? "").toLocaleString()}</p>
										</div>
										<div>
											<p className="font-medium">Ngày kết thúc:</p>
											<p>{formatToDate(contract?.payload?.result.expectedEndDate ?? "").toLocaleString()}</p>
										</div>
										<div>
											<p className="font-medium">Giá thuê hàng tháng:</p>
											<p>{formatCurrency(contract.payload?.result.price)} VNĐ</p>
										</div>
										<div>
											<p className="font-medium">Đặt cọc:</p>
											<p>{formatCurrency(contract.payload?.result.depositAmount)} VNĐ</p>
										</div>
									</div>
								</div>
								{
									isManage &&
									<div className="flex flex-row gap-2 mt-4">
										<DisableContractDialog
											contractId={contract?.payload?.result.contractId || ""} />
										<ContractRoomMover
											roomTypeId={contract.payload?.result.roomTypeId || ""}
											roomId={roomId}
											contractId={contract.payload?.result.contractId || ""}
										/>
									</div>
								}
							</>
						}
						<Separator className="my-6" />
						<ListInvoiceUnPaid invoices={res.payload?.result.invoiceResponse || []} roomId={roomId}
										   isLandLord={isManage} />
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default RoomDetail;