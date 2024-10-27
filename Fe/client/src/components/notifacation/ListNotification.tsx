"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationResponse } from "@/dto/response/notification";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import apartmentApiRequest from "@/apiRequests/apartment";
import { scrollToTop } from "@/util/scrollToTop";
import { notificationApiRequest } from "@/apiRequests/notification";
import Pagination from "@/components/Pageinate";
import ApartmentFilter from "@/components/notifacation/NotificationFilter";
import NotificationFilter from "@/components/notifacation/NotificationFilter";
import NotificationItem from "@/components/notifacation/NotificationItem";

export default function ListNotification() {
	const [notifications, setNotifications]
		= useState<NotificationResponse[] | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<NotificationResponse>>>(
		(data: {
			pageNum: number,
			params: string,
			sessionToken: string
		}) => notificationApiRequest.getAllNotification(data)
	);

	const [params, setParams] = useState<String>("");

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 5
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
		scrollToTop();
	};

	function handleChangParams(e: String) {
		console.log(e);
		setParams(e);
	}

	const markAsRead = (index: number) => {


		const token = localStorage.getItem("token") || "";
		if (notifications) {
			const notificationId = notifications[index].id;

			notificationApiRequest.markAsReadNotification({ notificationId, sessionToken: token });
			const newNotifications = [...notifications];
			newNotifications[index].isRead = true;
			setNotifications(newNotifications);

		}

	};

	useEffect(() => {
		setPage((prev: any) => {
				return { ...prev, currentPage: 0 };
			}
		);
	}, [params]);


	useEffect(() => {
		async function fetchData() {
			const token = localStorage.getItem("token") || "";

			const res = await fetch({
				pageNum: page.currentPage,
				params: params,
				sessionToken: token
			});

			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result.totalPage };
			});

			setNotifications(res?.payload?.result?.data);
		}

		fetchData();
	}, [page.currentPage, params]);

	return (
		<ul className="space-y-4">
			<NotificationFilter setParams={(e: string) => handleChangParams(e)} />
			{notifications !== undefined && notifications.map((notification, index) => (
				<NotificationItem notification={notification} markAsRead={markAsRead} index={index}
								  key={notification.id} />
			))}
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</ul>
	);
}