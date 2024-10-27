import { http } from "@/lib";
import { verificationResponse } from "@/dto/response/verification";
import { result } from "@/dto/result";
import { RentalPostListResponse, RentalPostResponse } from "@/dto/response/rentalPost";
import { listResponse, rentalPostListResponse } from "@/dto/response/listResponse";
import { rentalPostUpdateRequest } from "@/dto/request/rentalPostRequest";

const rentalPostApiRequest = {
	getAllRentalPost: (
		data: {
			params: string,
			page: number,
			sessionToken: string
		}
	) => http.get<rentalPostListResponse<RentalPostListResponse>>(
		`/post/rental-post/all/${data.page}?${data.params}`,
		{
			headers: {
				Authorization: `${data.sessionToken !== "" && `Bearer ${data.sessionToken}`}`
			}
		}
	),
	getRentalPostById: (data: {
							id: string,
							sessionToken?: string
						}
	) => {
		console.log(data);
		if (data.sessionToken !== undefined) {
			return http.get<result<RentalPostResponse>>(
				`/post/rental-post/${data.id}`,
				{
					headers: {
						Authorization: `Bearer ${data.sessionToken}`
					}
				}
			);
		}

		return http.get<result<RentalPostResponse>>(
			`/post/rental-post/${data.id}`,
			{}
		);
	},
	reportRentalPost: (
		data: {
			rentalPostId: string,
			message: string,
			sessionToken: string
		}
	) => http.post<result<string>>(
		`/post/rental-post/report`,
		{
			rentalPostId: data.rentalPostId,
			message: data.message
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	createRentalPost: (
		data: {
			data: FormData,
			sessionToken: string
		}
	) => http.post<result<RentalPostResponse>>(
		`/post/rental-post`,
		data.data,
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	updateRentalPost: (
		data: {
			rentalPostId: string,
			data: typeof rentalPostUpdateRequest,
			sessionToken: string
		}) => http.put<result<RentalPostResponse>>(
		`/post/rental-post`,
		{
			...data.data,
			rentalPostId: data.rentalPostId
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	enableRentalPost: (
		data: {
			rentalPostId: string,
			sessionToken: string
		}) => http.put<result<string>>(
		`/post/rental-post/${data.rentalPostId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	disableRentalPost: (
		data: {
			rentalPostId: string,
			sessionToken: string
		}) => http.delete<result<string>>(
		`/post/rental-post/${data.rentalPostId}`,
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	)
};

export default rentalPostApiRequest;