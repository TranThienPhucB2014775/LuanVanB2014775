"use client";

import React, { useState, useEffect } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { RentalPostListResponse } from "@/dto/response/rentalPost";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import Pagination from "@/components/Pageinate";
import { useAppContext } from "@/app/app-provider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ManageRentalPostCard from "@/components/manage-rental-post/ManageRentalPostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RentalListings({ isAvailable }: { isAvailable: boolean }) {
	const [rentalPosts, setRentalPosts] = useState<RentalPostListResponse[] | undefined>();
	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<RentalPostListResponse>>>(
		(data: { params: string; page: number; sessionToken: string }) =>
			rentalPostApiRequest.getAllRentalPost(data)
	);

	const { user } = useAppContext();

	useEffect(() => {
		fetchData();
	}, [page.currentPage, user]);

	async function fetchData(params: string = "") {
		if (!user) return;

		const res = await fetch({
			params: `userId=${user}&isAvailable=${isAvailable}`,
			page: page.currentPage,
			sessionToken: localStorage.getItem("token") || ""
		});

		setPage((prev) => ({
			...prev,
			totalPage: res?.payload?.result.totalPage || prev.totalPage,
			totalElement: res?.payload?.result.totalElement || prev.totalElement
		}));

		setRentalPosts(res?.payload?.result?.data);
	}

	function toggleLock(rentalPostId: string) {
		console.log(rentalPostId);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-5">Quản lý tin đăng cho thuê</h1>
			<h1 className="text-2xl font-bold">
				Tổng bài đăng: {page.totalElement}
			</h1>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tiêu đề</TableHead>
							<TableHead>Địa chỉ</TableHead>
							<TableHead>Diện tích</TableHead>
							<TableHead>Giá</TableHead>
							<TableHead>Loại cho thuê</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isFetching
							? <LoadingSpinner />
							: rentalPosts && rentalPosts.length > 0 ? (
								rentalPosts.map((post) => (
									<ManageRentalPostCard
										rentalPost={post}
										handleLockRentalPost={toggleLock}
										key={post.rentalPostId}
									/>
								))
							) : (
								<TableRow>
									<TableCell colSpan={6} className="text-center">
										Không có dữ liệu
									</TableCell>
								</TableRow>
							)}
					</TableBody>
				</Table>
			</div>
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</div>
	);
}
