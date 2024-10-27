"use client";

import React, { useEffect, useState } from "react";
import ManageTop from "@/components/manage/ManageTop";
import Pagination from "@/components/Pageinate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import apartmentApiRequest from "@/apiRequests/apartment";
import { listResponse } from "@/dto/response/listResponse";
import ListApartment from "@/components/manage/apartment/ListApartment";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { scrollToTop } from "@/util/scrollToTop";
import ApartmentFilter from "@/components/manage/apartment/ApartmentFilter";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ListApartmentPage({ userId = "", isManage = true }: { userId: string; isManage: boolean }) {
	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<apartmentResponse>>>(
		(data: { sessionToken: string; params: string; page: number }) => apartmentApiRequest.getApartments(data)
	);

	const [search, setSearch] = useState("");
	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 5,
		totalElement: 0
	});
	const [params, setParams] = useState<string>(userId ? `userId=${userId}` : "");
	const [data, setData] = useState<Array<apartmentResponse> | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
		scrollToTop();
	};

	function handleChangParams(e: string) {
		setParams(e);
	}

	function handleChangeData(apartment: apartmentResponse) {
		setData((prev) =>
			prev?.map((item) => (item.apartmentId === apartment.apartmentId ? apartment : item))
		);
	}

	useEffect(() => {
		setPage((prev) => ({ ...prev, currentPage: 0 }));
	}, [params]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const token = localStorage.getItem("token") || "";

			const res = await fetch({
				sessionToken: token,
				params: params,
				page: page.currentPage
			});

			setPage((prev) => ({
				...prev,
				totalPage: res?.payload?.result.totalPage || 0,
				totalElement: res?.payload?.result.totalElement || 0
			}));

			setData(res?.payload?.result?.data);
			setLoading(false);
		}

		fetchData();
	}, [page.currentPage, params]);

	return (
		<>
			<ManageTop
				setParams={(e: string) => handleChangParams(e)}
				setSearch={(e: string) => setSearch(e)}
				title={`${isManage ? "Quản lý" : "Danh sách"} khu trọ`}
				description={`${isManage ? "Quản lý" : "Danh sách"} thông tin các khu trọ`}
				icon={<BuildingOffice2Icon className="w-6 h-6" />}
				isManage={isManage}
			>
				<ApartmentFilter setParams={(e: string) => setParams(e)} search={search} userId={userId} />
			</ManageTop>
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					{data && data.length === 0 ? (
						<div className="text-center text-gray-500">Không có dữ liệu</div>
					) : (
						<>
							<div className="mb-4 text-sm text-gray-500">
								Tổng số khu trọ: <span className="font-medium">{page.totalElement}</span>
							</div>
							<ListApartment
								data={data || []}
								handleChangeData={(apartment: apartmentResponse) => handleChangeData(apartment)}
								isManage={isManage}
							/>
						</>
					)}
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={page.totalPage}
						currentPage={page.currentPage}
					/>
				</>
			)}
		</>
	);
}