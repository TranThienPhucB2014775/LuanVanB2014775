"use client";

import React, { useEffect, useState } from "react";
import ManageTop from "@/components/manage/ManageTop";
import { DoorClosed } from "lucide-react";
import RoomTypeFilter from "@/components/manage/room-type/RoomTypeFilter";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import Pagination from "@/components/Pageinate";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import roomApiRequest from "@/apiRequests/room";
import { roomResponse } from "@/dto/response/roomResponse";
import RoomItem from "@/components/manage/room/RoomItem";

function ListRoom({ roomTypeId, isManage = true }: {
	roomTypeId: string;
	isManage?: boolean
}) {

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<roomResponse>>>(
		(data: {
			sessionToken: string,
			params: string,
			page: number,
		}) => roomApiRequest.getRooms(data)
	);

	const [search, setSearch] = useState("");

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const [params, setParams] = useState<string>("roomTypeId=" + roomTypeId);

	const [data, setData] = useState<Array<roomResponse> | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	useEffect(() => {
		setPage((prev: any) => {
				return { ...prev, currentPage: 0 };
			}
		);

	}, [params]);

	useEffect(() => {

		const token = localStorage.getItem("token") || "";

		async function fetchData() {
			setLoading(true);
			const res = await fetch({
				sessionToken: token,
				params: params,
				page: page.currentPage
			});

			setPage((prev: any) => {
				return {
					...prev,
					totalPage: res?.payload?.result.totalPage,
					totalElement: res?.payload?.result.totalElement
				};
			});
			setData(res?.payload?.result?.data);
			setLoading(false);
		}

		fetchData();
	}, [page.currentPage, params]);


	function handleChangParams(e: string) {

		let tempParams = e;

		if (e !== "") {
			tempParams = e + "&roomTypeId=" + roomTypeId;
		} else {
			tempParams = "roomTypeId=" + roomTypeId;
		}

		setParams(tempParams);
	}

	return (
		<div className="pb-4">
			<h1 className="text-center text-3xl font-bold pt-10">Danh sách phòng</h1>
			<ManageTop
				setParams={(e: string) => handleChangParams(e)}
				setSearch={(e: string) => setSearch(e)}
				title={"Phòng"}
				description={"Quản lý phòng"}
				icon={<DoorClosed className="w-6 h-6" />}
				isManage={isManage}
			>
				<RoomTypeFilter setParams={(e: string) => handleChangParams(e)} search={search} />
			</ManageTop>
			{loading ? (
				<div className="text-center py-10">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					<p className="mt-2 text-gray-500">Đang tải...</p>
				</div>
			) : (
				<>
					{data && data.length === 0 &&
						<div className="text-center text-gray-500 dark:text-gray-300">Không có dữ liệu</div>}
					<div className="mb-4 text-sm text-gray-500">
						Tổng số phòng: <span className="font-medium">{page.totalElement}</span>
					</div>
					<div className="pb-4">
						<div className="flex flex-row flex-wrap gap-5 w-full justify-center py-4">
							{data !== undefined &&
								data.map((roomType, index) => (
									<RoomItem
										room={roomType}
										key={index}
										isManage={isManage}
									/>
								))
							}
						</div>
					</div>
					<Pagination
						handlePageClick={handlePageChange}
						pageCount={page.totalPage}
						currentPage={page.currentPage}
					/>
				</>
			)}
		</div>
	);
}

export default ListRoom;