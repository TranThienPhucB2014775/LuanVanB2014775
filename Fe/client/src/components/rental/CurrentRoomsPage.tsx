"use client";

import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import tenantApiRequest from "@/apiRequests/tenant";
import { tenantResponsesType, TenantRoomResponse } from "@/dto/response/tenantResponse";
import Pagination from "@/components/Pageinate";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

function CurrentRoomsPage() {

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0
	});

	const [data, setData] =
		useState<Array<TenantRoomResponse> | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<TenantRoomResponse>>>(
		(data: {
			sessionToken: string,
			params: string,
			pageNum: number,
		}) => tenantApiRequest.getTenantsFromUser({
			sessionToken: data.sessionToken,
			param: data.params,
			pageNum: data.pageNum
		})
	);

	const [params, setParams] =
		useState<string>("?isAvailable=true");

	useEffect(() => {

		async function fetchData() {
			const token = localStorage.getItem("token") || "";
			const res = await fetch({
				sessionToken: token,
				params: params,
				pageNum: page.currentPage
			});
			setData(res?.payload?.result.data);
		}

		fetchData();

	}, []);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	const getRentStatusColor = (status: boolean) => {
		return status ? "text-green-500" : "text-red-500";
	};

	console.log(data);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Phòng đang thuê</h1>
			{isFetching
				? <LoadingSpinner />
				: data !== undefined && data.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{data.map((room) => (
							<Card key={room.roomId} className="hover:shadow-lg transition-shadow duration-300">
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-xl mb-2">{room.name}</CardTitle>
											<CardDescription
												className={`font-medium ${getRentStatusColor(room.isAvailable)}`}>
												{room.rentStatus}
											</CardDescription>
										</div>
										<Link href={`/rental-rooms/${room.roomId}`}>
											<Button variant="outline" size="icon">
												<Info className="h-4 w-4" />
												<span className="sr-only">Room details</span>
											</Button>
										</Link>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				) : (
					<div className="text-center text-gray-500 dark:text-gray-300 py-8">
						No rooms available
					</div>
				)}
			<div className="mt-8">
				<Pagination
					handlePageClick={handlePageChange}
					pageCount={page.totalPage}
					currentPage={page.currentPage}
				/>
			</div>
		</div>
	);
}

export default CurrentRoomsPage;