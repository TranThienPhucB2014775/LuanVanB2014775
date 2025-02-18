"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MyProfileAvatar from "@/components/Profile/myprofile/MyProfileAvatar";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import { authApiRequest } from "@/apiRequests";
import logo from "@/assets/images/Logo.png";
import { EditProfileFormValues, editProfileSchema } from "@/dto/response/infoResponse";
import { result } from "@/dto/result";
import accountApiRequest from "../../../../apiRequests/account";
import { useToast } from "@/components/ui/use-toast";

export default function EditProfilePage() {
	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { sessionToken: string }) => authApiRequest.info(data.sessionToken)
	);

	const { error: erorUpdateProfile, isFetching: isFetchingUpdateProfile, fetch: updateProfile }
		= useFetch<ApiResponse<result<string>>>(
		(data: {
			sessionToken: string,
			data: typeof editProfileSchema,
			userId: string
		}) => accountApiRequest.updateProfile(data)
	);

	const [user, setUser] = useState<infoResponse["result"] | undefined>(undefined);

	const form = useForm<EditProfileFormValues>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			userName: "",
			city: "",
			address: "",
			phoneNumber: "",
			aboutMe: "",
			facebook: "",
			zaloPhoneNumber: ""
		}
	});

	useEffect(() => {
		async function getInfo() {
			const res = await fetch({
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0 && res?.payload) {
				setUser(res?.payload.result);
				form.reset({
					userName: res.payload.result.username,
					city: res.payload.result.city,
					address: res.payload.result.address,
					phoneNumber: res.payload.result.phoneNumber,
					aboutMe: res.payload.result.aboutMe,
					facebook: res.payload.result.facebook,
					zaloPhoneNumber: res.payload.result.zaloPhoneNumber
				});
			} else if (error) {
				// Handle error
				console.error("Error fetching user info:", error);
			}
		}

		getInfo();
	}, []);

	const { toast } = useToast();

	const onSubmit = async (data: EditProfileFormValues) => {
		// Handle form submission here
		console.log(data);
		const res = await updateProfile({
			sessionToken: localStorage.getItem("token") || "",
			data,
			userId: user?.id
		});

		if (res?.code === 0) {
			toast({
				description: "Cập nhật thông tin thành công",
				title: "Thành công"
			});
		} else {
			toast({
				description: "Cập nhật thông tin thất bại",
				title: "Thất bại",
				variant: "destructive"
			});
		}

	};

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader className="flex flex-col items-center space-y-4">
				<CardTitle>Chỉnh sửa thông tin</CardTitle>
			</CardHeader>
			<MyProfileAvatar urlImage={user?.imgAvatar || ""} />
			<CardContent>
				<div className="space-y-4 mb-6">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" value={user?.email || ""} disabled />
					</div>
					<div className="space-y-2">
						<Label htmlFor="id">ID</Label>
						<Input id="id" value={user?.id || ""} disabled />
					</div>
					<div className="space-y-2">
						<Label htmlFor="createdDate">Ngày tạo</Label>
						<Input id="createdDate" value={user?.createdDate || ""} disabled />
					</div>
					<div className="space-y-2">
						<Label htmlFor="isVerified">Đã xác minh</Label>
						<Input id="isVerified" value={user?.isVerified ? "Có" : "Không"} disabled />
					</div>
					<div className="space-y-2">
						<Label htmlFor="enable">Kích hoạt</Label>
						<Input id="enable" value={user?.enable ? "Có" : "Không"} disabled />
					</div>
					<div className="space-y-2">
						<Label htmlFor="role">Vai trò</Label>
						<Input id="role" value={user?.role || ""} disabled />
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="userName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên người dùng</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thành phố</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa chỉ</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số điện thoại</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="aboutMe"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giới thiệu bản thân</FormLabel>
									<FormControl>
										<Textarea {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="facebook"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Facebook</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="zaloPhoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số điện thoại Zalo</FormLabel>
									<FormControl>
										<Input {...field} value={field.value ?? ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Cập nhật
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

