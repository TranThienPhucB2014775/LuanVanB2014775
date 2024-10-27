import React from "react";
import ListTenant from "@/components/manage/room/ListTenant";

function Page({ params }: { params: { roomId: string } }) {
	return (
		<ListTenant roomId={params.roomId} isAvailable={false} />
	);
}

export default Page;