import { http } from "@/lib";
import { result } from "@/dto/result";
import { InvitationResponse } from "@/dto/response/InvitationResponse";
import { InviteCreationRequest } from "@/dto/request/invitations";
import { listResponse } from "@/dto/response/listResponse";


const inventionApiRequest = {
	inviteTenant: (
		{
			inviteCreationRequest,
			roomId,
			sessionToken
		}: {
			inviteCreationRequest: object;
			roomId: string;
			sessionToken: string;
		}) =>
		http.post<result<InvitationResponse>>(`/property/invitations/invite`, {
			roomId,
			...inviteCreationRequest
		}, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	getAllInventionByUser: (
		{
			sessionToken,
			pageNum
		}: {
			sessionToken: string;
			pageNum: number;
		}
	) => http.get<listResponse<InvitationResponse>>(
		`/property/invitations/${pageNum}`,
		{
			headers:
				{
					Authorization: `Bearer ${sessionToken}`
				}
		}
	),
	getAllInvention: (
		{
			sessionToken,
			pageNum,
			params
		}: {
			sessionToken: string;
			pageNum: number
			params: string
		}
	) => http.get<listResponse<InvitationResponse>>(`/property/invitations/all/${pageNum}${params}`, {
		headers:
			{
				Authorization: `Bearer ${sessionToken}`
			}
	}),
	refuseInvention: (
		{
			sessionToken,
			invitationToken
		}: {
			sessionToken: string;
			invitationToken: string;
		}
	) => http.post<string>(`/property/invitations/refuse`,
		{
			inviteToken: invitationToken
		},
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	acceptInvention: (
		{
			sessionToken,
			invitationToken
		}: {
			sessionToken: string;
			invitationToken: string;
		}
	) => http.post<string>(`/property/invitations/accept`,
		{
			inviteToken: invitationToken
		},
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	disableInvention: (
		{
			sessionToken,
			invitationToken
		}: {
			sessionToken: string;
			invitationToken: string;
		}
	) => http.post<string>(`/property/invitations/disable`,
		{
			inviteToken: invitationToken
		},
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		})
};

export default inventionApiRequest;
