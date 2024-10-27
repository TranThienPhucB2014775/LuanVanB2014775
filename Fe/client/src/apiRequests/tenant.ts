import { http } from "@/lib";
import { listResponse } from "@/dto/response/listResponse";
import { tenantResponsesType, TenantRoomResponse } from "@/dto/response/tenantResponse";


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
		})
};

export default tenantApiRequest;
