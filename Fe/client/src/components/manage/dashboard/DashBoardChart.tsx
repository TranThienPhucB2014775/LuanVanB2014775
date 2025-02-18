"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { totalInvoiceResponse } from "@/dto/response/SummaryResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import summaryApiRequest from "@/apiRequests/summary";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
	month: z.string().regex(/^(0?[1-9]|1[012])$/, "Tháng phải từ 1 đến 12"),
	year: z.string().regex(/^\d{4}$/, "Năm phải có 4 chữ số"),
	numMonths: z.enum(["3", "6", "9", "12"], {
		required_error: "Vui lòng chọn số tháng hiển thị"
	})
});

function DashBoardChart({
							roomId,
							roomTypeId,
							apartmentId
						}: {
	roomId?: string;
	roomTypeId?: string;
	apartmentId?: string;
}) {
	const [totalInvoices, setTotalInvoices] = useState<totalInvoiceResponse[]>([]);

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<totalInvoiceResponse[]>>>(
		(data: { sessionToken: string; params: string }) => summaryApiRequest.getTotalInvoices(data)
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			month: new Date().getMonth() + 1 + "",
			year: new Date().getFullYear() + "",
			numMonths: "6"
		}
	});

	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-white p-4 border border-gray-200 rounded shadow">
					<p className="font-bold">{`Tháng ${data.month}, ${data.year}`}</p>
					<p>{`Doanh thu: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.total)}`}</p>
				</div>
			);
		}
		return null;
	};

	useEffect(() => {
		async function fetchData() {
			const params = new URLSearchParams();
			if (roomId) {
				params.append("roomId", roomId);
			}
			if (roomTypeId) {
				params.append("roomTypeId", roomTypeId);
			}
			if (apartmentId) {
				params.append("apartmentId", apartmentId);
			}
			const res = await fetch({
				sessionToken: localStorage.getItem("token"),
				params: params
			});
			if (res && res.payload && res.payload.result) {
				setTotalInvoices(res.payload.result);
			}
		}

		fetchData();
	}, []);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const params = new URLSearchParams();
		if (roomId) {
			params.append("roomId", roomId);
		}
		if (roomTypeId) {
			params.append("roomTypeId", roomTypeId);
		}
		if (apartmentId) {
			params.append("apartmentId", apartmentId);
		}
		params.append("year", values.year);
		params.append("month", values.month);
		params.append("months", values.numMonths);


		const response = await fetch({
			sessionToken: localStorage.getItem("token"), // Replace with actual session token
			params: params
		});
		if (response && response.payload && response.payload.result) {
			setTotalInvoices(response.payload.result);
		}
	}

	console.log("totalInvoices", totalInvoices);

	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

	return (
		<Card className="mb-8 w-full">
			<CardHeader>
				<CardTitle>Biểu đồ doanh thu</CardTitle>
				<CardDescription>Doanh thu hàng tháng</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 mb-4">
						<FormField
							control={form.control}
							name="month"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tháng</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Chọn tháng" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{months.map((m) => (
												<SelectItem key={m} value={m + ""}>
													Tháng {m}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="year"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Năm</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Chọn năm" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{years.map((y) => (
												<SelectItem key={y} value={y + ""}>
													Năm {y}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="numMonths"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số tháng hiển thị</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Số tháng hiển thị" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{[3, 6, 9, 12].map((n) => (
												<SelectItem key={n} value={n + ""}>
													{n} tháng
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-8">
							<Button type="submit" disabled={isFetching}>
								{isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
								Áp dụng
							</Button>
						</div>
					</form>
				</Form>
				<ChartContainer
					config={{
						revenue: {
							label: "doanh thu :",
							color: "hsl(var(--chart-1))"
						}
					}}
					className="h-[400px] w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={totalInvoices.slice(-parseInt(form.getValues().numMonths))}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Bar dataKey="total" fill="var(--color-revenue)" name="Doanh thu " />
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default DashBoardChart;