"use client";

import React, { useState, useEffect } from "react";
import RentalPostCard from "@/components/rentalPost/RentalPostCard";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse, rentalPostListResponse } from "@/dto/response/listResponse";
import { RentalPostListResponse, RentalPostResponse } from "@/dto/response/rentalPost";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import Pagination from "@/components/Pageinate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppContext } from "@/app/app-provider";
import RentalPostFilter from "@/components/rentalPost/RentalPostFilter";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RentalListings({ userId }: { userId?: string }) {
	const [rentalPosts, setRentalPosts] = useState<RentalPostListResponse[] | undefined>();

	const [filters, setFilters] = useState({
		minPrice: 0,
		maxPrice: 100000000,
		minArea: "",
		maxArea: "",
		city: "",
		district: "",
		rentalType: "",
		tenantType: "",
		search: ""
	});

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 5,
		totalElement: 0
	});

	const [data, setData] = useState<Array<roomTypeResponse> | undefined>(undefined);

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

	const { error, isFetching, fetch } = useFetch<ApiResponse<rentalPostListResponse<RentalPostListResponse>>>(
		(data: {
			params: string,
			page: number,
			sessionToken: string;
		}) => rentalPostApiRequest.getAllRentalPost(data)
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

		setRentalPosts(res?.payload?.result?.data);

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

	function handleApplyFilter() {

		const params = new URLSearchParams();
		if (filters.minPrice) {
			params.append("minPrice", filters.minPrice.toString());
		}
		if (filters.maxPrice) {
			params.append("maxPrice", filters.maxPrice.toString());
		}
		if (filters.minArea) {
			params.append("minArea", filters.minArea);
		}
		if (filters.maxArea) {
			params.append("maxArea", filters.maxArea);
		}
		if (filters.city && filters.city !== "Tất cả") {
			params.append("city", filters.city);
		}
		if (filters.district && filters.city !== "Tất cả") {
			params.append("district", filters.district);
		}
		if (filters.rentalType !== "Tất cả" && filters.rentalType) {
			params.append("rentalType", filters.rentalType);
		}
		if (filters.tenantType !== "Tất cả" && filters.tenantType) {
			params.append("tenantType", filters.tenantType);
		}

		if (filters.search) {
			params.append("search", filters.search);
		}

		const queryString = params.toString().replace(/\+/g, "%20");
		console.log(queryString);

		fetchData(params.toString());
	}

	const { isAuthenticated } = useAppContext();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Danh sách cho thuê</h1>
			<div className="flex justify-end py-2">
				{isAuthenticated && userId === undefined &&
					<Link href="/listings/createRentalPost">
						<Button variant="secondary">+ Thêm mới</Button>
					</Link>
				}
			</div>
			<div className="flex flex-col lg:flex-row gap-4">
				<RentalPostFilter
					filters={filters}
					handleFilterChange={handleFilterChange}
					handleApplyFilter={handleApplyFilter}
					minPrice={price.min}
					maxPrice={price.max}
				/>{
				isFetching
					? <LoadingSpinner />
					: <div className="w-full lg:w-3/4">
						<div className="space-y-4 pb-4">
							{rentalPosts !== undefined && rentalPosts.map((post) => (
								<RentalPostCard key={post.rentalPostId} post={post} />
							))}
						</div>
						<Pagination
							handlePageClick={handlePageChange}
							pageCount={page.totalPage}
							currentPage={page.currentPage}
						/>
					</div>
			}
			</div>
		</div>
	);
}