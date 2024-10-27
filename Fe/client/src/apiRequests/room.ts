import { http } from "@/lib";
import { roomRequest } from "@/dto/request/room";
import { listResponse } from "@/dto/response/listResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import { roomResponse } from "@/dto/response/roomResponse";
import { result } from "@/dto/result";

const roomApiRequest = {
	createRoom: (data: {
		data: typeof roomRequest;
		sessionToken: string;
	}) =>
		http.post<roomResponse>("/property/rooms", data.data, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	updateRoom: (data: {
		name: string;
		roomId: string;
		sessionToken: string;
	}) =>
		http.put<roomResponse>("/property/rooms", {
			name: data.name, roomId: data.roomId
		}, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getRooms: (data: {
		sessionToken: string,
		params: string,
		page: number
	}) =>
		http.get<listResponse<roomResponse>>(`/property/rooms/all/${data.page}?${data.params}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getRoomByRoomId: (data: {
		sessionToken: string,
		roomId: string
	}) =>
		http.get<result<roomResponse>>(`/property/rooms/${data.roomId}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	deleteRoom: (data: {
		sessionToken: string,
		roomId: string
	}) => {
		console.log(data);
		return http.delete<result<any>>(`/property/rooms/${data.roomId}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		});
	},
	enableRoom: (data: {
		sessionToken: string,
		roomId: string
	}) =>
		http.patch<result<any>>(`/property/rooms/${data.roomId}/enable`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		})
};

export default roomApiRequest;
