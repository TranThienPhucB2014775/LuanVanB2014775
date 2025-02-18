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

const notificationStatuses = [
	{ value: "", name: "Tất cả" },
	{ value: "true", name: "Đã xem" },
	{ value: "false", name: "Chưa xem" }
];

function NotificationFilter({ setParams }: { setParams: Function; }) {


	const [notificationStatus, setNotificationStatus] = useState({
		value: "",
		name: "Tất cả"
	});

	function handleNotificationStatusChange(value: string) {
		const newNotificationStatus
			= notificationStatuses.find(status => status.value === value);
		if (newNotificationStatus) {
			setNotificationStatus(newNotificationStatus);
		}
	}

	useEffect(() => {

		const queryParams = new URLSearchParams();

		if (notificationStatus.value) {
			queryParams.append("isRead", notificationStatus.value);
		}

		setParams(queryParams.toString());

	}, [notificationStatus]);

	// console.log(search)

	return (
		<div className="flex flex-row justify-end py-4 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8">
						{notificationStatus.name}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					{/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={notificationStatus.value}
											onValueChange={handleNotificationStatusChange}>
						{notificationStatuses.map(apartment => (
							<DropdownMenuRadioItem key={apartment.value} value={apartment.value}>
								{apartment.name}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default NotificationFilter;