import React, { Suspense } from "react";
import ApartmentDetail from "@/components/manage/apartment/ApartmentDetail";
import RoomTypeDetail from "@/components/manage/room-type/RoomTypeDetail";
import ListRoomTypePage from "@/components/manage/room-type/ListRoomTypePage";
import ListRoom from "@/components/manage/room/ListRoom";
import RoomTypePage from "@/components/manage/room-type/RoomTypePage";

function Page({ params }: { params: { roomTypeId: string } }) {

	return (
		<RoomTypePage roomTypeId={params.roomTypeId}>
			<Suspense fallback={<div>Loading...</div>}>
				<RoomTypeDetail roomTypeId={params.roomTypeId} isManage={true} />
			</Suspense>
		</RoomTypePage>
	);
}

export default Page;