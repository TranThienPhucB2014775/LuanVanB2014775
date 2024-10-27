"use server";

import React from "react";
import ListApartmentPage from "@/components/manage/apartment/ListApartmentPage";

async function Page() {
	return (
		<ListApartmentPage userId="" isManage={true}/>
	);
}

export default Page;