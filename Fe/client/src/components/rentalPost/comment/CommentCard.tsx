"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commentResponse } from "@/dto/response/comment";
import { formatDate } from "@/util/formatDate";
import { useAppContext } from "@/app/app-provider";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import commentApiRequest from "@/apiRequests/comment";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ReportDialog from "@/components/rentalPost/comment/ReportDialogProps";
import DeleteDialog from "@/components/rentalPost/comment/DeleteDialog";

interface CommentCardProps {
	comment: commentResponse;
	onReply: (parentId: string) => void;
	onScrollToParent: (commentResponse: commentResponse) => void;
}

export const CommentCard = React.forwardRef<HTMLDivElement, CommentCardProps>(
	({ comment, onReply, onScrollToParent }, ref) => {
		const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
		const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

		const { user } = useAppContext();
		const { toast } = useToast();

		const {
			error: deleteCommentError,
			isFetching: isDeleteCommentFetching,
			fetch: deleteComment
		} = useFetch<ApiResponse<result<string>>>(
			(data: { commentId: string, sessionToken: string }) => commentApiRequest.deleteComment(data)
		);

		const {
			error: reportCommentError,
			isFetching: isReportCommentFetching,
			fetch: reportComment
		} = useFetch<ApiResponse<result<string>>>(
			(data: {
				commentId: string,
				sessionToken: string,
				message: string
			}) => commentApiRequest.reportComment(data)
		);

		const handleDeleteComment = async () => {
			const res = await deleteComment({
				commentId: comment.commentId,
				sessionToken: localStorage.getItem("token")!
			});

			if (res?.code === 0) {
				toast({
					description: "Xóa bình luận thành công",
					title: "Thành công",
					action: (
						<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
					)
				});
			} else {
				toast({
					variant: "destructive",
					description: "Xóa bình luận thất bại",
					title: "Lỗi",
					action: (
						<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
					)
				});
			}
		};

		const handleReportComment = async (e: string) => {
			const res = await reportComment({
				commentId: comment.commentId,
				sessionToken: localStorage.getItem("token")!,
				message: e
			});

			if (res?.code === 0) {
				toast({
					description: "Báo cáo bình luận thành công",
					title: "Thành công",
					action: (
						<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
					)
				});
			} else {
				toast({
					variant: "destructive",
					description: "Báo cáo bình luận thất bại",
					title: "Lỗi",
					action: (
						<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
					)
				});
			}
		};

		return (
			<Card className="mb-4 w-full" ref={ref}>
				<CardHeader className="flex flex-row items-center gap-4">
					<Avatar>
						<AvatarImage src={comment.imgAvatar} alt={comment.userName} />
						<AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-semibold">{comment.userName}</h3>
						<p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
					</div>
				</CardHeader>
				<CardContent>
					<p>{comment.content}</p>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="ghost" size="sm" onClick={() => onReply(comment.commentId)}>
						<MessageSquare className="mr-2 h-4 w-4" />
						Trả lời
					</Button>
					<div className="flex flex-row gap-2">
						<ReportDialog
							isOpen={isReportDialogOpen}
							onOpenChange={setIsReportDialogOpen}
							onReport={(e: string) => handleReportComment(e)}
						/>
						{user === comment.userId && (
							<DeleteDialog
								isOpen={isDeleteDialogOpen}
								onOpenChange={setIsDeleteDialogOpen}
								onDelete={handleDeleteComment} />
						)}
					</div>
				</CardFooter>
				{comment.commentParent && (
					<CardContent className="bg-gray-100 mt-2 rounded-md cursor-pointer pt-6"
								 onClick={() => onScrollToParent(comment.commentParent)}>
						<div className="flex items-center">
							<ArrowUp className="mr-2 h-4 w-4" />
							<p className="text-sm font-semibold">Trả lời cho: {comment.commentParent.userName}</p>
						</div>
						<p className="text-sm truncate">{comment.commentParent.content}</p>
					</CardContent>
				)}
			</Card>
		);
	}
);