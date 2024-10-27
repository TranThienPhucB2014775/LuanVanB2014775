import React, { useEffect, useState } from "react";
import { roomResponse } from "@/dto/response/roomResponse";
import RoomItem from "@/components/manage/room/RoomItem";

function ListRoom(
	{
		data,
		handelChangeData,
		isManage = false
	}:
		{
			data: Array<roomResponse> | undefined,
			handelChangeData: Function
			isManage?: boolean
		}) {

	return (
		<div className="pb-4">
			<div className="flex flex-row flex-wrap gap-5 w-full justify-center py-4">
				{data !== undefined &&
					data.map((roomType, index) => (
						<RoomItem
							room={roomType}
							key={index}
							handleChangeRoom={handelChangeData}
							isManage={isManage}
						/>
					))
				}
			</div>
		</div>
	);
}

export default ListRoom;