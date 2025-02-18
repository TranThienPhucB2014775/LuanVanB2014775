"use client";

import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import feedBackApiRequest from "@/apiRequests/FeedBack";
import { FeedBackResponse, FeedBackResponses } from "@/dto/response/FeedBackResponse";
import { scrollToTop } from "@/util/scrollToTop";
import Pagination from "@/components/Pageinate";
import ReviewItem from "@/components/feedBack/ReviewItem";
import ReviewForm from "@/components/feedBack/ReviewForm";

function Reviews({
					 itemId,
					 userId,
					 isManage = false,
					 isView = true
				 }: { itemId: string; isManage?: boolean; userId: string; isView?: boolean }) {

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 1
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev: any) => {
				return { ...prev, currentPage: selected };
			}
		);
		scrollToTop();
	};

	const [feedBacks, setFeedBacks]
		= useState<FeedBackResponses | undefined | null>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	const { error, isFetching, fetch } = useFetch<ApiResponse<FeedBackResponses>>(
		(data: {
			param: string, pageNum: number, sessionToken: string
		}) => feedBackApiRequest.getFeedBacks(data)
	);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const params = new URLSearchParams();

			if (itemId) {
				params.append("itemId", itemId);
			}

			if (userId) {
				params.append("userId", userId);
			}

			const res = await fetch({
				param: params,
				pageNum: page.currentPage,
				sessionToken: localStorage.getItem("token")
			});
			setFeedBacks(res?.payload);
			setPage((prev: any) => {
				return { ...prev, totalPage: res?.payload?.result.totalPage };
			});
			setLoading(false);
		}

		fetchData();
	}, [page.currentPage]);

	function updateFeedBack(feedBack: FeedBackResponse) {
		setFeedBacks((prev: any) => {
			const newFeedBacks = prev?.result.data.map((f: FeedBackResponse) => {
				if (f.id === feedBack.id) {
					return feedBack;
				}
				return f;
			});
			return { ...prev, result: { ...prev?.result, data: newFeedBacks } };
		});
	}

	return (
		<div className="mx-auto max-w-3xl space-y-8 py-12">
			{
				<div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow-sm">
					{!userId &&
						<div className="flex items-center gap-4">
							<>
								<div className="flex items-center gap-2 text-4xl font-bold">
									<StarIcon className="w-10 h-10 text-yellow-400" />
									<span>{feedBacks?.result.averageRating?.toFixed(1) || 0}</span>
								</div>

								<div className="text-sm text-gray-600">
									Dựa trên {feedBacks?.result.totalElement || 0} đánh giá
								</div>
							</>

						</div>}
					{
						!isView && <ReviewForm
							FeedBackType="LANDLORD"
							itemId={itemId}
							updateFeedBack={(feedBack: FeedBackResponse) => updateFeedBack(feedBack)}
						/>
					}
				</div>
			}

			{loading ? (
				<div className="text-center py-10">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					<p className="mt-2 text-gray-500">Đang tải...</p>
				</div>
			) : feedBacks?.result.data && feedBacks?.result.data.length > 0
				? (
					feedBacks?.result.data.map(feedBack => (
						<ReviewItem
							key={feedBack.id}
							feedBack={feedBack}
							updateFeedBack={(feedBack: FeedBackResponse) => updateFeedBack(feedBack)}
							userId={userId}
						/>
					))
				)
				: (<div className="text-center py-10 text-gray-500">Chưa có đánh giá nào</div>)
			}

			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>
		</div>
	);
}

export default Reviews;