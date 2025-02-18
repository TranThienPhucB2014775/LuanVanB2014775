"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { tenantResponsesType } from "@/dto/response/tenantResponse";
import tenantApiRequest from "@/apiRequests/tenant";
import summaryApiRequest from "@/apiRequests/summary";
import { SummaryResponse, totalInvoiceResponse } from "@/dto/response/SummaryResponse";
import { result } from "@/dto/result";
import { invoiceApiRequest } from "@/apiRequests/invoice";
import { useToast } from "@/components/ui/use-toast";

const months = [
	"Tất cả", "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
	"Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
];

const years = ["2024", "2023", "2022", "2021", "2020"];

function FilterRevenue({ apartmentId, roomTypeId, roomId }: {
	apartmentId?: string,
	roomTypeId?: string,
	roomId?: string
}) {

	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [totalRevenue, setTotalRevenue] = useState<number | null>(null);

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<totalInvoiceResponse>>>(
		(data: {
			sessionToken: string;
			params: string
		}) => invoiceApiRequest.getTotalPriceInvoice(data)
	);

	const { toast } = useToast();

	const fetchInvoice = async () => {

		setTotalRevenue(null);

		let params = new URLSearchParams();

		if (month !== "" && year !== "") {
			if (month === "1") {
				params.append("year", year);
			} else {
				params.append("month", (parseInt(month) - 1).toString());
				params.append("year", year);
			}
		} else {
			if(year === "") {
				toast({
					description: "Vui lòng ít nhất phải chọn năm",
					title: "Lỗi",
					variant: "destructive"
				});
				return;
			}
		}

		if (apartmentId) {
			params.append("apartmentId", apartmentId);
		}
		if (roomTypeId) {
			params.append("roomTypeId", roomTypeId);
		}
		if (roomId) {
			params.append("roomId", roomId);
		}

		const res = await fetch({
			sessionToken: localStorage.getItem("token") || "",
			params: params.toString()
		});

		if (res?.code === 0) {
			setTotalRevenue(res?.payload?.result?.total || 0);
		}
	};

	return (
		<div className="">
			<Card>
				<CardHeader>
					<CardTitle>Lọc Doanh thu</CardTitle>
					<CardDescription>Nhập tháng (tùy chọn) và năm để lấy tổng doanh thu</CardDescription>
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
					<Button onClick={fetchInvoice}>Lấy doanh thu</Button>
				</CardContent>
				{totalRevenue !== null && (
					<p className="text-lg font-semibold px-6 pb-6">
						Tổng doanh thu: {totalRevenue.toLocaleString()} VND
					</p>
				)}
			</Card>

		</div>
	);
}

export default FilterRevenue;