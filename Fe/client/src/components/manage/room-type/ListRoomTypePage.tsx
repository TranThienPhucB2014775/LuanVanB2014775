import React, { useEffect, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { useAppContext } from "@/app/app-provider";
import ManageTop from "@/components/manage/ManageTop";
import { LayoutDashboard } from "lucide-react";
import RoomTypeFilter from "@/components/manage/room-type/RoomTypeFilter";
import ListRoomType from "@/components/manage/room-type/ListRoomType";
import Pagination from "@/components/Pageinate";

function ListRoomTypePage(
	{ apartmentId, isManage = true }: {
		apartmentId: string;
		isManage?: boolean
	}
) {

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<roomTypeResponse>>>(
		(data: {
			sessionToken: string,
			params: string,
			page: number,
		}) => roomTypeApiRequest.getRoomTypes(data)
	);

	const [search, setSearch] = useState("");

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const [params, setParams] =
		useState<string>("apartmentId=" + apartmentId);

	const [data, setData] = useState<Array<roomTypeResponse> | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

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
			tempParams = e + "&apartmentId=" + apartmentId;
		} else {
			tempParams = "apartmentId=" + apartmentId;
		}

		setParams(tempParams);
		setPage((prev: any) => {
				return { ...prev, currentPage: 0 };
			}
		);
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
		<div className="pb-4">
			<h1 className="text-center text-3xl font-bold pt-8">Danh sách loại phòng</h1>
			<ManageTop
				setParams={(e: string) => handleChangParams(e)}
				setSearch={(e: string) => setSearch(e)}
				title={"Loại phòng"}
				description={"Danh sách loại phòng"}
				icon={<LayoutDashboard className="w-6 h-6" />}
				isManage={isManage}
			>
				<RoomTypeFilter setParams={(e: string) => handleChangParams(e)} search={search} />
			</ManageTop>
			{loading ? (
				<p>Loading...</p>
			) : data?.length === 0 ? (
				<p>No items found.</p>
			) : (
				<>
					<div className="mb-4 text-sm text-gray-500">
						Tổng số loại phòng: <span className="font-medium">{page.totalElement}</span>
					</div>
					<ListRoomType
						data={data}
						handelChangData={(roomTypeResponse: roomTypeResponse) => handelChangData(roomTypeResponse)}
						isManage={isManage}
					/>
				</>
			)}
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</div>
	);
}

export default ListRoomTypePage;