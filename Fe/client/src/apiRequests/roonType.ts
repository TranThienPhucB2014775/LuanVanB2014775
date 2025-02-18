import { http } from "@/lib";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";
import { TypeOf } from "zod";
import { roomTypeRequest } from "@/dto/request/RoomTypeRequest";
import { listResponse } from "@/dto/response/listResponse";
import { result } from "@/dto/result";

const roomTypeApiRequest = {
	createRooType: (data: {
		data: typeof roomTypeRequest;
		sessionToken: string;
	}) =>
		http.post<roomTypeResponse>("/property/room-types", data.data, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	updateRoomType: (data: {
		data: typeof roomTypeRequest;
		sessionToken: string;
		roomTypeId: string;
	}) =>
		http.put<roomTypeResponse>("/property/room-types", { ...data.data, roomTypeId: data.roomTypeId }, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	deleteRoomType: (data: {
		roomTypeId: string,
		sessionToken: string
	}) =>
		http.delete<null>(`/property/room-types/${data.roomTypeId}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	enableRoomType: (data: {
		roomTypeId: string,
		sessionToken: string
	}) =>
		http.patch<null>(`/property/room-types/${data.roomTypeId}/enable`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getRoomTypes: (data: {
		sessionToken: string,
		params: string,
		page: number
	}) =>
		http.get<listResponse<roomTypeResponse>>(`/property/room-types/all/${data.page}?${data.params}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getRoomType: (data: {
		sessionToken: string,
		roomTypeId: string
	}) =>
		http.get<result<roomTypeResponse>>(`/property/room-types/${data.roomTypeId}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	sendNotification: (
		data: {
			sessionToken: string,
			id: string,
			data: {
				title: string;
				message: string;
			}
		}
	) => http.post<result<string>>(`/property/room-types/notification/${data.id}`,
		{ ...data.data },
		{
			headers: { Authorization: `Bearer ${data.sessionToken}` }
		})
};

export default roomTypeApiRequest;
