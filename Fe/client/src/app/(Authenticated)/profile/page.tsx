import { authApiRequest } from "@/apiRequests";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { mediaLink } from "@/constants/media";
import { CalendarDays, Facebook, Mail, MapPin, Phone, User } from "lucide-react";
import { formatDate } from "@/util/formatDate";
import React from "react";

async function Page() {
	const cookieStore = cookies();

	async function getInfo() {
		const token = cookieStore.get("sessionToken")?.value ?? "";
		if (!token) return;
		const res = await authApiRequest.info(token);
		if (res.payload !== null && res.payload !== undefined && res.error === null) {
			return res.payload;
		}
	}

	const user = await getInfo();

	return (
		<Card className="max-w-3xl mx-auto">
			<CardHeader className="flex flex-col items-center space-y-4">
				<Image
					src={`${mediaLink}/${user?.result.imgAvatar}`}
					alt="Avatar"
					width={128}
					height={128}
					className="rounded-full border-4 border-primary"
				/>
				<div className="text-center">
					<CardTitle className="text-2xl font-bold">{user?.result.username}</CardTitle>
					<p className="text-sm text-muted-foreground">{user?.result.role}</p>
					<div className="flex justify-center mt-2 space-x-2">
						<Badge variant={user?.result.isVerified ? "default" : "secondary"}>
							{user?.result.isVerified ? "Đã xác thực" : "Chưa xác thực"}
						</Badge>
						<Badge variant={user?.result.enable ? "default" : "destructive"}>
							{user?.result.enable ? "Đang hoạt động" : "Đã vô hiệu hóa"}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex items-center space-x-2">
						<Mail className="h-5 w-5 text-muted-foreground" />
						<span>{user?.result.email}</span>
					</div>
					{/*<div className="flex items-center space-x-2">*/}
					{/*	<User className="h-5 w-5 text-muted-foreground" />*/}
					{/*	<span>ID: {user?.result.id}</span>*/}
					{/*</div>*/}
					<div className="flex items-center space-x-2">
						<MapPin className="h-5 w-5 text-muted-foreground" />
						<span>{user?.result.city}, {user?.result.address}</span>
					</div>
					<div className="flex items-center space-x-2">
						<CalendarDays className="h-5 w-5 text-muted-foreground" />
						<span>Tham gia ngày {formatDate(user?.result.createdDate || "")}</span>
					</div>
					{user?.result.phoneNumber && (
						<div className="flex items-center space-x-2">
							<Phone className="h-5 w-5 text-muted-foreground" />
							<span>{user?.result.phoneNumber}</span>
						</div>
					)}
					{user?.result.facebook && (
						<div className="flex items-center space-x-2">
							<Facebook className="h-5 w-5 text-muted-foreground" />
							<a href={user?.result.facebook} target="_blank" rel="noopener noreferrer"
							   className="text-blue-500 hover:underline">
								Facebook Profile
							</a>
						</div>
					)}
				</div>
				{user?.result.aboutMe && (
					<div className="mt-6">
						<h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
						<p className="text-muted-foreground">{user?.result.aboutMe}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default Page;
