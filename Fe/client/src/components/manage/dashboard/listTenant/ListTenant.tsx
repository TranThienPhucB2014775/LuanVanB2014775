"use client";

import React, { useEffect, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { totalInvoiceResponse } from "@/dto/response/SummaryResponse";
import { invoiceApiRequest } from "@/apiRequests/invoice";
import tenantApiRequest from "@/apiRequests/tenant";
import { listResponse } from "@/dto/response/listResponse";
import { tenantResponseOfLandlord } from "@/dto/response/tenantPostResponse";
import Pagination from "@/components/Pageinate";
import { scrollToTop } from "@/util/scrollToTop";
import FilterTenant from "@/components/manage/dashboard/listTenant/FilterTenant";
import TenantItem from "@/components/manage/dashboard/listTenant/TenantItem";
import LoadingSpinner from "@/components/LoadingSpinner";

function ListTenant() {

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
		scrollToTop();
	};

	const [tenants, setTenants] = useState<tenantResponseOfLandlord [] | undefined>();

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<tenantResponseOfLandlord>>>(
		(data: {
			pageNum: number;
			sessionToken: string;
			params: string
		}) => tenantApiRequest.getAllTenantOfLandlord(data)
	);

	const [params, setParams] = useState(`?isAvailable=true`);

	useEffect(() => {
		async function fetchTenants() {
			console.log("fetching");
			const res = await fetch({
				pageNum: page.currentPage,
				sessionToken: localStorage.getItem("token") as string,
				params: params
			});
			if (res?.code === 0) {
				setTenants(res?.payload?.result.data);
				setPage((prev) => ({
					...prev,
					totalPage: res?.payload?.result.totalPage || 0,
					totalElement: res?.payload?.result.totalElement || 0
				}));
			}
		}

		fetchTenants();
	}, [page.currentPage, params]);

	return (
		<div className="">
			< FilterTenant search={""} setParams={setParams} />
			{isFetching && < LoadingSpinner />}
			{tenants !== undefined && tenants.length === 0 && <div>Không có người thuê nào</div>}
			<div className="py-4 flex flex-row flex-wrap gap-5 w-full justify-center">
				{tenants !== undefined && tenants.length > 0 &&
					tenants.map((tenant: tenantResponseOfLandlord, index: number) => (
						<TenantItem tenant={tenant} key={index} />
					))
				}
			</div>
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</div>
	);
}

export default ListTenant;