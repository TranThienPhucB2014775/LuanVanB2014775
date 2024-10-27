"use client";

import React, { useState } from "react";
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
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import { apartmentRequest } from "@/dto/request/apartment";
import apartmentApiRequest from "@/apiRequests/apartment";
import roonType from "@/apiRequests/roonType";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { useToast } from "@/components/ui/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RoomTypeForm({ apartmentId, roomType, type }: {
	apartmentId: string,
	roomType: roomTypeResponse | null;
	type: string
}) {
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const router = useRouter();

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
			utility: roomType ? roomType.utility : "",
			maxOccupancy: roomType ? roomType.maxOccupancy : 0
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
			setShowConfirmDialog(true);
		} else {
			toast({
				description: type === "update" ? "Cập nhật thất bại" : "Tạo mới thất bại",
				variant: "destructive"
			});
		}
	}

	const handleContinue = () => {
		setShowConfirmDialog(false);
		if (!roomType) {
			form.reset({
				apartmentId: apartmentId,
				name: "",
				description: "",
				info: "",
				utility: "",
				maxOccupancy: 0
			});
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div className="lg:px-80 px-1">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên loại phòng</FormLabel>
								<FormControl>
									<Input
										placeholder="Hãy nhập Tên loại phòng"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="maxOccupancy"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Số lượng người</FormLabel>
								<FormControl>
									<Input
										type={"number"}
										placeholder="Hãy nhập số lượng người tối đa"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
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
								<FormLabel>Tiện ích</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Hãy nhập Tiện ích"
										{...field}
										className="h-32"
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
								<FormLabel>Mô tả</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Hãy nhập Mô tả"
										{...field}
										className="h-44"
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
								<FormLabel>Thông tin</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Hãy nhập Thông tin"
										{...field}
										className="h-44"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-40">
						<span className="text-white">
							Lưu
						</span>
					</Button>
				</form>
			</Form>

			<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Xác nhận</DialogTitle>
						<DialogDescription>
							Bạn có muốn tiếp tục hay quay lại trang trước?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={handleContinue}>Tiếp tục</Button>
						<Link href="./">
							<Button variant="outline">
								Quay lại
							</Button>
						</Link>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default RoomTypeForm;