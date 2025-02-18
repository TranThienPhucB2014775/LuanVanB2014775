import { listResponse } from "@/dto/response/listResponse";

export type FeedBackResponse = {
	id: string
	rating: number;
	userId: string;
	userName: string;
	feedBack: string
	imgAvatar: string
	isAvailable: boolean
	itemId: string
	feedBackType: string
}

export type FeedBackResponses =listResponse<FeedBackResponse> & {
	result: {
		averageRating: number;
	}
}