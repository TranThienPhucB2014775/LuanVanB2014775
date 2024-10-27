// src/components/manage/room/UtilityUsageForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import additionalCostRequest from "@/apiRequests/additionalCost";
import MonthYearSelector from "./MonthYearSelector";
import AdditionalCostInput from "./AdditionalCostInput";
import { Gauge, Loader2 } from "lucide-react";
import { invoiceApiRequest } from "@/apiRequests/invoice";
import { useToast } from "@/components/ui/use-toast";

function UtilityUsageForm({ roomId }: { roomId: string }) {
	const [additionCosts, setAdditionCosts] =
		useState<Array<additionalCostResponsesType>>();
	const [isCompleted, setIsCompleted] = useState(false);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth());
	const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear());

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<additionalCostResponsesType>>>(
		(data: { month: number; year: number; roomId: string; sessionToken: string }) =>
			additionalCostRequest.getUnrecordedAdditionalCost(data)
	);

	const { error: errorCompleteInvoice, isFetching: isFetchingCompleteInvoice, fetch: completeInvoice } =
		useFetch<ApiResponse<listResponse<additionalCostResponsesType>>>(
			(data: { month: number; year: number; roomId: string; sessionToken: string }) =>
				invoiceApiRequest.completeInvoice(data)
		);

	async function fetchData() {
		const res = await fetch({
			month: selectedMonth,
			year: selectedYear,
			roomId: roomId,
			sessionToken: localStorage.getItem("token") ?? ""
		});
		if (res?.code === 0) {
			setAdditionCosts(res.payload?.result.data);
			if (res.payload?.result.totalPage === 1) {
				setIsCompleted(false);
			}
		} else if (res?.code === 6025) {
			setAdditionCosts([]);
			setIsCompleted(true);
		} else {
			setIsCompleted(true);
		}
	}

	const { toast } = useToast();

	async function completeInvoiceData() {
		const res = await completeInvoice({
			month: selectedMonth,
			year: selectedYear,
			roomId: roomId,
			sessionToken: localStorage.getItem("token") ?? ""
		});
		if (res?.code === 0) {
			setAdditionCosts(undefined);
			setIsCompleted(true);
			toast({
				description: "Thành công",
				title: "Thành công"
			});
		} else if (res?.code === 6020) {
			toast({
				description: "Vui lòng ghi chỉ số sử dụng",
				title: "Thất bại",
				variant: "destructive"
			});
		} else {
			toast({
				description: "Có lỗi xảy ra",
				title: "Thất bại",
				variant: "destructive"
			});
		}
	}

	const handleApply = () => {
		fetchData();
	};

	function deleteValue(additionalCostId: string) {
		setAdditionCosts(additionCosts?.filter((value) => value.additionalCostId !== additionalCostId));
	}

	console.log(isCompleted);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="p-3" onClick={fetchData}>
					<Gauge className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ghi mức sử dụng</DialogTitle>
					<DialogDescription>
						Chọn tháng và năm để ghi mức sử dụng
					</DialogDescription>
				</DialogHeader>
				<MonthYearSelector
					selectedMonth={selectedMonth}
					setSelectedMonth={setSelectedMonth}
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
				/>
				<Button variant="secondary" onClick={handleApply}>Áp dụng</Button>
				<div className="grid gap-4 py-4">
					{isCompleted && <p>Đã hoàn thành</p>}
					{isFetching && <Loader2 className="h-4 w-4 animate-spin" />}
					{additionCosts?.map((value) => (
						<AdditionalCostInput
							key={value.additionalCostId}
							deleteValue={(additionalCostId: string) => deleteValue(additionalCostId)}
							month={selectedMonth ?? 0}
							year={selectedYear ?? 0}
							roomId={roomId}
							value={value} />
					))}
				</div>
				<DialogFooter>
					{
						!isCompleted && (
							<Button
								variant="secondary"
								onClick={completeInvoiceData}
								disabled={isFetchingCompleteInvoice}
							>
								{isFetchingCompleteInvoice ?
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Hoàn thành"}
							</Button>)
					}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default UtilityUsageForm;