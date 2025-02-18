"use client";

import React, { useEffect, useState } from "react";
import { SummaryResponse } from "@/dto/response/SummaryResponse";
import DashBoardChart from "@/components/manage/dashboard/DashBoardChart";
import FilterRevenue from "@/components/manage/dashboard/FilterRevenue";
import summaryApiRequest from "@/apiRequests/summary";

function RevenueStatistics({ apartmentId, roomTypeId, roomId }: {
	apartmentId?: string,
	roomTypeId?: string,
	roomId?: string
}) {

	// const [summary, setSummary] = useState<SummaryResponse | undefined>(undefined);
	//
	//
	// useEffect(() => {
	// 	async function fetchSummary() {
	//
	// 		const params = new URLSearchParams();
	// 		if (apartmentId) {
	// 			params.append("apartmentId", apartmentId);
	// 		}
	// 		if (roomTypeId) {
	// 			params.append("roomTypeId", roomTypeId);
	// 		}
	// 		if (roomId) {
	// 			params.append("roomId", roomId);
	// 		}
	// 		const res = await summaryApiRequest.getSummary({
	// 			sessionToken: localStorage.getItem("token") || "",
	// 			params: params.toString()
	// 		});
	// 		setSummary(res.payload?.result);
	// 	}
	//
	// 	fetchSummary();
	// }, []);

	return (
		<div className="py-4">
			<DashBoardChart
				roomId={roomId}
				roomTypeId={roomTypeId}
				apartmentId={apartmentId}
			/>
			{/*{!roomId &&*/}
			{/*	<FilterRevenue*/}
			{/*		apartmentId={apartmentId}*/}
			{/*		roomTypeId={roomTypeId}*/}
			{/*		roomId={roomId}*/}
			{/*	/>}*/}
		</div>
	);
}

export default RevenueStatistics;