"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const sortOptions = [
	{
		value: "createdAt",
		order: "desc",
		name: "Mới nhất"
	},
	{
		value: "createdAt",
		order: "asc",
		name: "Cũ nhất"
	},
	{
		value: "name",
		order: "desc",
		name: "Tên A-Z"
	},
	{
		value: "name",
		order: "asc",
		name: "Tên Z-A"

	}
];

const ReportIssueStatus = [
	{
		value: "",
		name: "Tất cả"
	},
	{
		value: "PENDING",
		name: "Đang Chờ"
	},
	{
		value: "IN_PROGRESS",
		name: "Đang xử lý"
	},
	{
		value: "RESOLVED",
		name: "Đã giải quyết"
	},

	{
		value: "CLOSED",
		name: "Đã đóng"
	}
];


function ReportIssueFilter({ setParams, roomId, apartmentId }: {
	setParams: Function;
	roomId?: string;
	apartmentId?: string
}) {

	const [sortOption, setSortOption] = useState({
		value: "createdAt",
		order: "desc",
		name: "Sắp xếp"
	});

	const [reportIssueStatus, setReportIssueStatus] = useState(ReportIssueStatus[0]);

	const handleOrderChange = (name: string) => {
		const selectedOrder = sortOptions.find(order => order.name === name);
		if (selectedOrder) {
			setSortOption(selectedOrder);
		}
	};

	const handleStatusChange = (name: string) => {
		const selectedStatus =
			ReportIssueStatus.find(status => status.name === name);
		if (selectedStatus) {
			setReportIssueStatus(selectedStatus);
		}
	};

	const handleChangeParams = (search: string) => {
		let queryParams = "";
		if (sortOption.value !== "") {
			queryParams = queryParams + `?sort=${sortOption.value}&order=${sortOption.order}`;
		}
		if (search !== "") {
			queryParams = `?search=${search}`;
		}

		if (reportIssueStatus.value !== "") {
			queryParams = queryParams + `&status=${reportIssueStatus.value}`;
		}
		if (roomId) {
			queryParams = queryParams + `&roomId=${roomId}`;
		}
		if (apartmentId) {
			queryParams = queryParams + `&apartmentId=${apartmentId}`;
		}
		setParams(queryParams);
	};

	const [first, setFirst] = useState(true);

	useEffect(() => {
		!first && handleChangeParams("");
		setFirst(false);
	}, [reportIssueStatus, sortOption]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const search = formData.get("search") as string;
		handleChangeParams(search);
	};

	return (
		<div>
			{/*<h1 className="text-3xl font-bold py-4">Danh sách Liên hệ</h1>*/}
			<div className="flex flex-col md:flex-row gap-4 mb-4">
				<div className="relative flex-grow">
					<form onSubmit={handleSubmit}>
						<Input
							name="search"
							type="text"
							placeholder="Tìm kiếm theo tiêu đề, mô tả "
							// value={searchTerm}
							className="pl-10"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
					</form>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							{sortOption.name}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={sortOption.name} onValueChange={handleOrderChange}>
							{sortOptions.map(sortOptionValue => (
								<DropdownMenuRadioItem key={sortOptionValue.name} value={sortOptionValue.name}>
									{sortOptionValue.name}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							{reportIssueStatus.name}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={reportIssueStatus.name} onValueChange={handleStatusChange}>
							{ReportIssueStatus.map(sortOptionValue => (
								<DropdownMenuRadioItem key={sortOptionValue.name} value={sortOptionValue.name}>
									{sortOptionValue.name}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

export default ReportIssueFilter;