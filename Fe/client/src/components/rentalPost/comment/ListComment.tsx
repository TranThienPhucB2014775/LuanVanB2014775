"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import { commentResponse } from "@/dto/response/comment";
import commentApiRequest from "@/apiRequests/comment";
import Pagination from "@/components/Pageinate";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentCard } from "@/components/rentalPost/comment/CommentCard";
import contractApiRequest from "@/apiRequests/contract";
import { result } from "@/dto/result";
import { useAppContext } from "@/app/app-provider";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ListComment({ rentalPostId }: { rentalPostId: string }) {
	const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
	const commentFormRef = useRef<HTMLDivElement>(null);

	const [comments, setComments] = useState<commentResponse[] | undefined>(undefined);

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<commentResponse>>>(
		(data: { page: number, rentalPostId: string }) => commentApiRequest.getAllComment(data)
	);

	useEffect(() => {
		fetchData();
	}, [page.currentPage]);

	async function fetchData() {
		const res = await fetch({
			page: page.currentPage,
			rentalPostId
		});

		setPage((prev) => ({
			...prev,
			totalPage: res?.payload?.result.totalPage ?? prev.totalPage,
			totalElement: res?.payload?.result.totalElement ?? prev.totalElement
		}));

		setComments(res?.payload?.result?.data);
	}

	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<commentResponse | null>(null);

	const { isAuthenticated } = useAppContext();

	const handleAddComment = () => {
		if (newComment.trim() === "") return;

		console.log("add comment", newComment);

		setNewComment("");
		setReplyingTo(null);
	};

	const handleGotoParent = (parentId: string) => {
		console.log("scrolling to parent", parentId);
		const commentElement = commentRefs.current[parentId];
		if (commentElement) {
			commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleSetReplyingTo = (parentId: string) => {
		setReplyingTo(
			comments?.find((comment) => comment.commentId === parentId) || null
		);
	};

	const handleReply = (parentId: string) => {
		handleSetReplyingTo(parentId);
		if (commentFormRef.current) {
			commentFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleCancelReply = () => {
		setReplyingTo(null);
		setNewComment("");
	};

	const {
		error: sendCommentError,
		isFetching: sendCommentIsFetching,
		fetch: sendComment
	} = useFetch<ApiResponse<result<commentResponse>>>(
		(data: {
			postId: string,
			content: string
			parentId: string | null,
			sessionToken: string
		}) => commentApiRequest.createComment(data)
	);

	const { toast } = useToast();

	const handleSendComment = async () => {

		if (!isAuthenticated) {
			toast({
				variant: "destructive",
				description: "Vui lòng đăng nhập để bình luận",
				title: "Lỗi khi bình luận!",
				action: (
					<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
				)
			});
			return;
		}

		if (newComment.trim() === "") return;

		const token = localStorage.getItem("token") || "";
		const res = await sendComment({
			postId: rentalPostId,
			content: newComment,
			parentId: replyingTo?.commentId || null,
			sessionToken: token
		});

		if (page.totalPage === page.currentPage) {
			console.log(0);
			if (res?.payload?.result) {
				console.log(res.payload.result);
				setComments((prev) => {
					if (res.payload !== null) {
						if (prev === undefined) return [res.payload.result];
						return [...prev, res.payload.result];
					}
				});
				setNewComment("");
				setReplyingTo(null);
			}
		} else {
			console.log("fetching new data");
			// setPage((prev) => ({ ...prev, currentPage: page.totalPage }));
		}

	};

	return (
		<div className="w-full p-4">
			<h2 className="text-2xl font-bold mb-4">Bình luận</h2>
			{isFetching
				? <LoadingSpinner />
				: comments?.map((comment) => (
					<CommentCard
						key={comment.commentId}
						comment={comment}
						onReply={(parentId: string) => handleReply(parentId)}
						onScrollToParent={handleGotoParent}
						ref={(el: any) => {
							if (el) {
								commentRefs.current[comment.commentId] = el;
							}
						}}
					/>
				))}
			<Pagination
				handlePageClick={handlePageChange}
				pageCount={page.totalPage}
				currentPage={page.currentPage}
			/>

			<Card className="mt-6 w-full" ref={commentFormRef}>
				<CardContent className="pt-6">
					{replyingTo && (
						<div className="mb-4 p-3 bg-gray-100 rounded-md">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold">Trả lời: {replyingTo.userName}</span>
								<Button variant="ghost" size="sm" onClick={handleCancelReply}>
									<X className="h-4 w-4" />
								</Button>
							</div>
							<p className="text-sm text-gray-600">{replyingTo.content}</p>
						</div>
					)}
					<Textarea
						placeholder={replyingTo ? "Write your reply..." : "Add a comment..."}
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className="w-full"
					/>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button onClick={handleSendComment}>
						<Send className="mr-2 h-4 w-4" />
						{replyingTo ? "Trả lời" : "Gửi"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}