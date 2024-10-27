import React from "react";
import tenantPostApiRequest from "@/apiRequests/tenantPost";
import { cookies } from "next/headers";
import TenantPostForm from "@/components/tenantPost/TenantPostForm";

async function Page({ params }: { params: { tenantPostId: string } }) {

	const cookieStore = cookies();

	const token = cookieStore.get("sessionToken")?.value;

	const tenantPost = await tenantPostApiRequest.getTenantPostById(
		{
			id: params.tenantPostId,
			sessionToken: cookieStore.get("sessionToken")?.value
		}
	);

	return (
		<TenantPostForm tenantPostResponse={tenantPost.payload?.result} />
	);
}

export default Page;