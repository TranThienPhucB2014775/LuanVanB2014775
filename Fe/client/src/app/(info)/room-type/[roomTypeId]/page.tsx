import React, { Suspense } from "react";
import RoomTypeDetail from "@/components/manage/room-type/RoomTypeDetail";
import RoomTypePage from "@/components/manage/room-type/RoomTypePage";

function Page({ params }: { params: { roomTypeId: string } }) {

	return (
		<RoomTypePage roomTypeId={params.roomTypeId} isManage={false}>
			<Suspense fallback={<div>Loading...</div>}>
				<RoomTypeDetail roomTypeId={params.roomTypeId} isManage={false}/>
			</Suspense>
		</RoomTypePage>
	);
}

export default Page;