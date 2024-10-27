"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomTypeRequest } from "@/dto/request/RoomTypeRequest";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function RoomTypeForm({ apartmentId, roomType, type }: {
	apartmentId: string,
	roomType: roomTypeResponse | null
	type: string
}) {
	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: fetchUpdate
	} = useFetch<ApiResponse<roomTypeResponse>>(
		(data: {
			sessionToken: string,
			data: typeof roomTypeRequest
			roomTypeId: string
		}) => roomTypeApiRequest.updateRoomType(data)
	);

	const {
		error: errorCreate,
		isFetching: isFetchingCreate,
		fetch: fetchCreate
	} = useFetch<ApiResponse<roomTypeResponse>>(
		(data: {
			sessionToken: string,
			data: typeof roomTypeRequest
		}) => roomTypeApiRequest.createRooType(data)
	);

	const form = useForm<z.infer<typeof roomTypeRequest>>({
		resolver: zodResolver(roomTypeRequest),
		defaultValues: {
			apartmentId: apartmentId,
			name: roomType ? roomType.name : "",
			description: roomType ? roomType.description : "",
			info: roomType ? roomType.info : "",
			utility: roomType ? roomType.utility : ""
		}
	});

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof roomTypeRequest>) {
		let res: any = null;
		if (type === "update") {
			res = await fetchUpdate({
				sessionToken: localStorage.getItem("token"),
				data: values,
				roomTypeId: roomType?.roomTypeId
			});
		} else {
			res = await fetchCreate({
				sessionToken: localStorage.getItem("token"),
				data: values
			});
		}

		if (res.code === 0) {
			toast({ description: type === "update" ? "Cập nhật thành công" : "Tạo mới thành công" });
		} else {
			toast({
				description: type === "update" ? "Cập nhật thất bại" : "Tạo mới thất bại",
				variant: "destructive"
			});
		}
	}

	return (
		<Card className="w-full max-w-2xl mx-auto shadow-lg">
			<CardHeader className="bg-primary text-primary-foreground">
				<CardTitle className="text-2xl font-bold">
					{type === "update" ? "Cập nhật loại phòng" : "Tạo mới loại phòng"}
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Tên loại phòng</FormLabel>
									<FormControl>
										<Input
											placeholder="Hãy nhập Tên loại phòng"
											{...field}
											className="text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="utility"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Tiện ích</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Hãy nhập Tiện ích"
											{...field}
											className="h-32 text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Mô tả</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Hãy nhập Mô tả"
											{...field}
											className="h-44 text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="info"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-semibold">Thông tin</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Hãy nhập Thông tin"
											{...field}
											className="h-44 text-base"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full text-lg font-semibold py-6"
							disabled={isFetchingUpdate || isFetchingCreate}
						>
							{isFetchingUpdate || isFetchingCreate ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Đang xử lý...
								</>
							) : (
								"Lưu"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}