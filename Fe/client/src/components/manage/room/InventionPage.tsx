"use client";

import React, { useEffect, useState } from "react";
import inventionApiRequest from "@/apiRequests/invitation";
import { listResponse } from "@/dto/response/listResponse";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import InventionItem from "@/components/invention/InventionItem";
import Pagination from "@/components/Pageinate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import TenantFilter from "@/components/manage/room/TenantFilter";
import LoadingSpinner from "@/components/LoadingSpinner";


function InventionPage({ roomId }: { roomId: string }) {

	const [data, setData]
		= useState<InvitationResponse [] | undefined>(undefined);

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const [params, setParams] = useState<string>(`?roomId=${roomId}`);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<string>>(
		(data: {
			sessionToken: string,
			invitationToken: string
		}) => inventionApiRequest.disableInvention(data)
	);

	useEffect(() => {
		async function fetchData() {
			const res = await inventionApiRequest.getAllInvention({
				sessionToken: localStorage.getItem("token") ?? "",
				pageNum: page.currentPage,
				params: params
			});
			setData(res.payload?.result.data);

			setPage((prev: any) => {
				return {
					...prev,
					totalPage: res?.payload?.result.totalPage,
					totalElement: res?.payload?.result.totalElement
				};
			});
		}

		fetchData();
	}, [page.currentPage, params]);

	const { toast } = useToast();

	async function handleDisableInvention(invitationToken: string) {
		const res = await fetch({
			sessionToken: localStorage.getItem("token") ?? "",
			invitationToken
		});
		if (res?.code === 0) {
			const newData = data;
			newData?.filter((item) => {
				if (item.inviteToken === invitationToken)
					item.invitationStatus = "DISABLED";
				return item;
			});
			setData(newData);
			toast({
				description: "Đã vô hiệu hóa lời mời Thành công"
			});
		}
	}

	function handleChangParams(e: string) {

		if (e === "") {
			setParams(`?roomId=${roomId}`);
		} else {
			setParams(`?roomId=${roomId}&${e}`);
		}
		setPage((prev: any) => {
				return { ...prev, currentPage: 0 };
			}
		);
	}

	return <>
		<TenantFilter setParams={(e: string) => handleChangParams(e)} search={""} />
		<div className="mb-4 text-sm text-gray-500">
			Tổng số người lời mời: <span className="font-medium">{page.totalElement}</span>
		</div>
		{isFetching
			? <LoadingSpinner />
			: data !== undefined && data.length !== 0
				? data?.map((item, index) => {
					return <InventionItem
						invention={item}
						key={index}
						handleAccept={() => null}
						handleDecline={() => null}
						isManage={true}
						handleDisable={() => handleDisableInvention(item.inviteToken)}
					/>;
				})
				: <div className="text-center text-gray-500 dark:text-gray-300">
					Không có dữ liệu
				</div>
		}
		<Pagination
			handlePageClick={handlePageChange}
			pageCount={page.totalPage}
			currentPage={page.currentPage}
		/>
	</>;
}

export default InventionPage;