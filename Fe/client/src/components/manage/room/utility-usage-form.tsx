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
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gauge } from "lucide-react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { roomResponse } from "@/dto/response/roomResponse";
import roomApiRequest from "@/apiRequests/room";
import additionalCostRequest from "@/apiRequests/additionalCost";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { additionalCostTypes } from "@/constants/additionalCost";

function UtilityUsageForm({ roomId }: { roomId: string }) {
	const [additionCosts, setAdditionCosts] =
		useState<Array<additionalCostResponsesType>>();

	const [selectedMonth, setSelectedMonth] = useState<number | null>(
		new Date().getMonth()
	);
	const [selectedYear, setSelectedYear] = useState<number | null>(
		new Date().getFullYear()
	);

	const months = Array.from({ length: 12 }, (_, i) => (i + 1));
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => (currentYear - i));

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<additionalCostResponsesType>>>(
		(data: {
			month: number;
			year: number;
			roomId: string;
			sessionToken: string;
		}) => additionalCostRequest.getUnrecordedAdditionalCost(data)
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
		}

	}

	const handleApply = () => {
		fetchData();
	};

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
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-4 gap-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">{selectedMonth || "Chọn tháng"}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Select Month</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{months.map((month) => (
								<DropdownMenuItem key={month} onSelect={() => setSelectedMonth(month)}>
									{month}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">{selectedYear || "Chọn năm"}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Select Year</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{years.map((year) => (
								<DropdownMenuItem key={year} onSelect={() => setSelectedYear(year)}>
									{year}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="secondary" onClick={handleApply}>Áp dụng</Button>
				</div>
				<div className="grid gap-4 py-4">
					{
						additionCosts?.map((value) => {
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
									/>
									<Button>Ghi</Button>
								</div>
							);
						})
					}
				</div>
				<DialogFooter>
					<Button type="submit">Lưu</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default UtilityUsageForm;