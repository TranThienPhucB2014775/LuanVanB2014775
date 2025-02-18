import { http } from "@/lib";
import { listResponse } from "@/dto/response/listResponse";
import { tenantResponsesType, TenantRoomResponse } from "@/dto/response/tenantResponse";
import { result } from "@/dto/result";
import { tenantResponseOfLandlord } from "@/dto/response/tenantPostResponse";


const tenantApiRequest = {
	getTenantsFromRoom: (
		{
			roomId,
			pageNum,
			isAvailable,
			sessionToken
		}: {
			roomId: string;
			pageNum: number;
			isAvailable: boolean;
			sessionToken: string;
		}) =>
		http.get<listResponse<tenantResponsesType>>(`/property/tenants/${roomId}/${pageNum}/tenants?isAvailable=${isAvailable}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	getTenantsFromUser: (
		{
			pageNum,
			param,
			sessionToken
		}: {
			pageNum: number;
			param: string;
			sessionToken: string;
		}) =>
		http.get<listResponse<TenantRoomResponse>>(`/property/tenants/${pageNum}/rental-history${param}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	getAllTenantOfLandlord: (
		{
			pageNum,
			params,
			sessionToken
		}: {
			pageNum: number;
			params: string;
			sessionToken: string;
		}) =>
		http.get<listResponse<tenantResponseOfLandlord>>(`/property/tenants/${pageNum}/all${params}`, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	landlordInviteTenantLeaving: (
		{
			roomId,
			tenantId,
			sessionToken
		}: {
			roomId: string;
			tenantId: string;
			sessionToken: string;
		}) =>
		http.post<string>(`/property/tenants/leave`, {
			roomId,
			tenantId
		}, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
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
	) => http.post<result<string>>(`/property/tenants/notification/${data.id}`,
		{ ...data.data },
		{
			headers: { Authorization: `Bearer ${data.sessionToken}` }
		})
};

export default tenantApiRequest;
