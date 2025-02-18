"use client";

import React from "react";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import roonType from "@/apiRequests/roonType";
import { Edit, Info, Lock, LockOpen, ShieldCheck } from "lucide-react";
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

function RoomTypeItem({ roomType, handleChangeData, isManage }:
						  {
							  roomType: roomTypeResponse;
							  handleChangeData: Function;
							  isManage: boolean;
						  }) {
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
			roomTypeId: string,
		}) => roomTypeApiRequest.deleteRoomType(data)
	);

	const {
		error: errorEnable,
		isFetching: isFetchingEnable,
		fetch: enable,
		reset: enableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			roomTypeId: string,
		}) => roomTypeApiRequest.enableRoomType(data)
	);

	async function handleApartment() {

		let res;

		if (roomType.isAvailable) {
			res = await disable({
				sessionToken: localStorage.getItem("token"),
				roomTypeId: roomType.roomTypeId
			});
		} else {
			res = await enable({
				sessionToken: localStorage.getItem("token"),
				roomTypeId: roomType.roomTypeId
			});
		}

		if (res?.code === 0) {
			handleChangeData({
				...roomType,
				isAvailable: !roomType.isAvailable
			});

			toast({
				description: `Bạn đã ${roomType.isAvailable ? "khoá" : "bật"} thành công`,
				title: "Thành công"
			});


			return;
		} else if (res?.code === 6022) {
			toast({
				variant: "destructive", description: "Không thể thực hiện hành động này, phòng còn đang hoạt động",
				title: "Thất bại"
			});
		} else if (res?.code === 6027) {
			toast({
				variant: "destructive", description: "Không thể thực hiện hành động này, khu trọ đang không hoạt động",
				title: "Thất bại"
			});
		} else {
			toast({
				variant: "destructive", description: "Có lỗi xảy ra, vui lòng thử lại sau",
				title: "Thất bại"
			});
		}
	}

	// if (errorDisable) {
	// 	toast({ variant: "destructive", description: "Có lỗi xảy ra, vui lòng thử lại sau" });
	// 	disableReset();
	// 	return;
	// }
	//
	// if (errorEnable) {
	// 	toast({ variant: "destructive", description: "Có lỗi xảy ra, vui lòng thử lại sau" });
	// 	enableReset();
	// 	return;
	// }

	return <div
		className="block relative overflow-hidden rounded-3xl border-2 border-gray-200 hover:border-gray-700
					 hover:border-2 transition-colors duration-300 w-[400px] sm:w-[450px]"
	>
		<div className="relative w-full p-6 flex gap-2 flex-col">
			<div className="absolute inset-0 bg-glass-gradient pointer-events-none" />
			<h3 className="text-2xl font-medium leading-6 mb-2 flex items-center">
				<span>{roomType.name}</span>
			</h3>
			<div className="flex items-center gap-2">
				<Info className="h-5 w-5" />
				<span className="text-sm">{roomType.info}</span>
			</div>
			<div className="flex items-center gap-2">
				<ShieldCheck className="h-5 w-5" color={`${roomType.isAvailable ? "green" : "red"}`} />
				<span className={`text-sm ${!roomType.isAvailable ? "text-red-500" : "text-green-500"}`}>
						{roomType.isAvailable ? "Đang hoạt động" : "không hoạt động"}
				</span>
			</div>
			<div className="flex flex-row pt-3 justify-end w-full gap-4">
				<Link
					// href={`/manage/room-type/${roomType.roomTypeId}`}
					href={`${isManage
						? `./room-type/${roomType.roomTypeId}`
						: `/room-type/${roomType.roomTypeId}`}`}
				>
					<Button variant="outline" className="p-3">
						<Info className="h-4 w-4" />
					</Button>

				</Link>

				{
					isManage && <>
						<Link
							href={`${pathName}/form?action=update&roomTypeId=${roomType.roomTypeId}`}
						>
							<Button variant="default" className="p-3">
								<Edit className="h-4 w-4" />
							</Button>
						</Link>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								{roomType.isAvailable
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
					</>
				}
			</div>
		</div>
	</div>;
}

export default RoomTypeItem;