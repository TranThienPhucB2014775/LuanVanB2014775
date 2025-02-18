"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import tenantApiRequest from "@/apiRequests/tenant";
import { tenantResponsesType } from "@/dto/response/tenantResponse";
import Pagination from "@/components/Pageinate";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RoomMateItem from "@/components/rental/rentalInfo/roomMateItem";

function RoomMate({ roomId }: { roomId: string }) {

	const [data, setData] =
		useState<Array<tenantResponsesType> | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<tenantResponsesType>>>(
		(data: {
			roomId: string;
			pageNum: number;
			isAvailable: boolean;
			sessionToken: string;
		}) => tenantApiRequest.getTenantsFromRoom(data)
	);

	const [search, setSearch] = useState("");

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

	useEffect(() => {

		const token = localStorage.getItem("token") || "";

		async function fetchData() {
			const res = await fetch({
				sessionToken: token,
				pageNum: page.currentPage,
				roomId: roomId,
				isAvailable: true
			});

			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result.totalPage };
			});

			setData(res?.payload?.result?.data);

		}

		fetchData();
	}, []);
	return (
		<>
			<Card className="relative">
				<CardHeader>
					<CardTitle>Người đang thuê</CardTitle>
					<CardDescription>Những người đang ở cùng phòng với bạn</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{data !== undefined && data.map((roommate, index) => (
							<Suspense key={index} fallback={<div>Loading...</div>}>
								<RoomMateItem romMateId={roommate.userId} />
							</Suspense>
						))}
					</div>
				</CardContent>
				<CardFooter className="absolute bottom-0 left-1/2 -translate-x-1/2">
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={page.totalPage}
						currentPage={page.currentPage}
					/>
				</CardFooter>
			</Card>

		</>
	);
}

export default RoomMate;