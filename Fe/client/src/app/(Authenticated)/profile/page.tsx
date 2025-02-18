import { authApiRequest } from "@/apiRequests";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { mediaLink } from "@/constants/media";
import { CalendarDays, Facebook, Mail, MapPin, Phone, User, Zap } from "lucide-react";
import { formatDate } from "@/util/formatDate";
import React from "react";

export type InfoResponse = {
	result: {
		email: string;
		username: string;
		city: string;
		address: string;
		enable: boolean;
		createdDate: string;
		imgAvatar: string;
		phoneNumber: string;
		role: string;
		aboutMe: string;
		isVerified: boolean;
		facebook: string;
		zaloPhoneNumber: string;
	};
};

async function Page() {
	const cookieStore = cookies();

	async function getInfo(): Promise<InfoResponse | undefined> {
		const token = cookieStore.get("sessionToken")?.value ?? "";
		if (!token) return;
		const res = await authApiRequest.info(token);
		if (res.payload !== null && res.payload !== undefined && res.error === null) {
			return res.payload;
		}
	}

	const user = await getInfo();

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<Card className="max-w-4xl mx-auto shadow-lg">
			<CardHeader
				className="flex flex-col items-center space-y-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg pb-6">
				<Image
					src={`${mediaLink}/${user.result.imgAvatar}`}
					alt="Avatar"
					width={150}
					height={150}
					className="rounded-full border-4 border-primary shadow-md"
				/>
				<div className="text-center">
					<CardTitle className="text-3xl font-bold">{user.result.username}</CardTitle>
					<p className="text-lg text-muted-foreground mt-1">{user.result.role}</p>
					<div className="flex justify-center mt-3 space-x-2">
						<Badge variant={user.result.isVerified ? "default" : "secondary"} className="px-3 py-1">
							{user.result.isVerified ? "Đã xác thực" : "Chưa xác thực"}
						</Badge>
						<Badge variant={user.result.enable ? "default" : "destructive"} className="px-3 py-1">
							{user.result.enable ? "Đang hoạt động" : "Đã vô hiệu hóa"}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-6 pt-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InfoItem icon={Mail} label="Email" value={user.result.email} />
					<InfoItem icon={MapPin} label="Thành phố" value={user.result.city} />
					<InfoItem icon={MapPin} label="Địa chỉ" value={user.result.address} />
					<InfoItem icon={CalendarDays} label="Ngày tham gia" value={formatDate(user.result.createdDate)} />
					<InfoItem icon={Phone} label="Số điện thoại" value={user.result.phoneNumber} />
					<InfoItem icon={Facebook} label="Facebook" value={user.result.facebook} isLink />
					<InfoItem icon={Zap} label="Zalo" value={user.result.zaloPhoneNumber} />
				</div>
				{user.result.aboutMe && (
					<div className="mt-8 bg-muted/50 p-4 rounded-lg">
						<h3 className="text-xl font-semibold mb-3">Giới thiệu</h3>
						<p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{user.result.aboutMe}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

interface InfoItemProps {
	icon: React.ElementType;
	label: string;
	value?: string;
	isLink?: boolean;
}

function InfoItem({ icon: Icon, label, value, isLink = false }: InfoItemProps) {
	if (!value) return null;

	return (
		<div className="flex items-center space-x-3 bg-muted/30 p-3 rounded-md">
			<Icon className="h-5 w-5 text-primary" />
			<div>
				<p className="text-sm text-muted-foreground">{label}</p>
				{isLink ? (
					<a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
						{value}
					</a>
				) : (
					<p className="font-medium">{value}</p>
				)}
			</div>
		</div>
	);
}

export default Page;

