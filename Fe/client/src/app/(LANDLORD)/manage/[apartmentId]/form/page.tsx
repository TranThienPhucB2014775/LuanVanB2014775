import React from "react";
import roomTypeApiRequest from "@/apiRequests/roonType";
import { cookies } from "next/headers";
import RoomTypeForm from "@/app/(LANDLORD)/manage/room-type/form/RoomTypeForm";
import { CardTitle } from "@/components/ui/card";

async function Page({ searchParams, params }: { searchParams: any; params: { apartmentId: string } }) {

	const { action, roomTypeId } = searchParams;
	const cookieStore = cookies();

	let data: any = null;

	if (action === "update" && Boolean(roomTypeId)) {
		console.error("Room type id is required for update action");
		data = await roomTypeApiRequest.getRoomType({
			sessionToken: cookieStore.get("sessionToken")?.value ?? "",
			roomTypeId: roomTypeId
		});
	}

	return (
		<div>
			<CardTitle className="text-center pb-10">{action === "update" ? 'Chỉnh sửa loại phòng' : 'Thêm mới loại phòng'}</CardTitle>
			<RoomTypeForm roomType={data ? data.payload.result : null} apartmentId={params.apartmentId}
						  type={action === "update" ? "update" : "create"} />
		</div>
	);
}

export default Page;