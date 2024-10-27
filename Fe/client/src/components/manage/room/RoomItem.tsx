"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Info, Lock, LockOpen, ShieldCheck } from "lucide-react";
import { UserIcon } from "@heroicons/react/16/solid";
import UtilityUsageForm from "@/components/manage/room/monthly-usage/UtilityUsageForm";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import roomApiRequest from "@/apiRequests/room";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { roomResponse } from "@/dto/response/roomResponse";

interface RoomItemProps {
	room: roomResponse;
	handleChangeRoom: Function;
	isManage: boolean;
}

export default function RoomItem({ room, handleChangeRoom, isManage }: RoomItemProps) {
	const pathName = usePathname();

	const { toast } = useToast();

	const {
		error: errorDisable,
		isFetching: isFetchingDisable,
		fetch: disable,
		reset: disableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			roomId: string,
		}) => roomApiRequest.deleteRoom(data)
	);

	const {
		error: errorEnable,
		isFetching: isFetchingEnable,
		fetch: enable,
		reset: enableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			roomId: string,
		}) => roomApiRequest.enableRoom(data)
	);

	async function handleApartment() {

		let res;

		if (room.isAvailable) {
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

		console.log(res);

		if (res?.code === 0) {
			handleChangeRoom({
				...room,
				isAvailable: !room.isAvailable
			});

			toast({
				description: `Bạn đã ${room.isAvailable ? "khoá" : "bật"} thành công`,
				title: "Thành công"
			});


			return;
		} else if (res?.code === 6024) {
			toast({
				variant: "destructive", description: "Không thể thực hiện hành động này, có người đang thuê phòng",
				title: "Thất bại"
			});
		} else if (res?.code === 6025) {
			toast({
				variant: "destructive", description: "Không thể thực hiện hành động này, Loại phòng không hoạt động!!",
				title: "Thất bại"
			});
		} else {
			toast({
				variant: "destructive", description: "Có lỗi xảy ra, vui lòng thử lại sau",
				title: "Thất bại"
			});
		}
	}


	const handleChangeRoomAvailability = () => {
		handleChangeRoom({
			...room,
			isAvailable: !room.isAvailable
		});
	};

	return (
		<div
			className="relative w-full overflow-hidden rounded-3xl border-2 border-gray-200 transition-colors duration-300 hover:border-gray-700 sm:w-[400px] lg:w-[450px]">
			<div className="relative w-full p-6">
				<div className="absolute inset-0 bg-glass-gradient pointer-events-none" />
				<h3 className="mb-2 flex items-center text-2xl font-medium leading-6">
					<span>{room.name}</span>
				</h3>
				<div className="relative w-full flex gap-2 flex-col">
					<div className="flex items-center gap-2">
						<UserIcon className="h-5 w-5" />
						<span className="text-sm">{room.currentOccupancy}</span>
					</div>
					<div className="flex items-center gap-2">
						<ShieldCheck className="h-5 w-5" color={`${room.isAvailable ? "green" : "red"}`} />
						<span className={`text-sm ${!room.isAvailable ? "text-red-500" : "text-green-500"}`}>
						{room.isAvailable ? "Đang hoạt động" : "không hoạt động"}
				</span>
					</div>
				</div>
				{isManage && (
					<div className="mt-4 flex justify-end gap-2">
						<Button variant="outline" size="icon" asChild>
							<Link href={`../room/${room.roomId}`}>
								<Info className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="outline" size="icon" asChild>
							<Link href={`${pathName}/form?action=update&roomId=${room.roomId}`}>
								<Edit className="h-4 w-4" />
							</Link>
						</Button>
						{
							room.currentOccupancy > 0 && (
								<Button variant="outline" size="icon" asChild>
									<UtilityUsageForm roomId={room.roomId} />
								</Button>
							)
						}
						<AlertDialog>
							<AlertDialogTrigger asChild>
								{room.isAvailable
									? <Button
										variant="destructive" className="p-3"
									>
										{isFetchingDisable
											? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
											: <Lock className="h-4 w-4" />
										}
									</Button>
									: <Button variant="outline" className="p-3">
										{isFetchingEnable
											? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
											: <LockOpen className="h-4 w-4" />
										}
									</Button>
								}
								{/*<Button variant="outline" className="h-8">Show Dialog</Button>*/}
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
					</div>
				)}
			</div>
		</div>
	);
}