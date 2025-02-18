"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function WriteNotification({ sendNotification, id }: {
	sendNotification: (data: {
		sessionToken: string,
		id: string
		data: {
			title: string;
			message: string;
		}
	}) => Promise<ApiResponse<result<string>>>;
	id: string;
}) {
	const [formData, setFormData] = useState({
		message: "",
		title: ""
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<string>>>(
		(data: {
			sessionToken: string,
			id: string
			data: {
				title: string;
				message: string;
			}
		}) => sendNotification(data)
	);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await sendNotification({
			sessionToken: localStorage.getItem("token") || "",
			id,
			data: {
				title: formData.title,
				message: formData.message
			}
		});
		if (res.code === 0) {
			toast({
				description: "Gửi thông báo thành công",
				title: "Thành công"
			});
		} else {
			toast({
				description: "Gửi thông báo thất bại",
				title: "Thất bại",
				variant: "destructive"
			});
		}
	};

	return (
		<div className="py-4 flex items-center justify-center">
			<Card className="w-full">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold flex items-center gap-2">
						<Bell className="w-6 h-6" />
						Viết thông báo
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="title" className="text-sm font-medium">
								Tiêu đề
							</Label>
							<Input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="message" className="text-sm font-medium">
								Tin nhắn
							</Label>
							<Textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleInputChange}
								rows={5}
								className="w-full px-3 py-2 border rounded-md resize-none"
							/>
						</div>
						<Button
							type="submit"
							className="bg-primary text-primary-foreground hover:bg-primary/90"
							disabled={isFetching}
						>
							{isFetching ? "Đang gửi..." : "Gửi thông báo"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}