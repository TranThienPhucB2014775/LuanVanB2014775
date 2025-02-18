"use client";

import React, { useEffect, useState } from "react";
import { RentalPostListResponse } from "@/dto/response/rentalPost";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { rentalPostListResponse } from "@/dto/response/listResponse";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { useAppContext } from "@/app/app-provider";
import tenantPostApiRequest from "@/apiRequests/tenantPost";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import TenantPostItem from "@/components/tenantPost/TenantPostItem";
import Pagination from "@/components/Pageinate";
import RentalPostCard from "@/components/rentalPost/RentalPostCard";
import TenantPostFilter from "@/components/tenantPost/TenantPostFilter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ListTenantPost({ userId }: { userId?: string }) {

	const [tenantPosts, setTenantPosts]
		= useState<tenantPostResponse[] | undefined>(undefined);

	const [filters, setFilters] = useState({
		minPrice: 0,
		maxPrice: 100000000,
		city: "",
		district: "",
		tenantPostType: "",
		search: ""
	});

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 1,
		totalElement: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const [price, setPrice] = useState({
		min: 0,
		max: 1000000000
	});

	const { error, isFetching, fetch } = useFetch<ApiResponse<rentalPostListResponse<tenantPostResponse>>>(
		(data: {
			params: string,
			page: number,
			sessionToken: string;
		}) => tenantPostApiRequest.getAllTenantPost(data)
	);

	const handleFilterChange = (key: string, value: string) => {
		setFilters(prev => ({ ...prev, [key]: value }));
		if (key === "city") {
			setFilters(prev => ({ ...prev, district: "" }));
		}
	};

	useEffect(() => {
		fetchData(userId === undefined ? "" : `userId=${userId}`);
	}, [page.currentPage]);

	async function fetchData(parmas: string = "") {

		const res = await fetch({
			params: parmas,
			page: page.currentPage,
			sessionToken: ""
		});

		setPage((prev: any) => {
			return {
				...prev,
				totalPage: res?.payload?.result.totalPage,
				totalElement: res?.payload?.result.totalElement
			};
		});

		setTenantPosts(res?.payload?.result?.data);

		setPrice({
			min: res?.payload?.result.minPrice || 0,
			max: res?.payload?.result.maxPrice || 1000000000
		});
		setFilters({
			...filters,
			minPrice: res?.payload?.result.minPrice || 0,
			maxPrice: res?.payload?.result.maxPrice || 1000000000
		});
	}

	function handleResetFilter() {
		setFilters({
			minPrice: 0,
			maxPrice: 100000000,
			city: "",
			district: "",
			tenantPostType: "",
			search: ""
		});
	}

	function handleApplyFilter() {

		const params = new URLSearchParams();
		if (filters.minPrice) {
			params.append("minPrice", filters.minPrice.toString());
		}
		if (filters.maxPrice) {
			params.append("maxPrice", filters.maxPrice.toString());
		}
		if (filters.city && filters.city !== "Tất cả") {
			params.append("city", filters.city);
		}
		if (filters.district && filters.city !== "Tất cả") {
			params.append("district", filters.district);
		}
		if (filters.tenantPostType !== "Tất cả" && filters.tenantPostType) {
			params.append("tenantPostType", filters.tenantPostType);
		}

		if (filters.search) {
			params.append("search", filters.search);
		}

		const queryString = params.toString().replace(/\+/g, "%20");

		fetchData(params.toString());
	}

	const { isAuthenticated } = useAppContext();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Danh sách bài đăng của người thuê</h1>
			<div className="flex justify-end py-2">
				{isAuthenticated && userId === undefined &&
					<Link href="/tenant-post/createTenantPost">
						<Button variant="secondary">+ Thêm mới</Button>
					</Link>
				}
			</div>
			<div className="flex flex-col lg:flex-row gap-4">
				<TenantPostFilter
					filters={filters}
					handleFilterChange={handleFilterChange}
					handleApplyFilter={handleApplyFilter}
					handleResetFilter={handleResetFilter}
					minPrice={price.min}
					maxPrice={price.max}
				/>
				<div className="w-full lg:w-3/4">
					<div className="space-y-4 pb-4">
						{
							tenantPosts !== undefined && tenantPosts.length === 0
								? <p className="text-center">Không có tin nào</p>
								: tenantPosts?.map((post, index) => (
									< TenantPostItem post={post} key={index} />
								))
						}
					</div>
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={page.totalPage}
						currentPage={page.currentPage}
					/>
				</div>
			</div>
		</div>
	);

}

export default ListTenantPost;