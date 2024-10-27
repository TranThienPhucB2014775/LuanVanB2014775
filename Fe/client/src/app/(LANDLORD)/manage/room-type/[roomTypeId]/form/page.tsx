import React from "react";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { cookies } from "next/headers";
import RoomForm from "@/app/(LANDLORD)/manage/room-type/[roomTypeId]/form/RoomForm";
import { CardTitle } from "@/components/ui/card";
import roomApiRequest from "@/apiRequests/room";

async function Page({ searchParams, params }: { searchParams: any; params: { roomTypeId: string } }) {

	const { action, roomId } = searchParams;
	const cookieStore = cookies();


	let data: any = null;

	console.log(action, roomId);

	if (action === "update" && Boolean(roomId)) {
		data = await roomApiRequest.getRoomByRoomId({
			sessionToken: cookieStore.get("sessionToken")?.value ?? "",
			roomId: roomId
		});
	}

	console.log(data);

	return (
		<div>
			<CardTitle
				className="text-center pb-10">{action === "update" ? "Chỉnh sửa phòng" : "Thêm mới phòng"}</CardTitle>
			<RoomForm room={data ? data.payload.result : null}
					  roomTypeId={params.roomTypeId}
					  type={action === "update" ? "update" : "create"}

			/>
		</div>
	);
}

export default Page;