import React from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MonthYearSelectorProps {
	selectedMonth: number | null;
	setSelectedMonth: (month: number) => void;
	selectedYear: number | null;
	setSelectedYear: (year: number) => void;
}

const monthNames = [
	"Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
	"Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
];

export default function MonthYearSelector({
											  selectedMonth,
											  setSelectedMonth,
											  selectedYear,
											  setSelectedYear
										  }: MonthYearSelectorProps) {
	const currentYear = new Date().getFullYear();
	const years = [
		currentYear - 1,
		currentYear,
		currentYear + 1
	]

	return (
		<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="w-full sm:w-[180px] justify-between">
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
				{selectedMonth ? monthNames[selectedMonth - 1] : "Chọn Tháng"}
            </span>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[180px]">
					<ScrollArea className="h-[300px]">
						{monthNames.map((month, index) => (
							<DropdownMenuItem
								key={month}
								onSelect={() => setSelectedMonth(index + 1)}
								className="justify-between"
							>
								{month}
								{selectedMonth === index + 1 && (
									<span className="text-primary">✓</span>
								)}
							</DropdownMenuItem>
						))}
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="w-full sm:w-[180px] justify-between">
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
				{selectedYear || "Chọn Năm"}
            </span>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[180px]">
					<ScrollArea className="h-[300px]">
						{years.map((year) => (
							<DropdownMenuItem
								key={year}
								onSelect={() => setSelectedYear(year)}
								className="justify-between"
							>
								{year}
								{selectedYear === year && (
									<span className="text-primary">✓</span>
								)}
							</DropdownMenuItem>
						))}
					</ScrollArea>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
