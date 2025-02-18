import { http } from "@/lib";
import { verificationResponse } from "@/dto/response/verification";
import { result } from "@/dto/result";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import { rentalPostListResponse } from "@/dto/response/listResponse";
import { tenantPostCreationRequest } from "@/components/tenantPost/TenantPostForm";

const tenantPostApiRequest = {
	getAllTenantPost: (
		data: {
			params: string,
			page: number,
			sessionToken: string
		}
	) => http.get<rentalPostListResponse<tenantPostResponse>>(
		`/post/tenant-post/all/${data.page}?${data.params}`,
		{
			headers: {
				Authorization: `${data.sessionToken !== "" && `Bearer ${data.sessionToken}`}`
			}
		}
	),
	getTenantPostById: (data: {
							id: string,
							sessionToken?: string
						}
	) => {
		if (data.sessionToken !== undefined) {
			return http.get<result<tenantPostResponse>>(
				`/post/tenant-post/${data.id}`,
				{
					headers: {
						Authorization: `Bearer ${data.sessionToken}`
					}
				}
			);
		}

		return http.get<result<tenantPostResponse>>(
			`/post/tenant-post/${data.id}`,
			{}
		);
	},
	reportTenantPost: (
		data: {
			tenantPostId: string,
			message: string,
			sessionToken: string
		}
	) => http.post<result<string>>(
		`/post/tenant-post/report`,
		{
			tenantPostId: data.tenantPostId,
			message: data.message
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	createTenantPost: (
		data: {
			data: typeof tenantPostCreationRequest,
			sessionToken: string
		}
	) => http.post<result<typeof tenantPostCreationRequest>>(
		`/post/tenant-post`,
		data.data,
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	updateTenantPost: (
		data: {
			tenantPostId: string,
			data: typeof tenantPostCreationRequest,
			sessionToken: string
		}) => http.put<result<typeof tenantPostCreationRequest>>(
		`/post/tenant-post`,
		{
			...data.data,
			tenantPostId: data.tenantPostId
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	enableTenantPost: (
		data: {
			tenantPostId: string,
			sessionToken: string
		}) => http.put<result<string>>(
		`/post/tenant-post/${data.tenantPostId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	disableTenantPost: (
		data: {
			tenantPostId: string,
			sessionToken: string
		}) => http.delete<result<string>>(
		`/post/tenant-post/${data.tenantPostId}`,
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	)
};

export default tenantPostApiRequest;