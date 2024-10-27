"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MyProfileAvatar from "@/components/Profile/myprofile/MyProfileAvatar";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import { authApiRequest } from "@/apiRequests";

import logo from "@/assets/images/Logo.png"

export default function EditProfilePage() {

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { sessionToken: string }) =>
			authApiRequest.info(data.sessionToken)
	);

	const [user, setUser] = useState<infoResponse | undefined>(undefined);

	useEffect(() => {
		async function getInfo() {
			const res = await fetch({
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

	const [formData, setFormData] = useState({
		name: "Nguyễn Văn A",
		email: "nguyenvana@example.com",
		phone: "0123456789",
		idNumber: "123456789012"
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Xử lý cập nhật thông tin ở đây
		console.log("Đã cập nhật:", formData);
	};

	return (
		<Card className="max-w-2xl mx-auto">

			<CardHeader className="flex flex-col items-center space-y-4">
				<CardTitle>Chỉnh sửa thông tin</CardTitle>
			</CardHeader>
			<MyProfileAvatar urlImage={user?.result.imgAvatar || ""} />
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Họ tên</Label>
						<Input id="name" name="name" value={formData.name} onChange={handleChange} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Số điện thoại</Label>
						<Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="idNumber">Số căn cước</Label>
						<Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} />
					</div>
					<Button type="submit" className="w-full">Cập nhật</Button>
				</form>
			</CardContent>
		</Card>
	);
}