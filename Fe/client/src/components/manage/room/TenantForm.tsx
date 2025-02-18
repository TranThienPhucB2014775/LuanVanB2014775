"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteCreationRequest } from "@/dto/request/invitations";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, addMonths, addYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { formatDate, formatToDate } from "@/util/formatDate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import inventionApiRequest from "@/apiRequests/invitation";
import { useToast } from "@/components/ui/use-toast";
import { contractResponses } from "@/dto/response/contract";
import CurrencyInput from "@/components/CurrencyInput";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

function TenantForm({
						roomId,
						isRoomOccupied,
						contract
					}: {
	roomId: string
	isRoomOccupied: boolean
	contract: contractResponses | undefined
}) {

	const [identifierType, setIdentifierType] = useState("email");

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<InvitationResponse>>>(
		({ inviteCreationRequest, roomId, sessionToken }: {
			inviteCreationRequest: object;
			roomId: string;
			sessionToken: string
		}) =>
			inventionApiRequest.inviteTenant({ inviteCreationRequest, roomId, sessionToken })
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
	const [durationValue, setDurationValue] = useState(1);
	const [durationUnit, setDurationUnit] = useState("months");

	const { toast } = useToast();

	useEffect(() => {
		const startDate = form.getValues("startDate");
		let endDate;

		if (durationValue < 1) {
			endDate = startDate;
		} else if (durationUnit === "months") {
			endDate = addMonths(startDate, durationValue);
		} else {
			endDate = addYears(startDate, durationValue);
		}

		form.setValue("endDate", endDate);
	}, [form, form.watch("startDate"), durationValue, durationUnit]);

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
				<Card>
					<CardContent className="pt-6">
						<FormItem className="space-y-4">
							<FormLabel>Chọn phương thức mời</FormLabel>
							<RadioGroup
								defaultValue="email"
								onValueChange={(value) => setIdentifierType(value)}
								className="flex flex-col space-y-1"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="email" id="email" />
									<Label htmlFor="email">Email</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="userId" id="userId" />
									<Label htmlFor="userId">User ID</Label>
								</div>
							</RadioGroup>
						</FormItem>

						{identifierType === "email" ? (
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="email@example.com" {...field} />
										</FormControl>
										<FormDescription>Nhập email của người thuê</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<FormField
								control={form.control}
								name="userId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>User ID</FormLabel>
										<FormControl>
											<Input placeholder="Nhập User ID" {...field} />
										</FormControl>
										<FormDescription>Nhập User ID của người thuê</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</CardContent>
				</Card>
				{/*<FormField*/}
				{/*	control={form.control}*/}
				{/*	name="email"*/}
				{/*	render={({ field }) => (*/}
				{/*		<FormItem>*/}
				{/*			<FormControl>*/}
				{/*				<Input placeholder="email@example.com" {...field} />*/}
				{/*			</FormControl>*/}
				{/*			<FormDescription>Nhập email của người thuê (hoặc userId bên dưới)</FormDescription>*/}
				{/*			<FormMessage />*/}
				{/*		</FormItem>*/}
				{/*	)}*/}
				{/*/>*/}
				{/*<FormField*/}
				{/*	control={form.control}*/}
				{/*	name="userId"*/}
				{/*	render={({ field }) => (*/}
				{/*		<FormItem>*/}
				{/*			<FormControl>*/}
				{/*				<Input placeholder="User Id" {...field} />*/}
				{/*			</FormControl>*/}
				{/*			<FormMessage />*/}
				{/*		</FormItem>*/}
				{/*	)}*/}
				{/*/>*/}
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
				{
					!isRoomOccupied && <>
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Ngày bắt đầu</FormLabel>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
											onClick={() => {
												!isRoomOccupied && setShowStartCalendar(!showStartCalendar);
											}}
											type="button"
										>
											{field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
									{showStartCalendar && !isRoomOccupied && (
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setShowStartCalendar(false);
											}}
											disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
											initialFocus
											className="rounded-md border w-fit"
										/>
									)}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormItem className="flex flex-col">
							<FormLabel>Thời hạn hợp đồng</FormLabel>
							<div className="flex space-x-2">
								<Input
									type="number"
									min="1"
									max="100"
									value={durationValue}
									onChange={(e) => setDurationValue(Math.max(1, parseInt(e.target.value) || 1))}
									className="w-1/3"
								/>
								<Select value={durationUnit} onValueChange={setDurationUnit}>
									<SelectTrigger className="w-2/3">
										<SelectValue placeholder="Chọn đơn vị thời gian" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="months">Tháng</SelectItem>
										<SelectItem value="years">Năm</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</FormItem>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày kết thúc</FormLabel>
									<FormControl>
										<Input
											value={format(field.value, "dd/MM/yyyy")}
											disabled
											className="bg-muted"
										/>
									</FormControl>
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
										<CurrencyInput {...field} disabled={isRoomOccupied} />
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
										<CurrencyInput {...field} disabled={isRoomOccupied} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				}
				<Button type="submit">Gửi</Button>
			</form>
		</Form>
	);
}

export default TenantForm;