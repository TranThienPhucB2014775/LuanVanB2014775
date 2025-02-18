"use client";

import { useEffect, useState } from "react";
import { tenantResponseOfLandlord } from "@/dto/response/tenantPostResponse";
import { infoResponse } from "@/dto/response";
import authApiRequest from "@/apiRequests/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/util/formatDate";

export default function TenantItem({ tenant }: { tenant: tenantResponseOfLandlord }) {
	const [user, setUser] = useState<infoResponse["result"] | null>(null);

	useEffect(() => {
		authApiRequest.infoById({ userId: tenant.userId }).then((res) => {
			if (res?.code === 0 && res.payload !== null) setUser(res.payload.result);
		});
	}, [tenant.userId]);

	if (!user) return null;

	return (
		<Card className="w-full max-w-sm">
			<CardContent className="p-4">
				<Link href={`/user/${tenant.userId}`} className="flex items-center space-x-4">
					<Avatar className="h-12 w-12">
						<AvatarImage src={user.imgAvatar} alt={user.username} />
						<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
					</Avatar>
					<div>
						<h4 className="text-base font-medium">{user.username}</h4>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</Link>
				<div className="mt-4 space-y-2 text-sm">
					<Link href={`/manage/${tenant.apartmentId}`} className="block">
						<InfoItem label="Dãy trọ" value={tenant.apartmentName} />
					</Link>
					<Link href={`/manage/room-type/${tenant.roomTypeId}`} className="block">
						<InfoItem label="Loại phòng" value={tenant.roomTypeName} />
					</Link>
					<Link href={`/manage/room/${tenant.roomId}`} className="block">
						<InfoItem label="Phòng" value={tenant.roomName} />
					</Link>
					<InfoItem label="Thời gian thuê" value={tenant.rentalDuration} />

					<InfoItem label="Bắt đầu" value={formatDate(tenant.startDate).toString()} />
					<InfoItem label="Kết thúc"
							  value={tenant.endDate !== "N/A" ? formatDate(tenant.endDate).toString() : "N/A"} />
				</div>
				<div className="mt-4 flex justify-between">
					<Badge variant={tenant.isAvailable ? "default" : "secondary"}>
						{tenant.isAvailable ? "Đang thuê" : "Đã trả phòng"}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between">
			<span className="font-medium">{label}:</span>
			<span className="text-muted-foreground">{value}</span>
		</div>
	);
}