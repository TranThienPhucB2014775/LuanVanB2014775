"use client";

import React, { useEffect } from "react";
import rentalPostApiRequest from "@/apiRequests/rentalPost";

function Test() {

	async function RentalPostInfo({ rentalPostId }: { rentalPostId: string }) {
		const res = await rentalPostApiRequest.getRentalPostById({ id: rentalPostId });
	}

	useEffect(() => {
		RentalPostInfo({
			rentalPostId: "2c971451-b1b5-47b8-986e-169c28ea0b54"
		});
	}, []);

	return (
		<div></div>
	);
}

export default Test;