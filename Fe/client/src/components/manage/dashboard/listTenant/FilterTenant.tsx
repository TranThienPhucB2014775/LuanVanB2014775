"use client";

import React, { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const isAvailables = [
	{
		value: "",
		name: "Tất cả"
	},
	{
		value: "true",
		name: "Đang thuê"
	},
	{
		value: "false",
		name: "Ngừng thuê"
	}
];


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
	}
];

function FilterTenant({ setParams, search }: { setParams: Function; search: string; }) {

	const [isAvailable, setIsAvailable] = useState({
		value: "",
		name: "Tình trạng"
	});

	const [sortOption, setSortOption] = useState({
		value: "",
		order: "",
		name: "Sắp xếp"
	});

	const [firstLoading, setFirstLoading] = useState(true);

	const handleOrderChange = (name: string) => {
		const selectedOrder = sortOptions.find(order => order.name === name);
		if (selectedOrder) {
			setSortOption(selectedOrder);
		}
	};

	useEffect(() => {

		if (firstLoading) {
			setFirstLoading(false);
			return;
		}

		const queryParams = new URLSearchParams();

		if (sortOption.value !== "") {
			queryParams.append("sortBy", sortOption.value);
			queryParams.append("order", sortOption.order);
		}

		if (isAvailable.value !== "") {
			queryParams.append("isAvailable", isAvailable.value);
		}

		if (search !== "") {
			queryParams.append("search", search);
		}

		setParams("?" + queryParams.toString());

	}, [sortOption, isAvailable]);


	return (
		<div className="flex flex-row justify-end py-4 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8">
						{isAvailable.name}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={isAvailable.value}
											onValueChange={(value) => setIsAvailable(
												isAvailables.find(isAvailable => isAvailable.value === value) || isAvailables[0]
											)}>
						{isAvailables.map(isAvailable => (
							<DropdownMenuRadioItem key={isAvailable.value} value={isAvailable.value}>
								{isAvailable.name}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8">
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
		</div>
	);
}

export default FilterTenant;