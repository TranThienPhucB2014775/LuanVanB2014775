"use client";

import React, { useEffect, useState } from "react";
import ReportIssueItem from "@/components/rental/reportIssue/ReportIsueItem";
import { ReportIssueResponse } from "@/dto/response/ReportIssueResponse";
import Pagination from "@/components/Pageinate";
import ReportIssueFilter from "@/components/rental/reportIssue/ReportIssueFilter";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { roomResponse } from "@/dto/response/roomResponse";
import roomApiRequest from "@/apiRequests/room";
import { ReportIssueApiRequest } from "@/apiRequests/reportIssue";
import { result } from "@/dto/result";
import { ReportIssueUpdateRequest } from "@/dto/request/ReportIssueRequest";
import { useToast } from "@/components/ui/use-toast";
import PageAnimate from "@/components/PageAnimate";
import LoadingSpinner from "@/components/LoadingSpinner";

function ReportIssuePage({ roomId, apartmentId, isManage = false }: {
	roomId?: string;
	apartmentId?: string;
	isManage?: boolean
}) {

	const { toast } = useToast();

	const [page, setPage] =
		useState({
			currentPage: 0,
			totalPage: 5
		});

	const [data, setData]
		= useState<ReportIssueResponse [] | undefined>(undefined);

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<ReportIssueResponse>>>(
		(data: {
			sessionToken: string,
			params: string,
			pageNum: number,
		}) => ReportIssueApiRequest.getAllReportIssueService(data)
	);

	const {
		error: errorChangeStatus,
		isFetching: isFetchingChangeStatus,
		fetch: changeStatus
	} = useFetch<ApiResponse<result<ReportIssueResponse>>>(
		(data: {
			sessionToken: string,
			data: ReportIssueUpdateRequest,
		}) => ReportIssueApiRequest.updateReportIssue(data)
	);

	const [param, setParam] = useState<string>(
		roomId !== undefined
			? "?roomId=" + roomId
			: apartmentId !== undefined
				? "?apartmentId=" + apartmentId
				: ""
	);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
	};

	useEffect(() => {
		async function fetchData() {
			const token = localStorage.getItem("token") || "";
			console.log(param);
			const res = await fetch({
				sessionToken: token,
				params: param,
				pageNum: page.currentPage
			});
			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result.totalPage };
			});
			setData(res?.payload?.result.data);
			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result.totalPage };
			});
		}

		fetchData();
	}, [page.currentPage, param]);

	async function handleChangStatus({ reportIssueId, status }: {
		reportIssueId: string,
		status: string
	}) {

		const res = await changeStatus({
			sessionToken: localStorage.getItem("token") || "",
			data: {
				reportIssueId,
				status
			}
		});

		console.log(res);

		if (res?.code === 0) {
			setData((prev) => {
				return prev?.map((issue) => {
					if (issue.reportIssueId === reportIssueId) {
						issue.status = status;
					}
					return issue;
				});
			});
		} else {
			toast({ description: "Lỗi khi thay đổi trạng thái, vui lòng thử lại", variant: "destructive" });
		}
	}

	return (
		<PageAnimate>
			<div className="container mx-auto p-4">
				<ReportIssueFilter
					setParams={(s: string) => setParam(s)}
					roomId={roomId}
					apartmentId={apartmentId}
				/>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-4">
					{isFetching
						? <LoadingSpinner />
						: data !== undefined && data.length !== 0
							? data.map((issue) => (

								<ReportIssueItem
									key={issue.reportIssueId}
									issue={issue} isManage={isManage}
									onChangeStatus={
										({ reportIssueId, status }: {
											reportIssueId: string,
											status: string
										}) => handleChangStatus({ reportIssueId, status })
									}
								/>

							))
							: <div className="text-center text-gray-500 dark:text-gray-300">
								Không có dữ liệu
							</div>
					}
				</div>
				<Pagination
					handlePageClick={handlePageChange}
					pageCount={page.totalPage}
					currentPage={page.currentPage}
				/>
			</div>
		</PageAnimate>
	);
}

export default ReportIssuePage;