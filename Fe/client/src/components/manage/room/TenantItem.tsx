import React, { useEffect, useState } from "react";
// @ts-ignore
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CreditCard, FileText, Home, Info, Loader2, Mail, Phone, UserRoundMinus } from "lucide-react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { infoResponse } from "@/dto/response";
import { tenantResponsesType } from "@/dto/response/tenantResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { authApiRequest } from "@/apiRequests";
import envConfig from "@/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader, AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import tenantApiRequest from "@/apiRequests/tenant";
import { mediaLink } from "@/constants/media";
import CardIdInfo from "@/components/manage/room/CardIdInfo";
import { formatDate } from "@/util/formatDate";

function TenantItem({ tenant, roomId, handleDeleteTenant }: {
	tenant: tenantResponsesType;
	roomId?: string;
	handleDeleteTenant: Function
}) {

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) =>
			authApiRequest.infoById({ ...data })
	);


	const [user, setUser] = useState<infoResponse | undefined>(undefined);

	useEffect(() => {
		async function getInfo() {
			const res = await fetch({
				userId: tenant.userId,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setUser((res?.payload as infoResponse));
			} else if (error) {
				console.log(error);
			}
		}

		getInfo();
	}, []);

	const {
		error: removeTenantError,
		isFetching: removeTenantIsFetching,
		fetch: removeTenant
	} = useFetch<ApiResponse<string>>(
		(data: { roomId: string; sessionToken: string; tenantId: string }) =>
			tenantApiRequest.landlordInviteTenantLeaving(data)
	);

	async function handleRemoveTenant() {
		const removeTenantRes = await removeTenant({
			roomId: roomId,
			sessionToken: localStorage.getItem("token") || "",
			tenantId: tenant.userId
		});
		handleDeleteTenant(tenant.userId);
	}

	console.log(tenant);

	return (
		<div className="container mx-auto p-4 space-y-6 md:w-[400px] w-full">
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center space-x-4 pb-2">
					<Avatar className="w-24 h-24">
						<AvatarImage src={`${mediaLink}/${user?.result.imgAvatar}`}
									 alt="AVT" />
						<AvatarFallback>{user !== undefined && user.result.username}</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-3xl">{user !== undefined && user.result.username}</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6">
						<div className="space-y-4 w-full">
							<div className="flex items-center space-x-2">
								<Phone className="w-5 h-5 text-muted-foreground" />
								<span>{user !== undefined && user.result.phoneNumber}</span>
							</div>
							<div className="flex items-center space-x-2 w-full">
								<Mail className="w-5 h-5 text-muted-foreground" />
								<span>{user !== undefined && user.result.email}</span>
							</div>
							<div className="flex items-center space-x-2">
								<CalendarIcon className="w-5 h-5 text-muted-foreground" />
								<span>Bắt đầu: {formatDate(tenant.startDate.toString())}</span>
							</div>
							<div className="flex items-center space-x-2">
								<CalendarIcon className="w-5 h-5 text-muted-foreground" />
								<span>Kết thúc: {formatDate(tenant.endDate.toString())}</span>
							</div>
							{
								tenant.rentalDuration !== "" && <div className="flex items-center space-x-2">
									<FileText className="w-5 h-5 text-muted-foreground" />
									<span>Thời gian đã thuê: {tenant.rentalDuration}</span>
								</div>
							}
							<div className="flex items-center space-x-2 justify-end">
								{
									tenant.isAvailable && <>
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="destructive" className="p-3">
													{isFetching
														? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
														: <UserRoundMinus className="h-4 w-4" />
													}

												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Bạn có chắc chắn muốn xóa người thuê này
														không?</AlertDialogTitle>
													<AlertDialogDescription>
														Hành động này sẽ không thể hoàn tác. Người thuê sẽ bị xóa khỏi phòng
														và
														tất cả dữ liệu liên quan sẽ bị xóa.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Hủy</AlertDialogCancel>
													<AlertDialogAction onClick={handleRemoveTenant}>
														Xác nhận
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
										<CardIdInfo userId={user?.result.id || ""} />
									</>
								}
								<Link
									href={`/user/${user?.result.id}`}
								>
									<Button variant="outline" className="p-3">
										<Info className="h-4 w-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default TenantItem;