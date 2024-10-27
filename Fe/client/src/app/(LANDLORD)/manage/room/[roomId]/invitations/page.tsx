import React from "react";
import ListTenant from "@/components/manage/room/ListTenant";
import InventionPage from "@/components/manage/room/InventionPage";

function Page({ params }: { params: { roomId: string } }) {
	return (
		<InventionPage  roomId={params.roomId} />
	);
}

export default Page;