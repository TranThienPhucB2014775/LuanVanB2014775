"use client";

import React, { useEffect, useState } from "react";
import { verificationResponse } from "@/dto/response/verificationRequest";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import verificationRequestApiRequest from "@/apiRequests/verifycationRequest";
import Pagination from "@/components/Pageinate";
import VerifyItem from "@/components/vefity/VerifiItem";

export default function ListVerify() {
	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<verificationResponse>>>(
		(data: {
			sessionToken: string
			params: string
			page: number
		}) => verificationRequestApiRequest.getAllVerificationRequest(data)
	);

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const [params, setParams] = useState<string>("");
	const [items, setItems] = useState<verificationResponse[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

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
				totalPage: res?.payload?.result.totalPage || prev.totalPage
			}));

			setItems(res?.payload?.result?.data);
			setLoading(false);
		}

		fetchData();
	}, [page.currentPage, params]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Danh sách yêu cầu xác thực tài khoản</h1>
			{loading ? (
				<p>Loading...</p>
			) : items?.length === 0 ? (
				<p>Không tìm thấy lịch sử yêu cầu xác minh</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
					{items !== undefined && items.map((item) => <VerifyItem key={item.id} verify={item} />)}
				</div>
			)}
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</div>
	);
}