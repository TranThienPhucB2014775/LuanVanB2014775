"use client";

import React, { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { isAvailables } from "@/constants/filter";

const apartments = [
	{
		value: "",
		name: "Tất cả"
	},
	{
		value: "DORMITORY",
		name: "Ký túc xá"
	},
	{
		value: "ROOM",
		name: "Phòng trọ"
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
	},
	{
		value: "name",
		order: "asc",
		name: "Tên A-Z"
	},
	{
		value: "name",
		order: "desc",
		name: "Tên Z-A"

	}
];

function ApartmentFilter({ setParams, search, userId }: { setParams: Function; search: string; userId: string }) {

	const [apartmentType, setApartmentType] =
		useState<{
			value: string;
			name: string;
		}>({ value: "", name: "Loại cho thuê" });

	const [isAvailable, setIsAvailable] = useState({
		value: "",
		name: "Tình trạng"
	});

	const [sortOption, setSortOption] = useState({
		value: "",
		order: "",
		name: "Sắp xếp"
	});

	const handleApartmentTypeChange = (value: string) => {
		const selectedApartment = apartments.find(apartment => apartment.value === value);
		if (selectedApartment) {
			setApartmentType(selectedApartment);
		}
	};

	const handleOrderChange = (name: string) => {
		const selectedOrder = sortOptions.find(order => order.name === name);
		if (selectedOrder) {
			setSortOption(selectedOrder);
		}
	};

	useEffect(() => {

		const queryParams = new URLSearchParams();

		if (userId !== "") {
			queryParams.append("userId", userId);
		}

		if (apartmentType.value !== "") {
			queryParams.append("apartmentType", apartmentType.value);
		}
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

		setParams(queryParams.toString());

	}, [apartmentType, sortOption, search, isAvailable]);

	// console.log(search)

	return (
		<div className="flex flex-row justify-end py-4 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8">
						{apartmentType.name}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					{/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={apartmentType.value} onValueChange={handleApartmentTypeChange}>
						{apartments.map(apartment => (
							<DropdownMenuRadioItem key={apartment.value} value={apartment.value}>
								{apartment.name}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
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

export default ApartmentFilter;