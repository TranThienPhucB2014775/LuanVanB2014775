"use client";

import React, { useEffect, useState } from "react";
// @ts-ignore
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import tenantApiRequest from "@/apiRequests/tenant";
import { tenantResponsesType } from "@/dto/response/tenantResponse";
import Pagination from "@/components/Pageinate";
import TenantItem from "@/components/manage/room/TenantItem";
import RoomTypeFilter from "@/components/manage/room-type/RoomTypeFilter";
import TenantFilter from "@/components/manage/room/TenantFilter";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

function ListTenant({ roomId, isAvailable }: { roomId: string; isAvailable: boolean }) {

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0

	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<tenantResponsesType>>>(
		({
			 roomId,
			 pageNum,
			 isAvailable,
			 sessionToken
		 }: {
			roomId: string;
			pageNum: number;
			isAvailable: boolean;
			sessionToken: string;
		}) => tenantApiRequest.getTenantsFromRoom({ roomId, pageNum, sessionToken, isAvailable })
	);


	const [data, setData] =
		useState<Array<tenantResponsesType> | undefined>(undefined);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch({
				roomId: roomId,
				pageNum: page.currentPage,
				isAvailable: isAvailable,
				sessionToken: localStorage.getItem("token")
			});

			setData(res?.payload?.result.data);

			setPage((prev: any) => {
				return {
					...prev,
					totalPage: res?.payload?.result.totalPage,
					totalElement: res?.payload?.result.totalElement
				};
			});
		}

		fetchData();
	}, [page.currentPage]);

	const [search, setSearch] = useState("");
	const [params, setParams] = useState<string>("");

	function handleChangParams(e: string) {
		console.log(e);
		setParams(e);
		setPage((prev: any) => {
				return { ...prev, currentPage: 0 };
			}
		);
	}

	const router = useRouter();

	const handleDeleteTenant = (userId: string) => {
		const newTenants =
			data?.filter((tenant) => tenant.userId !== userId);
		console.log(newTenants);
		if (newTenants?.length === 0 || newTenants === undefined) {
			router.refresh();
		}
		setData(newTenants);
	};

	return (
		<>
			<TenantFilter setParams={(e: string) => handleChangParams(e)} search={search} />
			<div className="mb-4 text-sm text-gray-500">
				Tổng số người {isAvailable === false && "đã"} thuê: <span
				className="font-medium">{page.totalElement}</span>
			</div>
			{isFetching
				? <LoadingSpinner />
				: data !== undefined && data.length !== 0
					? data.map((tenant: tenantResponsesType, index) => {
						return (
							<TenantItem
								tenant={tenant}
								key={index}
								roomId={roomId}
								handleDeleteTenant={(e: string) => handleDeleteTenant(e)} />
						);
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
		</>
	);
}

export default ListTenant;