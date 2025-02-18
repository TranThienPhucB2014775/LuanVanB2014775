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
import { useAppContext } from "@/app/app-provider";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { result } from "@/dto/result";

function smoothScrollTo(element: HTMLElement, duration: number): void {
	const start = window.scrollY;
	const target = element.getBoundingClientRect().top + start;
	const distance = target - start;
	let startTime: number | null = null;

	function animation(currentTime: number): void {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1); // Tính toán tiến độ

		window.scrollTo(0, start + distance * progress); // Cuộn đến vị trí mới

		if (timeElapsed < duration) {
			requestAnimationFrame(animation); // Tiếp tục hoạt động
		}
	}

	requestAnimationFrame(animation); // Bắt đầu hoạt động
}

export default function ListComment({ rentalPostId }: { rentalPostId: string }) {
	const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
	const commentFormRef = useRef<HTMLDivElement>(null);

	const [comments, setComments] = useState<commentResponse[] | undefined>(undefined);

	const [page, setPage] = useState({
		currentPage: 0,
		totalPage: 0,
		totalElement: 0
	});

	const [parentId, setParentId] = useState("");

	const handlePageChange = ({ selected }: { selected: number }) => {
		setPage((prev) => ({ ...prev, currentPage: selected }));
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<listResponse<commentResponse>>>(
		(data: { page: number; rentalPostId: string }) => commentApiRequest.getAllComment(data)
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

	useEffect(() => {
		if (parentId !== "") {
			scrollToComment(parentId);
			setParentId("");
		} else if (page.currentPage !== 0) {
			const firstCommentId = comments?.[0]?.commentId;
			if (firstCommentId)
				scrollToComment(firstCommentId);
		}
	}, [comments]);

	const scrollToComment = (commentId: string) => {
		const commentElement = commentRefs.current[commentId];
		if (commentElement) {
			// commentElement.scrollIntoView({
			// 	behavior: "smooth",
			// 	block: "center"
			// });
			//
			// // Add a highlight effect
			// commentElement.classList.add("highlight-comment");
			// setTimeout(() => {
			// 	commentElement.classList.remove("highlight-comment");
			// }, 20000);
			smoothScrollTo(commentElement, 500);
		}
	};

	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState<commentResponse | null>(null);

	const { isAuthenticated } = useAppContext();

	const handleGotoParent = (commentResponse: commentResponse) => {
		if (commentResponse.page === page.currentPage) {
			scrollToComment(commentResponse.commentId || "");
		} else {
			setParentId(commentResponse.commentId);
			setPage(prevState => ({
				...prevState,
				currentPage: commentResponse.page
			}));
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
		if (res?.code === 0) {
			if (page.totalPage === page.currentPage + 1) {
				if (comments?.length === 10) {
					setPage((prev) => ({
						...prev, currentPage: prev.totalPage
					}));
				}
				if (res?.payload?.result) {
					console.log(1);
					setComments((prev) => {
						if (res.payload !== null) {
							if (prev === undefined) return [res.payload.result];
							return [...prev, res.payload.result];
						}
					});
				}
			} else {
				const ress = await fetch({
					page: page.currentPage,
					rentalPostId
				});
				if (ress?.payload?.result.totalPage === page.totalPage) {
					setPage(prevState => ({
						...prevState,
						totalPage: prevState.totalPage,
						currentPage: prevState.totalPage - 1
					}));
				} else {
					setPage((prev) => ({
						...prev,
						currentPage: ress?.payload?.result.totalPage !== undefined && ress?.payload?.result.totalPage - 1 || prev.totalPage - 1,
						totalPage: ress?.payload?.result.totalPage !== undefined && ress?.payload?.result.totalPage || 0
					}));
				}
			}
			setNewComment("");
			setReplyingTo(null);
		}
	};

	return (
		<div className="w-full p-4 container">
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