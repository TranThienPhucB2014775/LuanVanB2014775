"use client";

import React, { useState, useEffect } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { rentalPostListResponse } from "@/dto/response/listResponse";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import tenantPostApiRequest from "@/apiRequests/tenantPost";
import Pagination from "@/components/Pageinate";
import { useAppContext } from "@/app/app-provider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ManageTenantPostCard from "@/components/manage-tenant-post/ManageTenantPostCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const tenantTypes = [
	{
		name: "Tìm phòng",
		value: "LOOKING_FOR_ROOM_TO_RENT"
	},
	{
		name: "Tìm người ở ghép",
		value: "LOOKING_FOR_ROOMMATE"
	},
	{
		name: "Nhượng phòng",
		value: "ROOM_SUBLET"
	}
];

export default function TenantListings({ isAvailable }: { isAvailable: boolean }) {
	const [tenantPosts, setTeantPosts] = useState<tenantPostResponse[] | undefined>();
	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<rentalPostListResponse<tenantPostResponse>>>(
		(data: { params: string; page: number; sessionToken: string }) => tenantPostApiRequest.getAllTenantPost(data)
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

		setTeantPosts(res?.payload?.result?.data);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold">
				Tổng bài đăng: {page.totalElement}
			</h1>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tiêu đề</TableHead>
							<TableHead>Địa chỉ</TableHead>
							<TableHead>Giá</TableHead>
							<TableHead>Loại cho thuê</TableHead>
							<TableHead>Thao tác</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isFetching
							? <LoadingSpinner />
							: tenantPosts && tenantPosts.length > 0 ? (
								tenantPosts.map((post) => (
									<ManageTenantPostCard
										tenantPostResponse={post}
										key={post.tenantPostId}
									/>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} className="text-center">
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
