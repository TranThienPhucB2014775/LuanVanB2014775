"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteCreationRequest } from "@/dto/request/invitations";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { formatDate, formatToDate } from "@/util/formatDate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { additionalCostCreationRequest } from "@/dto/request/AdditionalCostRequest";
import additionalCostRequest from "@/apiRequests/additionalCost";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import inventionApiRequest from "@/apiRequests/invitation";
import { useToast } from "@/components/ui/use-toast";
import { contractResponses } from "@/dto/response/contract";
import CurrencyInput from "@/components/CurrencyInput";

function TenantForm(
	{
		roomId,
		isRoomOccupied,
		contract
	}:
		{
			roomId: string;
			isRoomOccupied: boolean;
			contract: contractResponses | undefined;
		}) {

	const {
		error,
		isFetching,
		fetch
	} = useFetch<ApiResponse<result<InvitationResponse>>>(
		(
			{
				inviteCreationRequest,
				roomId,
				sessionToken
			}: {
				inviteCreationRequest: object;
				roomId: string;
				sessionToken: string;
			}
		) => inventionApiRequest.inviteTenant({ inviteCreationRequest, roomId, sessionToken })
	);

	const form = useForm<z.infer<typeof InviteCreationRequest>>({
		resolver: zodResolver(InviteCreationRequest),
		defaultValues: {
			email: "",
			message: "",
			price: contract !== undefined ? contract.price : 0,
			userId: "",
			startDate: contract !== undefined ? formatToDate(contract.startDate) : new Date(),
			endDate: contract !== undefined ? formatToDate(contract.expectedEndDate) : new Date(),
			depositAmount: contract !== undefined ? contract.depositAmount : 0
		}
	});

	const [showStartCalendar, setShowStartCalendar] = useState(false);
	const [showEndCalendar, setShowEndCalendar] = useState(false);

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof InviteCreationRequest>) {

		const inviteCreationRequest: any = {
			...values,
			startDate: formatToDate(values.startDate.toString()),
			endDate: formatToDate(values.endDate.toString())
		};
		if (inviteCreationRequest["userId"] === "") {
			delete inviteCreationRequest["userId"];
		}
		if (inviteCreationRequest["email"] === "") {
			delete inviteCreationRequest["email"];
		}

		console.log(inviteCreationRequest);

		const res = await fetch({
			inviteCreationRequest,
			roomId: roomId,
			sessionToken: localStorage.getItem("token") || ""
		});
		if (res?.code === 0) {
			toast({
				description: "Gửi lời mời thành công"
			});
		} else if (res?.code === 6012) {
			toast({
				title: "Thất bại",
				description: "Tài khoản không tồn tại",
				variant: "destructive"
			});
		} else if (res?.code === 6019) {
			toast({
				title: "Thất bại",
				description: "Tài khoản người thuê chưa xác thực",
				variant: "destructive"
			});
		} else if (res?.code === 6020) {
			toast({
				title: "Thất bại",
				description: "Tài khoản của bạn chưa xác thực",
				variant: "destructive"
			});
		} else {
			toast({
				title: "Thất bại",
				description: "Gửi lời mời thất bại",
				variant: "destructive"
			});
		}
	}

	console.log(isRoomOccupied);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="email@example.com" {...field} />
							</FormControl>
							<FormDescription>
								Nhập email của người thuê (hoặc userId bên dưới)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="userId"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="User Id" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Nhập tin nhắn cho người thuê" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Ngày bắt đầu</FormLabel>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-full pl-3 text-left font-normal",
										!field.value && "text-muted-foreground"
									)}
									onClick={() => {
										!isRoomOccupied && setShowStartCalendar(!showStartCalendar);
									}}
									type="button"
								>
									{field.value ? (
										format(field.value, "dd/MM/yyyy")
									) : (
										<span>Chọn ngày</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
							{showStartCalendar && !isRoomOccupied && (
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
									disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
									initialFocus
									className="rounded-md border w-fit"
								/>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Ngày kết thúc</FormLabel>
							<FormControl>
								<Button
									variant={"outline"}
									className={cn(
										"w-full pl-3 text-left font-normal",
										!field.value && "text-muted-foreground"
									)}
									onClick={() => {
										!isRoomOccupied && setShowEndCalendar(!showEndCalendar);
									}}
									type="button"
								>
									{field.value ? (
										format(field.value, "dd/MM/yyyy")
									) : (
										<span>Chọn ngày</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
							{showEndCalendar && !isRoomOccupied && (
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
									disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
									initialFocus
									className="rounded-md border w-fit"
								/>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giá thuê</FormLabel>
							<FormControl>
								<CurrencyInput  {...field}
												disabled={isRoomOccupied}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="depositAmount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Đặt cọc</FormLabel>
							<FormControl>
								<CurrencyInput {...field}
											   disabled={isRoomOccupied}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>);
}


export default TenantForm;