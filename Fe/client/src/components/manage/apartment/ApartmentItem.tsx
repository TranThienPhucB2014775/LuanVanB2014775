"use client";

import React, { useEffect } from "react";
import { Edit, HomeIcon, Info, LocateIcon, Lock, LockOpen, ShieldCheck, Warehouse } from "lucide-react";
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";

import apartmentApiRequest from "@/apiRequests/apartment";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { apartments } from "@/constants/apartment";
import { usePathname, useRouter } from "next/navigation";

function ApartmentItem(
	{
		data,
		handleChangeData,
		isManage = true
	}:
		{
			data: apartmentResponse;
			handleChangeData: Function;
			isManage?: boolean
		}) {

	const { toast } = useToast();

	const {
		error: errorDisable,
		isFetching: isFetchingDisable,
		fetch: disable,
		reset: disableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			apartmentId: string,
		}) => apartmentApiRequest.disableApartment(data)
	);

	const {
		error: errorEnable,
		isFetching: isFetchingEnable,
		fetch: enable,
		reset: enableReset
	} = useFetch<ApiResponse<any>>(
		(data: {
			sessionToken: string,
			apartmentId: string,
		}) => apartmentApiRequest.enableApartment(data)
	);

	async function handleApartment() {

		let res;

		if (data.isAvailable) {
			res = await disable({
				sessionToken: localStorage.getItem("token"),
				apartmentId: data.apartmentId
			});
		} else {
			res = await enable({
				sessionToken: localStorage.getItem("token"),
				apartmentId: data.apartmentId
			});
		}

		console.log(res?.code);

		if (res?.code === 0) {

			handleChangeData({
				...data,
				isAvailable: !data.isAvailable
			});

			toast({
				description: `Bạn đã ${data.isAvailable ? "khoá" : "bật"} thành công`,
				title: "Thành công"
			});


			return;
		} else if (res?.code === 6021) {
			console.log("error");
			toast({
				variant: "destructive",
				description: "Không thể thực hiện hành động này, Loại phòng còn đang hoạt động",
				title: "Lỗi"
			});
		} else {
			toast({
				variant: "destructive",
				description: "Có lỗi xảy ra, vui lòng thử lại sau",
				title: "Lỗi"
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

	const pathName = usePathname();
	const router = useRouter();

	return (
		<div className="border rounded-xl flex flex-col justify-between p-2.5 space-y-2">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<div className="p-1.5 border rounded-md w-8 h-8 flex items-center justify-center">
						<HomeIcon />
					</div>
					{isManage &&
						<div className="flex flex-row gap-2">
						</div>
					}
				</div>

				{/*<div>*/}
				{/*	<h1 className="text-gray-800 font-medium">{data.name}</h1>*/}
				{/*	<p className="text-xs text-gray-500">{data.address}</p>*/}
				{/*</div>*/}
				{/*<div*/}
				{/*	className="capitalize inline-block text-xs px-2 py-0.5 font-medium bg-[#ecf0f5] text-black/80 rounded-full mr-2">*/}
				{/*	{data.apartmentType}*/}
				{/*</div>*/}
				<div className="font-medium">{data.name}</div>
				{/*<div className="text-muted-foreground">$1,200 / month</div>*/}
				<div className="flex items-center gap-2">
					<LocateIcon className="h-5 w-5" />
					<span className="text-sm">{data.address}</span>
				</div>
				<div className="flex items-center gap-2">
					<Warehouse className="h-5 w-5" />
					<span className="text-sm">
						{apartments.map((item) => {
							if (item.value === data.apartmentType) {
								return item.name;
							}
						})
						}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<ShieldCheck className="h-5 w-5" color={`${data.isAvailable ? "green" : "red"}`} />
					<span className={`text-sm ${!data.isAvailable ? "text-red-500" : "text-green-500"}`}>
						{data.isAvailable ? "Đang hoạt động" : "không hoạt động"}
					</span>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<Link
					// href={`/manage/${data.apartmentId}`}
					href={`${pathName.includes("manage") ? "/manage" : "/apartment"}/${data.apartmentId}`}
				>
					<Button variant="outline" className="p-3">
						<Info className="h-4 w-4" />
					</Button>
				</Link>
				{isManage &&
					<Link href={`/manage/form?apartmentId=${data.apartmentId}`}>
						<Button variant="outline" className="p-3">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>}


				{isManage &&
					<AlertDialog>
						<AlertDialogTrigger asChild>
							{data.isAvailable
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
									Lưu ý: khi còn loại phòng hoạt động sẽ báo lỗi
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Huỷ</AlertDialogCancel>
								<AlertDialogAction onClick={handleApartment}>Tiếp tục</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				}
			</div>
		</div>
	);
}

export default ApartmentItem;