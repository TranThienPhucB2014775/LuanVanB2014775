"use client";

import React from "react";
import WriteNotification from "@/components/manage/WriteNotification";
import tenantApiRequest from "@/apiRequests/tenant";
import { useAppContext } from "@/app/app-provider";

function Page() {

	const { user } = useAppContext();

	return (
		< WriteNotification
			sendNotification={tenantApiRequest.sendNotification}
			id={user || ""}
		/>
	);
}

export default Page;