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
import { useToast } from "@/components/ui/use-toast";
import { roomResponse } from "@/dto/response/roomResponse";
import { roomRequest } from "@/dto/request/room";
import roomApiRequest from "@/apiRequests/room";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon } from "@heroicons/react/16/solid";
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

function RoomForm({ roomTypeId, room, type }: {
	roomTypeId: string,
	room: roomResponse | null;
	type: string
}) {
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const router = useRouter();

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: fetchUpdate
	} = useFetch<ApiResponse<roomResponse>>(
		(data: {
			name: string;
			roomId: string;
			sessionToken: string;
		}) => roomApiRequest.updateRoom(data)
	);

	const {
		error: errorCreate,
		isFetching: isFetchingCreate,
		fetch: fetchCreate
	} = useFetch<ApiResponse<roomResponse>>(
		(data: {
			sessionToken: string,
			data: typeof roomRequest
		}) => roomApiRequest.createRoom(data)
	);

	const form = useForm<z.infer<typeof roomRequest>>({
		resolver: zodResolver(roomRequest),
		defaultValues: {
			name: room?.name || "",
			roomTypeId: roomTypeId
		}
	});

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof roomRequest>) {
		let res: any = null;
		if (type === "update") {
			res = await fetchUpdate({
				sessionToken: localStorage.getItem("token"),
				name: values.name,
				roomId: room?.roomId
			});
		} else {
			res = await fetchCreate({
				sessionToken: localStorage.getItem("token"),
				data: {
					...values,
					name: values.name.split(",").map((item) => item.trim())
				}
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
		if (!room) {
			form.reset({
				name: "",
				roomTypeId: roomTypeId
			});
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div className="px-60">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{
										room === undefined
											? "Nhập tên loại phòng"
											: "Hãy nhập Tên loại phòng, nhiều phòng cách nhau bằng dấu \",\""
									}
								</FormLabel>
								<FormControl>
									<Input
										placeholder={"Nhập tên loại phòng"}
										{...field}
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
							Bạn có muốn tiếp tục thêm phòng mới hay quay lại trang trước?
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

export default RoomForm;