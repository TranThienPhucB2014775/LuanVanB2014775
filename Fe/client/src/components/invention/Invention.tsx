"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleAlertIcon } from "lucide-react";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import inventionApiRequest from "@/apiRequests/invitation";
import { listResponse } from "@/dto/response/listResponse";
import Pagination from "@/components/Pageinate";
import { useToast } from "@/components/ui/use-toast";
import inventionItem from "@/components/invention/InventionItem";
import InventionItem from "@/components/invention/InventionItem";
import InventionFilter from "@/components/invention/InventionFilter";

function Invention() {

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 1
	});

	const { toast } = useToast();

	const [data, setData] = useState<InvitationResponse[] | undefined>();
	const [loading, setLoading] = useState<boolean>(true);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const {
		error,
		isFetching,
		fetch
	} = useFetch<ApiResponse<listResponse<InvitationResponse>>>(
		(
			{
				sessionToken,
				pageNum
			}: {
				pageNum: number
				sessionToken: string;
			}
		) => inventionApiRequest.getAllInventionByUser({ sessionToken, pageNum })
	);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const res = await fetch(
				{
					sessionToken: localStorage.getItem("token"),
					pageNum: page.currentPage
				}
			);
			setData(res?.payload?.result?.data);
			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result?.totalPage };
			});
			setLoading(false);
		}

		fetchData();

	}, [page.currentPage]);

	const { error: errorRefuse, isFetching: isFetchingRefuse, fetch: refuse } = useFetch<ApiResponse<String>>(
		(
			data: { invitationToken: string; sessionToken: string }
		) =>
			inventionApiRequest.refuseInvention({ ...data })
	);

	const { error: errorAccept, isFetching: isFetchingAccept, fetch: accept } = useFetch<ApiResponse<String>>(
		(
			data: { invitationToken: string; sessionToken: string }
		) =>
			inventionApiRequest.acceptInvention({ ...data })
	);

	async function handleAccept(inviteToken: string) {
		console.log("accept", inviteToken);
		const res = await accept({
			sessionToken: localStorage.getItem("token") || "",
			invitationToken: inviteToken
		});

		if (res?.code === 0) {
			toast({ description: "Chấp nhận thành công" });
			const newData =
				data?.map(inventionItem => {
					if (inventionItem.inviteToken === inviteToken) {
						inventionItem.invitationStatus = "ACCEPTED";
					}
					return inventionItem;
				});
			setData(newData);
		} else if (res?.code === 6016) {
			toast({ description: "Không thể chấp nhận lời mời vì phòng đã đủ người", variant: "destructive" });
		} else {
			toast({ description: "Chấp nhận thất bại", variant: "destructive" });
		}

	}

	async function handleDecline(inviteToken: string) {
		const res = await refuse({
			sessionToken: localStorage.getItem("token") || "",
			invitationToken: inviteToken
		});

		if (res?.code === 0) {
			toast({ description: "Từ chối thành công" });
			const newData = data?.map(inventionItem => {
				if (inventionItem.inviteToken === inviteToken) {
					inventionItem.invitationStatus = "REFUSED";
				}
				return inventionItem;
			});
			setData(newData);
		} else {
			toast({ description: "Từ chối thất bại", variant: "destructive" });
		}
	}

	return (
		<>
			<InventionFilter setParams={() => {
			}} search="" />
			{loading ? (
				<div className="text-center py-10">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					<p className="mt-2 text-gray-500">Đang tải...</p>
				</div>
			) : (
				<>
					{data && data.length === 0 &&
						<div className="text-center text-gray-500 dark:text-gray-300">Không có dữ liệu</div>}
					{data && data.length !== 0 && data.map((invention: InvitationResponse) =>
						<div className="grid grid-cols-1 ">
							<InventionItem
								key={invention.inviteToken}
								invention={invention}
								handleAccept={(inviteToken: string) => handleAccept(inviteToken)}
								handleDecline={(inviteToken: string) => handleDecline(inviteToken)}
								isManage={false}
								handleDisable={() => {
								}}
							/>
						</div>
					)}
				</>
			)}
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</>
	);
}

export default Invention;