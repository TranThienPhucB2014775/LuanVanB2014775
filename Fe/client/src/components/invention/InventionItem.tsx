import React, { useEffect, useState } from "react";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import { authApiRequest } from "@/apiRequests";
import envConfig from "@/config";
import {
	CalendarIcon,
	Clock,
	HomeIcon,
	InfoIcon,
	XIcon,
	UserIcon,
	CheckIcon,
	BedDoubleIcon,
	BuildingIcon, FileText, Info, User, DollarSign,
	Lock, LayoutDashboard
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import inventionApiRequest from "@/apiRequests/invitation";
import { formatCurrency } from "@/util/formatCurrency";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

const InvitationStatuses = [
	{
		value: "PENDING",
		label: "Đang chờ"
	},
	{
		value: "ACCEPTED",
		label: "Đã chấp nhận"
	},
	{
		value: "REFUSED",
		label: "Đã từ chối"
	},
	{
		value: "DISABLED",
		label: "Đã vô hiệu hóa"
	}
];

function InventionItem(
	{
		invention,
		handleAccept,
		handleDecline,
		isManage = false,
		handleDisable
	}:
		{
			invention: InvitationResponse;
			handleAccept: Function
			handleDecline: Function
			handleDisable: Function
			isManage?: boolean
		}
) {
	var jwt = require("jsonwebtoken");
	const [landLord, setLandLord] = useState<infoResponse | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) =>
			authApiRequest.infoById({ ...data })
	);

	useEffect(() => {
		async function getInfo() {
			if (!invention.landlordId) return;
			const res = await fetch({
				userId: invention.landlordId,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setLandLord((res?.payload as infoResponse));
			} else if (error) {
			}
		}

		getInfo();
	}, []);

	const { exp } = jwt.decode(invention.inviteToken);

	const expirationDate = new Date(exp * 1000);

	return (
		<div className="container mx-auto p-4">
			<Card className="w-full max-w-2xl mx-auto">
				<CardHeader>
					<div className="flex items-center mb-2">
						<Link href={`/user/${landLord?.result.id}`}>
							<Avatar className="mr-3">
								<AvatarImage
									src={`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/${landLord?.result.imgAvatar}`}
									alt="@shadcn"
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</Link>
						<div>
							<p className="font-medium">{landLord?.result.username}</p>
							<p className="text-sm text-muted-foreground">Mời bạn tham gia vào phòng trọ</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 className="text-lg font-semibold mb-2">Thông tin phòng</h3>
							<p className="flex flex-row items-center">
								<HomeIcon className="inline mr-2 w-5 h-5" />
								{invention.room.name}
							</p>
							<p className="flex flex-row items-center">
								<UserIcon className="inline mr-2 w-5 h-5" />
								Occupancy: {invention.room.currentOccupancy}/{invention.roomType.maxOccupancy}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Thông tin loại phòng</h3>
							<p className="flex flex-row items-center">
								<Info className="inline mr-2 w-5 h-5" />
								{invention.roomType.name}
							</p>
							<p className="truncate overflow-hidden whitespace-nowrap text-ellipsis flex flex-row items-center">
								<FileText className="inline mr-2 w-5 h-5" />
								{invention.roomType.description}
							</p>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">Thông tin lời mời</h3>
						<div>Trạng thái: <Badge
							variant={`${invention.invitationStatus === "REFUSED" ? "destructive" : "outline"}`}>
							{InvitationStatuses.map(InvitationStatus => {
								if (invention.invitationStatus === InvitationStatus.value) {
									return InvitationStatus.label;
								}
							})
							}
						</Badge></div>
						<p>Lời nhắn: {invention.message}</p>
						{/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
						{/*	<div>*/}
						{/*		<p>*/}
						{/*			<CalendarIcon className="inline mr-2 w-5 h-5" />*/}
						{/*			Tạo lúc: {new Date(invention.createdAt).toLocaleString()}</p>*/}
						{/*		{expirationDate && (*/}
						{/*			<p>*/}
						{/*				<CalendarIcon className="inline mr-2 w-5 h-5" />*/}
						{/*				Hết hạn: {new Date(exp * 1000).toLocaleString()}*/}
						{/*			</p>*/}
						{/*		)}*/}
						{/*	</div>*/}
						{/*	<div>*/}
						{/*		<p>*/}
						{/*			<DollarSign className="inline mr-2 w-5 h-5" />*/}
						{/*			Tiền thuê {formatCurrency(invention.price)} VNĐ*/}
						{/*		</p>*/}
						{/*		<p>*/}
						{/*			<Lock className="inline mr-2 w-5 h-5" />*/}
						{/*			Đặt cọc {formatCurrency(invention.depositAmount)} VNĐ*/}
						{/*		</p>*/}
						{/*	</div>*/}
						{/*</div>*/}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p>
									<CalendarIcon className="inline mr-2 w-5 h-5" />
									Tạo lúc: {new Date(invention.createdAt).toLocaleString()}
								</p>
								{expirationDate && (
									<p>
										<CalendarIcon className="inline mr-2 w-5 h-5" />
										Hết hạn: {new Date(exp * 1000).toLocaleString()}
									</p>
								)}
								<p>
									<CalendarIcon className="inline mr-2 w-5 h-5" />
									Ngày bắt đầu: {new Date(invention.startDate).toLocaleDateString()}
								</p>
								<p>
									<CalendarIcon className="inline mr-2 w-5 h-5" />
									Ngày kết thúc: {new Date(invention.endDate).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p>
									<DollarSign className="inline mr-2 w-5 h-5" />
									Tiền thuê {formatCurrency(invention.price)} VNĐ
								</p>
								<p>
									<Lock className="inline mr-2 w-5 h-5" />
									Đặt cọc {formatCurrency(invention.depositAmount)} VNĐ
								</p>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter
					className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
					<div className="flex space-x-2">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href={`/user/${landLord?.result.id}`}>
										<Button variant="outline" className="p-3">
											<User className="h-4 w-4" />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Thông tin chủ trọ</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href={`/apartment/${invention.roomType.apartmentId}`}>
										<Button variant="outline">
											<BuildingOffice2Icon className="h-4 w-4" />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Thông tin phòng trọ</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href={`/room-type/${invention.roomType.roomTypeId}`}>
										<Button variant="outline">
											<LayoutDashboard className=" h-4 w-4" />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Thông tin loại phòng trọ</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					{!isManage && invention.invitationStatus === "PENDING" && new Date().getTime() < new Date(exp * 1000).getTime() && (
						<div className="flex flex-row gap-2">
							<Button onClick={() => handleDecline(invention.inviteToken)} variant="destructive">
								<XIcon className="mr-2 h-4 w-4" />
								Từ chối
							</Button>
							<Button onClick={() => handleAccept(invention.inviteToken)} variant="default">
								<CheckIcon className="mr-2 h-4 w-4" />
								Châp nhận
							</Button>
						</div>
					)}
					{
						isManage && invention.invitationStatus === "PENDING" && (
							<div className="flex flex-row gap-2">
								<Button onClick={() => handleDisable()} variant="destructive">
									<XIcon className="mr-2 h-4 w-4" />
									Vô hiệu hóa
								</Button>
							</div>
						)
					}
				</CardFooter>
			</Card>
		</div>
	);
}

export default InventionItem;