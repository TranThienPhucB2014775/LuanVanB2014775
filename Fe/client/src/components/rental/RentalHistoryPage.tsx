import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RentalHistoryRoomDetail from "@/components/rental/RentalHistoryRoomDetail";
import { TenantRoomResponse } from "@/dto/response/tenantResponse";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import tenantApiRequest from "@/apiRequests/tenant";
import Link from "next/link";
import { Home, Info } from "lucide-react";
import Pagination from "@/components/Pageinate";
import WriteReview from "@/components/feedBack/ReviewForm";
import InfoContract from "@/components/rental/InfoContract";

const rooms = [
	{ id: 1, name: "Room b", status: "Occupied" },
	{ id: 2, name: "Room g", status: "Vacant" },
	{ id: 3, name: "Room y", status: "Occupied" }
];

function Skeleton(props: { className: string }) {
	return null;
}

function RentalHistoryPage() {

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
		useState<string>("?isAvailable=false");

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

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Phòng đã thuê</h1>
			{isFetching ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[...Array(6)].map((_, index) => (
						<Card key={index} className="hover:shadow-lg transition-shadow duration-300">
							<CardHeader className="space-y-2">
								<Skeleton className="h-6 w-1/2" />
								<Skeleton className="h-4 w-1/3" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-20 w-full" />
							</CardContent>
						</Card>
					))}
				</div>
			) : data && data.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{data.map((room) => (
						<Card key={room.roomId} className="hover:shadow-lg transition-shadow duration-300">
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-xl mb-2">{room.name}</CardTitle>
										<CardDescription>Thời gian thuê: {room.rentalDuration}</CardDescription>
									</div>
									<div className="flex flex-row gap-1">
										<InfoContract contractId={room.contractId} />
										<WriteReview FeedBackType="APARTMENT" itemId={room.apartmentId}
													 updateFeedBack={() => null} />
									</div>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			) : (
				<div className="text-center text-muted-foreground py-8">
					<Home className="h-12 w-12 mx-auto mb-4" />
					<p className="text-lg">Không có phòng nào trong lịch sử thuê của bạn.</p>
				</div>
			)}
			{data && data.length > 0 && (
				<div className="mt-8">
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={page.totalPage}
						currentPage={page.currentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default RentalHistoryPage;