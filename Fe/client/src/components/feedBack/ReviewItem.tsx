import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import envConfig from "@/config";
import { Button } from "@/components/ui/button";
import { FlagIcon, Star, ExternalLinkIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { FeedBackResponse } from "@/dto/response/FeedBackResponse";
import ReviewForm from "@/components/feedBack/ReviewForm";

function getFeedBackTypePath(feedBackType: string): string {
	switch (feedBackType) {
		case "LANDLORD":
			return "user";
		case "APARTMENT":
			return "apartment";
		default:
			return "landlord";
	}
}

function getFeedBackTypeDisplay(feedBackType: string): string {
	switch (feedBackType) {
		case "LANDLORD":
			return "Chủ nhà";
		case "APARTMENT":
			return "Căn hộ";
		default:
			return "Đánh giá";
	}
}

export default function ReviewItem({
									   feedBack,
									   updateFeedBack,
									   userId
								   }: {
	feedBack: FeedBackResponse;
	updateFeedBack: Function;
	userId?: string;
}) {
	const token = localStorage.getItem("token");
	const jwt = require("jsonwebtoken");
	const decoded = jwt.decode(token);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
			<div className="flex items-start gap-4">
				<Avatar className="w-12 h-12 border">
					<AvatarImage
						src={`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/${feedBack.imgAvatar}`}
						alt={feedBack.userName}
					/>
					<AvatarFallback>{feedBack.userName.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1 space-y-2">
					<div className="flex items-center justify-between">
						<div>
							<div className="font-medium text-lg">{feedBack.userName}</div>
							<div className="flex items-center mt-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`w-4 h-4 ${
											star <= feedBack.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
										}`}
									/>
								))}
								<span className="ml-2 text-sm text-gray-600">{feedBack.rating}/5</span>
							</div>
						</div>
						<div className="flex gap-2">
							{decoded.sub === feedBack.userId && (
								<ReviewForm
									FeedBackType={""}
									itemId={""}
									feedBack={{
										rating: feedBack.rating,
										id: feedBack.id,
										feedback: feedBack.feedBack
									}}
									updateFeedBack={(feedBack: FeedBackResponse) => updateFeedBack(feedBack)}
								/>
							)}
							{decoded.sub !== feedBack.userId && (
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" size="sm" className="flex items-center gap-2">
											<FlagIcon className="w-4 h-4" />
											Báo cáo
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>Báo cáo vi phạm</DialogTitle>
											<DialogDescription>
												Hãy cho chúng tôi biết lý do bạn báo cáo đánh giá này. Chúng tôi sẽ xem
												xét báo cáo của bạn và thực hiện hành động thích hợp.
											</DialogDescription>
										</DialogHeader>
										<Button type="submit" onClick={() => null}>Gửi báo cáo</Button>
									</DialogContent>
								</Dialog>
							)}
						</div>
					</div>
					<p className="text-gray-600 mt-2 leading-relaxed">{feedBack.feedBack}</p>
					{userId && (
						<div className="mt-2 space-y-1">
							<div className="text-sm text-gray-600">
								Loại đánh giá: {getFeedBackTypeDisplay(feedBack.feedBackType)}
							</div>
							<Link
								href={`/${getFeedBackTypePath(feedBack.feedBackType)}/${feedBack.itemId}`}
								className="inline-flex items-center text-sm text-blue-600 hover:underline"
							>
								Xem mục đã đánh giá
								<ExternalLinkIcon className="w-4 h-4 ml-1" />
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}