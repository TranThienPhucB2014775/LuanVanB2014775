"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { invoiceType } from "@/dto/response/invoiceResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { invoiceApiRequest } from "@/apiRequests/invoice";
import { result } from "@/dto/result";
import { additionalCostTypes } from "@/constants/additionalCost";
import PageAnimate from "@/components/PageAnimate";
import LoadingSpinner from "@/components/LoadingSpinner";

const months = [
	"Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
	"Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
];

const years = ["2024", "2023", "2022", "2021", "2020"];

export default function InvoicePage({ roomId }: { roomId: string }) {
	const [month, setMonth] = useState<string>(new Date().getMonth().toString());
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());
	const [data, setData] = useState<invoiceType | undefined>(undefined);


	const { error, isFetching, fetch } = useFetch<ApiResponse<result<invoiceType>>>(
		(data: {
			roomId: string;
			month: number;
			year: number;
			sessionToken: string;
		}) => invoiceApiRequest.getInvoice(data)
	);


	const fetchInvoice = async () => {
		const response = await fetch({
			roomId,
			month: parseInt(month),
			year: parseInt(year),
			sessionToken: localStorage.getItem("token") || ""
		});
		console.log(response);
		if (response?.code === 0) {
			setData(response.payload?.result);
		}
	};

	return (
		<PageAnimate>
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold py-4">Hóa đơn</h1>
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Chọn Thời Gian Hóa Đơn</CardTitle>
					</CardHeader>
					<CardContent className="flex space-x-4">
						<Select value={month} onValueChange={setMonth}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Chọn tháng" />
							</SelectTrigger>
							<SelectContent>
								{months.map((m, index) => (
									<SelectItem key={index + 1} value={(index + 1).toString()}>
										{m}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={year} onValueChange={setYear}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Chọn năm" />
							</SelectTrigger>
							<SelectContent>
								{years.map((y) => (
									<SelectItem key={y} value={y}>
										{y}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button onClick={fetchInvoice}>Lấy Hóa Đơn</Button>
					</CardContent>
				</Card>

				{isFetching
					? <LoadingSpinner />
					: data ? (
							<>
								<Card className="mb-6">
									<CardHeader>
										<CardTitle>Tóm Tắt Chi Phí cho {months[parseInt(month) - 1]} {year}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-2xl font-bold">{data.cost.toLocaleString()} VND</p>
										<p className="text-sm text-muted-foreground">
											Giảm
											giá: {data.discount ? `${data.discount} (${data.discountType})` : "Không có"}
										</p>
										<p className="text-sm text-muted-foreground">
											Hóa đơn đang chờ: {data.pendingInvoice ? "Có" : "Không"}
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Chi Tiết Sử Dụng Hàng Tháng</CardTitle>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Tên</TableHead>
													<TableHead>Sử Dụng</TableHead>
													<TableHead>Tổng chi phí</TableHead>
													<TableHead>Loại Chi Phí</TableHead>
													<TableHead>Giá</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{data.monthlyUsageResponses.map((item, index) => (
													<TableRow key={index}>
														<TableCell>{item.name}</TableCell>
														<TableCell>{item.usage}</TableCell>
														<TableCell>{item.cost.toLocaleString()} VND</TableCell>
														<TableCell>
															{item.unit}
														</TableCell>
														<TableCell>{item.price.toLocaleString()} VND</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</>
						)
						: <div className="text-center text-gray-500 dark:text-gray-300">
							Không có dữ liệu
						</div>
				}
			</div>
		</PageAnimate>
	);
}