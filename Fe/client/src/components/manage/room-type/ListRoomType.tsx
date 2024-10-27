import React, { useEffect, useState } from "react";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import RoomTypeItem from "@/components/manage/room-type/RoomTypeItem";

function ListRoomType({ data, handelChangData, isManage }: {
	data: Array<roomTypeResponse> | undefined;
	handelChangData: Function;
	isManage: boolean;
}) {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (data !== undefined) {
			setLoading(false);
		}
	}, [data]);

	return (
		<div className="py-4">
			{loading ? (
				<div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>
			) : (
				<div className="flex flex-row flex-wrap gap-5 w-full justify-center py-4">
					{data !== undefined && data.length !== 0
						? data.map((roomType, index) =>
							<RoomTypeItem
								roomType={roomType} key={index}
								handleChangeData={handelChangData}
								isManage={isManage}
							/>)
						: <div className="text-center text-gray-500 dark:text-gray-300">
							Không có dữ liệu
						</div>
					}
				</div>
			)}
		</div>
	);
}

export default ListRoomType;