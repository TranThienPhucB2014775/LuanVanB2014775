"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { MoveRight, Search } from "lucide-react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { roomResponse } from "@/dto/response/roomResponse";
import roomApiRequest from "@/apiRequests/room";
import Pagination from "@/components/Pageinate";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import contractApiRequest from "@/apiRequests/contract";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { result } from "@/dto/result";

export default function ContractRoomMover({ roomTypeId, roomId, contractId }: {
	roomTypeId: string;
	roomId: string;
	contractId: string
}) {
	const [selectedRoom, setSelectedRoom] = useState<string | null>(roomId);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<roomResponse>>>(
		(data: {
			sessionToken: string,
			params: string,
			page: number,
		}) => roomApiRequest.getRooms(data)
	);

	const { error: errorMove, isFetching: isFetchingMove, fetch: move } = useFetch<ApiResponse<result<string>>>(
		(data: {
			contractId: string;
			roomId: string;
			newRoomId: string;
			sessionToken: string;
		}) => contractApiRequest.moveContract(data)
	);

	const [search, setSearch] = useState("");

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const [params, setParams] = useState<string>("roomTypeId=" + roomTypeId);

	const [data, setData] = useState<Array<roomResponse> | undefined>(undefined);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => ({
			...prev,
			currentPage: selected
		}));
	};

	useEffect(() => {
		setPage((prev: any) => ({
			...prev,
			currentPage: 0
		}));
	}, [params]);

	useEffect(() => {
		fetchData();
	}, [page.currentPage, params]);

	async function fetchData() {
		const res = await fetch({
			sessionToken: localStorage.getItem("token") || "",
			params: params,
			page: page.currentPage
		});

		setPage((prev: any) => ({
			...prev,
			totalPage: res?.payload?.result.totalPage,
			totalElement: res?.payload?.result.totalElement
		}));
		setData(res?.payload?.result?.data);
	}

	function handleChangParams(search: string) {
		if (search === "") {
			setParams("roomTypeId=" + roomTypeId);
		} else {
			setParams("roomTypeId=" + roomTypeId + "&search=" + search);
		}
	}

	const handleMoveContract = () => {
		setIsConfirmOpen(true);
	};

	const { toast } = useToast();
	const router = useRouter();

	const confirmMoveContract = async () => {
		if (selectedRoom !== roomId) {
			// console.log(`Moving contract to ${selectedRoom}`);
			// // Implement the actual contract moving logic here
			// setSelectedRoom(null);
			// setIsConfirmOpen(false);
			const res = await move({
				contractId: contractId,
				roomId: roomId,
				newRoomId: selectedRoom,
				sessionToken: localStorage.getItem("token") || ""
			});

			if (res?.code === 0) {
				toast({
					title: "Di chuyển hợp đồng thành công",
					description: "Hợp đồng đã được di chuyển đến phòng mới"
				});
				router.push(`/manage/room/${selectedRoom}`);
			} else {
				toast({
					title: "Di chuyển hợp đồng thất bại",
					description: "Có lỗi xảy ra khi di chuyển hợp đồng",
					variant: "destructive"
				});
			}
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">
						Di chuyển hợp đồng <MoveRight className="ml-2 h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Di chuyển hợp đồng</DialogTitle>
						<DialogDescription>
							Chọn phòng bạn muốn di chuyển hợp đồng đến. Nhấn Xác nhận khi bạn đã chọn xong.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<div className="flex mb-4">
							<Input
								type="text"
								placeholder="Tìm kiếm phòng..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="flex-grow"
								autoFocus={false}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleChangParams(search);
									}
								}}
							/>
							<Button
								variant="outline"
								className="ml-2"
								onClick={() => handleChangParams(search)}
							>
								<Search className="h-4 w-4" />
								<span className="sr-only">Tìm kiếm</span>
							</Button>
						</div>
						<div className="grid grid-cols-3 gap-2 w-full pb-2">
							{data !== undefined && data.map((room) => (
								<Button
									key={room.roomId}
									variant="outline"
									className={cn(
										"h-20 items-center justify-center",
										selectedRoom === room.roomId && "border-primary"
									)}
									onClick={() => setSelectedRoom(room.roomId)}
								>
									{room.name}
								</Button>
							))}
						</div>
						<Pagination
							handlePageClick={handlePageChange}
							pageCount={page.totalPage}
							currentPage={page.currentPage}
						/>
					</div>

					<DialogFooter>
						<Button onClick={handleMoveContract} disabled={!selectedRoom}>
							Xác nhận di chuyển
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận di chuyển hợp đồng</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn di chuyển hợp đồng đến phòng đã chọn không?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Hủy</AlertDialogCancel>
						<AlertDialogAction onClick={confirmMoveContract}>Xác nhận</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

