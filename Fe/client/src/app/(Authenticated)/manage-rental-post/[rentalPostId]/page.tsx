"use client";

import React, { useEffect, useState } from "react";
import RentalPostForm from "@/components/manage-rental-post/ManageRentalPostForm";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import RentalPostFormImage from "@/components/manage-rental-post/ManageRentalPostFormImage";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import authApiRequest from "../../../../apiRequests/auth";

function Page({ params }: { params: { rentalPostId: string } }) {

	// const rentalPost = await rentalPostApiRequest.getRentalPostById(params.rentalPostId);

	const [post, setPost] = useState<RentalPostResponse | undefined>(undefined);
	useEffect(() => {
		async function fetchData() {
			const rentalPostDetail = await rentalPostApiRequest.getRentalPostById(
				{
					id: params.rentalPostId,
					sessionToken: localStorage.getItem("token") || ""
				});
			setPost(rentalPostDetail.payload?.result);
		}

		fetchData();
	}, []);

	if (post === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<RentalPostForm rentalPost={post} />
			<RentalPostFormImage rentalPost={post} />
		</>
	);
}

export default Page;