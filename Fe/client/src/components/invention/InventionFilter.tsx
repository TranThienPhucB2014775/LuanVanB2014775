"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


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

function InventionFilter({ setParams, search }: { setParams: Function; search: string }) {

	const [sortOption, setSortOption] = useState({
		value: "",
		order: "",
		name: "Sắp xếp"
	});

	const handleOrderChange = (name: string) => {
		const selectedOrder = sortOptions.find(order => order.name === name);
		if (selectedOrder) {
			setSortOption(selectedOrder);
		}
	};

	const isFirstRun = useRef(true);
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		const queryParams = new URLSearchParams();

		if (sortOption.value !== "") {
			queryParams.append("sortBy", sortOption.value);
			queryParams.append("order", sortOption.order);
		}

		if (search !== "") {
			queryParams.append("search", search);
		}

		setParams(queryParams.toString());

	}, [sortOption, search]);

	return (
		<div className="flex flex-row justify-end py-4 gap-3">
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

export default InventionFilter;