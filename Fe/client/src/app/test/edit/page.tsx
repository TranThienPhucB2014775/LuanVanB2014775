"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditProfilePage() {
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
	};

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader className="flex flex-col items-center space-y-4">
				<Image
					src="/placeholder.svg?height=128&width=128"
					alt="Avatar"
					width={128}
					height={128}
					className="rounded-full border-4 border-primary"
				/>
				<CardTitle>Chỉnh sửa thông tin</CardTitle>
			</CardHeader>
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