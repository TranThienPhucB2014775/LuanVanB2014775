import { http } from "@/lib";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import { listResponse } from "@/dto/response/listResponse";
import { apartmentRequest } from "@/dto/request/apartment";
import { result } from "@/dto/result";
import { FeedBackResponse } from "@/dto/response/FeedBackResponse";

const apartmentApiRequest = {
	getApartments: (data: {
		sessionToken: string,
		params: string,
		page: number
	}) => http.get<listResponse<apartmentResponse>>(`/property/apartment/all/${data.page}?${data.params}`, {
		headers: {
			Authorization: `Bearer ${data.sessionToken}`
		}
	}),
	createApartment: (data: {
		sessionToken: string,
		data: typeof apartmentRequest
	}) => http.post<apartmentResponse>(`/property/apartment`,
		{ ...data.data },
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	updateApartment: (data: {
		sessionToken: string,
		data: typeof apartmentRequest,
		apartmentId: string
	}) => http.post<apartmentResponse>(`/property/apartment`,
		{ ...data.data, apartmentId: data.apartmentId },
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getApartment: (data: {
		sessionToken: string,
		apartmentId: string
	}) => http.get<result<apartmentResponse>>(`/property/apartment/${data.apartmentId}`, {
		headers: {
			Authorization: `Bearer ${data.sessionToken}`
		}
	}),
	disableApartment: (data: {
		sessionToken: string,
		apartmentId: string
	}) => http.delete<null>(`/property/apartment/${data.apartmentId}`, {
		headers: {
			Authorization: `Bearer ${data.sessionToken}`
		}
	}),
	enableApartment: (data: {
		sessionToken: string,
		apartmentId: string
	}) => http.patch<null>(`/property/apartment/${data.apartmentId}/enable`, {
		headers: {
			Authorization: `Bearer ${data.sessionToken}`
		}
	}),
	createFeedBack: (
		data: {
			sessionToken: string,
			data: {
				apartmentId: string;
				rating: number;
				feedback: string;
			}
		}
	) => http.post<result<FeedBackResponse>>(`/property/apartment/rating`,
		{ ...data.data },
		{
			headers: { Authorization: `Bearer ${data.sessionToken}` }
		}),
	reportApartment: (
		data: {
			sessionToken: string,
			data: {
				apartmentId: string;
				message: string;
			}
		}
	) => http.post<null>(`/property/apartment/report`,
		{ ...data.data },
		{
			headers: { Authorization: `Bearer ${data.sessionToken}` }
		})
};

export default apartmentApiRequest;
