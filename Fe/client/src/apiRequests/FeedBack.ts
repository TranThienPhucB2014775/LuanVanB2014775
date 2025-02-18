import { roomRequest } from "@/dto/request/room";
import { http } from "@/lib";
import { roomResponse } from "@/dto/response/roomResponse";
import { listResponse } from "@/dto/response/listResponse";
import { feedBackRequest } from "@/dto/request/FeedBackRequest";
import { FeedBackResponse, FeedBackResponses } from "@/dto/response/FeedBackResponse";
import { result } from "@/dto/result";

const feedBackApiRequest = {
	createFeedBack: (data: {
		data: {
			itemId: string;
			rating: number;
			feedBackType: string;
			feedback: string;
		};
		sessionToken: string;
	}) =>
		http.post<result<FeedBackResponse>>("/interact/feedback",{
			itemId: data.data.itemId,
			rating: data.data.rating,
			feedBackType: data.data.feedBackType,
			feedBack: data.data.feedback
		}, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	updateFeedBack: (data: {
		data: {
			id: string
			rating: number;
			feedback: string;
		};
		sessionToken: string;
	}) =>
		http.put<result<FeedBackResponse>>("/interact/feedback", data.data, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getFeedBacks: (data: {
		param: string;
		pageNum: number;
		sessionToken: string;
	}) =>
		http.get<FeedBackResponses>(
			`/interact/feedback/all/${data.pageNum}?${data.param}`,
			{
				headers: {
					Authorization: `Bearer ${data.sessionToken}`
				}
			}
		)
};

export default feedBackApiRequest;