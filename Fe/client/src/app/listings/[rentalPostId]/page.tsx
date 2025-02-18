"use client"

import React, { Suspense, useEffect, useState } from "react";
import ListComment from "@/components/rentalPost/comment/ListComment";
import RentalPostInfo from "@/components/rentalPost/RentalPostInfo";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { FileX } from "lucide-react";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";

function Page({ params }: { params: { rentalPostId: string } }) {

	const [rentalPost, setRentalPost]
		= useState<ApiResponse<result<RentalPostResponse>> | undefined>(undefined);

	useEffect(() => {
		const fetchRentalPost = async () => {
			const rentalPostDetail = await rentalPostApiRequest.getRentalPostById({ id: params.rentalPostId });
			setRentalPost(rentalPostDetail);
		};

		fetchRentalPost();
	}, []);


	if (rentalPost?.code === 9005) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
				<FileX className="w-16 h-16 text-gray-400 mb-4" />
				<h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h1>
				<p className="text-gray-600 max-w-md">
					Xin lỗi, chúng tôi không thể tìm thấy bài viết bạn đang tìm kiếm. Nó có thể đã bị xóa hoặc không tồn
					tại.
				</p>
			</div>
		);
	}

	return (
		<div>
			{
				rentalPost?.payload?.result ? (
					<>
						{/*<Suspense fallback={<div>Loading...</div>}>*/}
							<RentalPostInfo rentalPostDetail={rentalPost.payload?.result} />
						{/*</Suspense>*/}
						<ListComment rentalPostId={params.rentalPostId} />
					</>
				) : null
			}
		</div>
	);
}

export default Page;