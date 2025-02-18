"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { additionalCostTypes } from "@/constants/additionalCost";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import additionalCostRequest from "@/apiRequests/additionalCost";
import { monthlyUsageApiRequest } from "@/apiRequests/monthlyUsage";
import { result } from "@/dto/result";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface AdditionalCostInputProps {
	value: additionalCostResponsesType;
}

function AdditionalCostInput({ value, deleteValue, month, year, roomId }: {
	value: additionalCostResponsesType;
	deleteValue: Function;
	month: number;
	year: number;
	roomId: string
}) {

	const { toast } = useToast();
	const inputRef = useRef<HTMLInputElement>(null);

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<string>>>(
		({
			 data,
			 sessionToken
		 }: {
			data: {
				month: number,
				year: number,
				additionalCostId: string,
				usage: number,
				roomId: string
			};
			sessionToken: string;
		}) =>
			monthlyUsageApiRequest.createMonthlyUsage({ data, sessionToken })
	);

	async function handleApply() {
		const inputValue = inputRef.current?.value ? Number(inputRef.current.value) : 0;
		const res = await fetch({
			data: {
				month: month,
				year: year,
				additionalCostId: value.additionalCostId,
				usage: inputValue,
				roomId: roomId
			},
			sessionToken: localStorage.getItem("token") ?? ""
		});

		if (res?.code === 0) {
			deleteValue(value.additionalCostId);
			toast({ description: `Ghi giá trị sử dụng ${value.name} thành công`, title: "Thành công" });
		} else if (res?.code === 6025) {
			toast({ description: `Đã khóa hóa đơn, không thể ghi`, variant: "destructive", title: "Thất bại" });
		} else if (res?.code === 6028) {
			toast({
				description: `Không thể ghi khi tương lai đã có hóa đơn`,
				title: "Thất bại",
				variant: "destructive"
			});
		} else if (res?.code === 6031) {
			toast(
				{
					title: "Thất bại",
					description: "Không thể nghi thấp hơn hoặc bằng tháng trước",
					variant: "destructive"
				}
			);
		} else {
			toast({
				description: `Ghi giá trị sử dụng ${value.name} thất bại`,
				variant: "destructive",
				title: "Thất bại"
			});
		}
	}


	return (
		<div className="grid grid-cols-5 items-center gap-4" key={value.additionalCostId}>
			<Label htmlFor="name" className="text-right">
				{value.name}
			</Label>
			<Input
				id="name"
				type="number"
				defaultValue="0"
				className={`col-span-3 ${value.additionalCostType !== additionalCostTypes[0].value && "opacity-0"}`}
				ref={inputRef}
			/>
			<Button onClick={handleApply}>
				{isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Ghi"}
			</Button>
		</div>
	);
}
;

export default AdditionalCostInput;