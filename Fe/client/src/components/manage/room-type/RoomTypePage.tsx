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
import ListRoom from "@/components/manage/room/ListRoom";
import LoadingSpinner from "@/components/LoadingSpinner";

function RoomTypePage({ roomTypeId, children, isManage = true }: {
	roomTypeId: string;
	children: React.ReactNode;
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
		totalPage: 5,
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
			console.log("e", e);
			tempParams = e + "&roomTypeId=" + roomTypeId;
		} else {
			tempParams = "roomTypeId=" + roomTypeId;
		}

		setParams(tempParams);
	}

	function handelChangData(roomTypeResponse: roomTypeResponse) {
		setData((prev: any) => {
			return prev.map((item: roomTypeResponse) => {
				if (item.roomTypeId === roomTypeResponse.roomTypeId) {
					return roomTypeResponse;
				}
				return item;
			});
		});
	}

	return (
		<>
			<h1 className="text-center text-3xl font-bold py-4">Thông tin phòng trọ</h1>
			{children}
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
				<LoadingSpinner />
			) : (
				<>
					{data && data.length === 0 &&
						<div className="text-center text-gray-500 dark:text-gray-300">Không có dữ liệu</div>}
					<div className="mb-4 text-sm text-gray-500">
						Tổng số phòng: <span className="font-medium">{page.totalElement}</span>
					</div>
					<ListRoom
						handelChangeData={(roomTypeResponse: roomTypeResponse) => handelChangData(roomTypeResponse)}
						data={data}
						isManage={isManage}
					/>
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

export default RoomTypePage;