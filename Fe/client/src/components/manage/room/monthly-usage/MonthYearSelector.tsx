// src/components/manage/room/MonthYearSelector.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface MonthYearSelectorProps {
	selectedMonth: number | null;
	setSelectedMonth: (month: number) => void;
	selectedYear: number | null;
	setSelectedYear: (year: number) => void;
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
																 selectedMonth,
																 setSelectedMonth,
																 selectedYear,
																 setSelectedYear
															 }) => {
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

	return (
		<div className="grid grid-cols-2 gap-1">
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
		</div>
	);
};

export default MonthYearSelector;