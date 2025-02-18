"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BedDouble, Edit, Home, Info, Lock, LockOpen, User, FileText, ClipboardList } from "lucide-react";
import UtilityUsageForm from "@/components/manage/room/monthly-usage/UtilityUsageForm";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import roomApiRequest from "@/apiRequests/room";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { roomResponse } from "@/dto/response/roomResponse";
import CompleteInvoiceForm from "@/components/manage/room/CompleteInvoiceForm";
import { invoiceType } from "@/dto/response/invoiceResponse";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RoomItemProps {
	room: roomResponse;
	isManage: boolean;
}

export default function RoomItem({ room, isManage }: RoomItemProps) {
	const [roomData, setRoomData] = useState(room);
	const pathName = usePathname();
	const { toast } = useToast();

	const {
		isFetching: isFetchingDisable,
		fetch: disable
	} = useFetch<ApiResponse<any>>(
		(data: { sessionToken: string; roomId: string }) => roomApiRequest.deleteRoom(data)
	);

	const {
		isFetching: isFetchingEnable,
		fetch: enable
	} = useFetch<ApiResponse<any>>(
		(data: { sessionToken: string; roomId: string }) => roomApiRequest.enableRoom(data)
	);

	async function handleApartment() {
		let res;

		if (roomData.isAvailable) {
			res = await disable({
				sessionToken: localStorage.getItem("token"),
				roomId: room.roomId
			});
		} else {
			res = await enable({
				sessionToken: localStorage.getItem("token"),
				roomId: room.roomId
			});
		}

		if (res?.code === 0) {
			setRoomData({
				...roomData,
				isAvailable: !room.isAvailable
			});

			toast({
				description: `Bạn đã ${roomData.isAvailable ? "khoá" : "bật"} thành công`,
				title: "Thành công"
			});
		} else if (res?.code === 6024) {
			toast({
				variant: "destructive",
				description: "Không thể thực hiện hành động này, có người đang thuê phòng",
				title: "Thất bại"
			});
		} else if (res?.code === 6025) {
			toast({
				variant: "destructive",
				description: "Không thể thực hiện hành động này, Loại phòng không hoạt động!!",
				title: "Thất bại"
			});
		} else {
			toast({
				variant: "destructive",
				description: "Có lỗi xảy ra, vui lòng thử lại sau",
				title: "Thất bại"
			});
		}
	}

	function handleChangeIsPaid({ month, year }: { month: number; year: number }) {
		const updatedInvoices = roomData.invoiceResponse.filter(
			(invoice) => invoice.month !== month || invoice.year !== year
		);

		setRoomData({
			...roomData,
			invoiceResponse: updatedInvoices
		});
	}

	function handleAddInvoice(invoice: invoiceType) {
		if (roomData.invoiceResponse === null) {
			setRoomData({
				...roomData,
				invoiceResponse: [invoice]
			});
		} else {
			setRoomData({
				...roomData,
				invoiceResponse: [...roomData.invoiceResponse, invoice]
			});
		}
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            Phòng {roomData.name}
          </span>
					<Badge variant={roomData.isAvailable ? "default" : "destructive"}>
						{roomData.isAvailable ? "Đang hoạt động" : "Không hoạt động"}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 mt-2">
					<div className="flex items-center gap-2">
						<User className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm">{roomData.currentOccupancy} Người đang thuê</span>
					</div>
					<div className="flex items-center gap-2">
						<Home className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm">
              {roomData.rentStatus === "AVAILABLE" ? "Đang trống" : "Đang cho thuê"}
            </span>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium">
            {roomData.invoiceResponse && roomData.invoiceResponse.length > 0
				? "Hóa đơn đang nợ:"
				: "Không có hóa đơn"}
          </span>
					{roomData.invoiceResponse && roomData.invoiceResponse.length > 0 && (
						<Badge variant="secondary">
							{roomData.invoiceResponse.length} Hóa đơn
						</Badge>
					)}
				</div>
			</CardContent>
			{isManage && (
				<CardFooter className="flex flex-wrap gap-2 justify-end">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" asChild>
									<Link href={`../room/${roomData.roomId}`}>
										<Info className="h-4 w-4" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Xem chi tiết phòng</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" asChild>
									<Link href={`${pathName}/form?action=update&roomId=${roomData.roomId}`}>
										<Edit className="h-4 w-4" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Chỉnh sửa thông tin phòng</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					{roomData.currentOccupancy > 0 && (
						<>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline" size="icon" asChild>
											<UtilityUsageForm roomId={roomData.roomId}
															  handleAddInvoice={handleAddInvoice} />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Cập nhật tiện ích sử dụng</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</>
					)}
					{roomData.invoiceResponse && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="outline" size="icon" asChild>
										<CompleteInvoiceForm room={roomData}
															 handleChangeIsPaid={handleChangeIsPaid} />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Xem và cập nhật hóa đơn</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant={roomData.isAvailable ? "destructive" : "outline"}
								size="icon"
								className="ml-2"
							>
								{isFetchingDisable || isFetchingEnable ? (
									<ReloadIcon className="h-4 w-4 animate-spin" />
								) : roomData.isAvailable ? (
									<Lock className="h-4 w-4" />
								) : (
									<LockOpen className="h-4 w-4" />
								)}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Xác nhận!</AlertDialogTitle>
								<AlertDialogDescription>
									Vui lòng xác nhận hành động của bạn
								</AlertDialogDescription>
								<AlertDialogDescription>
									Lưu ý: khi còn phòng hoạt động sẽ báo lỗi
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Huỷ</AlertDialogCancel>
								<AlertDialogAction onClick={handleApartment}>Tiếp tục</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			)}
		</Card>
	);
}