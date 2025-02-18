"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Phone, TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportIssueRequest } from "@/dto/request/ReportIssueRequest";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { ReportIssueResponse } from "@/dto/response/ReportIssueResponse";
import { ReportIssueApiRequest } from "@/apiRequests/reportIssue";
import { useToast } from "@/components/ui/use-toast";
import WriteReview from "@/components/feedBack/ReviewForm";

function CurrentRoomHeader(
	{ roomId, apartmentId }: { roomId: string; apartmentId: string }
) {

	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const {
		error: errorReportIssue,
		isFetching: isFetchingReportIssue,
		fetch: reportIssue
	} = useFetch<ApiResponse<result<ReportIssueResponse>>>(
		(data: {
			data: typeof ReportIssueRequest,
			sessionToken: string,
			roomId: string
		}) => ReportIssueApiRequest.createReportIssueService(data)
	);

	const form = useForm<z.infer<typeof ReportIssueRequest>>({
		resolver: zodResolver(ReportIssueRequest),
		defaultValues: {
			title: "",
			description: ""
		}
	});

	async function onSubmit(values: z.infer<typeof ReportIssueRequest>) {
		const res = await reportIssue({
			data: values,
			sessionToken: localStorage.getItem("token") ?? "",
			roomId: roomId
		});
		if (res?.code === 0) {
			toast({ description: "Gửi liên hệ với chủ trọ thành công" });
		} else {
			toast({ description: "Gửi liên hệ với chủ trọ", variant: "destructive" });
		}
	}

	return (
		<div className="flex justify-end gap-2">
			{/*<AlertDialog>*/}
			{/*	<AlertDialogTrigger asChild>*/}
			{/*		<Button variant="destructive">*/}
			{/*			<LogOut className="w-4 h-4 mr-1" />*/}
			{/*			Rời phòng*/}
			{/*		</Button>*/}
			{/*	</AlertDialogTrigger>*/}
			{/*	<AlertDialogContent>*/}
			{/*		<AlertDialogHeader>*/}
			{/*			<AlertDialogTitle>*/}
			{/*				Bạn có chắc chắn muốn rời phòng?*/}
			{/*			</AlertDialogTitle>*/}
			{/*			<AlertDialogDescription>*/}
			{/*				Hành động này không thể hoàn tác. Bạn sẽ rời khỏi phòng và không thể truy cập lại.*/}
			{/*			</AlertDialogDescription>*/}
			{/*		</AlertDialogHeader>*/}
			{/*		<AlertDialogFooter>*/}
			{/*			<AlertDialogCancel>Hủy</AlertDialogCancel>*/}
			{/*			<AlertDialogAction>Rời phòng</AlertDialogAction>*/}
			{/*		</AlertDialogFooter>*/}
			{/*	</AlertDialogContent>*/}
			{/*</AlertDialog>*/}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="default">
						<Phone className="w-4 h-4 mr-1" />
						Liên hệ
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Liên hệ chủ trọ</DialogTitle>
						<DialogDescription>
							Vui lòng điền thông tin về vấn đề bạn gặp phải. Chúng tôi sẽ liên hệ lại sớm nhất có thể.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										{/*<FormLabel>Tiêu đề</FormLabel>*/}
										<FormControl>
											<Input placeholder="Nhập tiêu đề" {...field} />
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
										{/*<FormLabel>Username</FormLabel>*/}
										<FormControl>
											<Textarea placeholder="Nhập nội dung" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">{
								isFetchingReportIssue ? "Đang gửi" : "Gửi"
							}</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
			<WriteReview FeedBackType="APARTMENT" itemId={apartmentId} updateFeedBack={() => null} />
		</div>
	);
}

export default CurrentRoomHeader;