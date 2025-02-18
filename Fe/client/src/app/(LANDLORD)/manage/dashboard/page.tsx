import React from "react";
import Dashboard from "@/components/manage/dashboard/Dashboard";
import summaryApiRequest from "@/apiRequests/summary";
import { cookies } from "next/headers";
import NotFound from "@/app/not-found";

async function Page() {

	const cookieStore = cookies();

	const data = await summaryApiRequest.getSummary({
		sessionToken: cookieStore.get("sessionToken")?.value || "",
		params: ""
	});

	const invoiceUnPaid = await summaryApiRequest.getInvoiceUnPaid({
		sessionToken: cookieStore.get("sessionToken")?.value || "",
		params: ""
	});

	console.log(invoiceUnPaid);

	if (data.payload?.result === undefined) {
		return <NotFound />;
	}

	return (
		<Dashboard data={data.payload?.result} invoiceUnPaid={invoiceUnPaid.payload?.result} />
	);
}

export default Page;