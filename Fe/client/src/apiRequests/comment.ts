import { http } from "@/lib";
import { verificationResponse } from "@/dto/response/verification";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import { listResponse } from "@/dto/response/listResponse";
import { result } from "@/dto/result";
import { commentResponse } from "@/dto/response/comment";

const commentApiRequest = {
	getAllComment: (
		data: {
			page: number,
			rentalPostId: string
		}
	) => http.get<listResponse<commentResponse>>(
		`/post/comment/all/${data.page}?postId=${data.rentalPostId}`,
		{}
	),
	createComment: (
		data: {
			postId: string,
			content: string
			parentId: string | null,
			sessionToken: string
		}
	) => http.post<result<commentResponse>>(
		`/post/comment`,
		{
			postId: data.postId,
			content: data.content,
			parentId: data.parentId
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	updateComment: (
		data: {
			commentId: string,
			content: string,
			sessionToken: string
		}
	) => http.put<result<commentResponse>>(
		`/post/comment/${data.commentId}`,
		{
			content: data.content,
			commentId: data.commentId
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	),
	deleteComment: (
		data: {
			commentId: string,
			sessionToken: string
		}
	) => http.delete<result<string>>(
		`/post/comment/${data.commentId}`,
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	reportComment: (
		data: {
			commentId: string,
			sessionToken: string,
			message: string
		}
	) => http.post<result<string>>(
		`/post/comment/report`,
		{
			commentId: data.commentId,
			message: data.message
		},
		{
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}
	)
};

export default commentApiRequest;