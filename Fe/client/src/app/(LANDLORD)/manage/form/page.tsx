"use client";

import React, { useEffect, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import { apartmentRequest } from "@/dto/request/apartment";
import apartmentApiRequest from "@/apiRequests/apartment";
import ApartmentForm from "@/app/(LANDLORD)/manage/form/ApartmentForm";
import { CardTitle } from "@/components/ui/card";
import { result } from "@/dto/result";
import LoadingSpinner from "@/components/LoadingSpinner";

function Page({ searchParams }: { searchParams: any }) {

	const { apartmentId } = searchParams;

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<apartmentResponse>>>(
		(data: {
			sessionToken: string,
			apartmentId: string
		}) => apartmentApiRequest.getApartment(data)
	);

	const [apartment, setApartment] = useState<apartmentResponse | null>();

	useEffect(() => {

		async function fetchData() {
			const res = await fetch({
				sessionToken: localStorage.getItem("token"),
				apartmentId: apartmentId
			});
			// @ts-ignore
			setApartment(res.payload?.result);
		}

		if (apartmentId !== undefined) {
			fetchData();
		}

	}, []);

	return (
		<>
			{/*<CardTitle className="text-center pb-10">{apartment ? 'Chỉnh sửa căn hộ' : 'Thêm mới căn hộ'}</CardTitle>*/}
			{isFetching
				? <LoadingSpinner />
				: <ApartmentForm apartment={apartment} apartmentId={apartmentId} />
			}
		</>
	);
}

export default Page;