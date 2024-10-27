"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { Info, Lock, Pencil, Unlock } from "lucide-react";
import Link from "next/link";
import { RentalPostListResponse } from "@/dto/response/rentalPost";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { listResponse } from "@/dto/response/listResponse";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { result } from "@/dto/result";
import { useToast } from "@/components/ui/use-toast";

function ManageRentalPostCard({ rentalPost, handleLockRentalPost }: {
	rentalPost: RentalPostListResponse | undefined,
	handleLockRentalPost: Function
}) {

	const [post, setPost]
		= useState<RentalPostListResponse | undefined>(rentalPost);

	const { error: enableError, isFetching: isFetchingEnable, fetch: enableRentalPost }
		= useFetch<ApiResponse<result<string>>>(
		(data: {
			rentalPostId: string,
			sessionToken: string
		}) => rentalPostApiRequest.enableRentalPost(data)
	);

	const { error: errorDelete, isFetching: isFetchingDelete, fetch: deleteRentalPost } =
		useFetch<ApiResponse<result<string>>>(
			(data: {
				rentalPostId: string,
				sessionToken: string
			}) => rentalPostApiRequest.disableRentalPost(data)
		);

	const { toast } = useToast();


	async function handleLockRentalPostFromCard() {
		let res = null;
		if (post !== undefined) {
			if (post?.isAvailable) {
				res = await deleteRentalPost({
					rentalPostId: post.rentalPostId,
					sessionToken: localStorage.getItem("token") || ""
				});
			} else {
				res = await enableRentalPost({
					rentalPostId: post.rentalPostId || "",
					sessionToken: localStorage.getItem("token") || ""
				});
			}
			if (res?.code === 0) {
				toast({
					description: "Thành công",
					title: "Thành công"
				});
				setPost({
					...post,
					isAvailable: !post.isAvailable
				});
			} else {
				toast({
					description: "Thất bại",
					title: "Thất bại",
					value: "destructive"
				});
			}
		}
	}

	if (!post) return null;

	return (
		<TableRow key={post.rentalPostId}>
			<TableCell>
				{
					post.title
				}
			</TableCell>
			<TableCell>
				{
					`${post.address}, ${post.ward}, ${post.district}, ${post.city}`
				}
			</TableCell>
			<TableCell>
				{`${post.area} m²`}
			</TableCell>
			<TableCell>
				{`${Number(post.price).toLocaleString()} VND`}
			</TableCell>
			<TableCell>
				{post.rentalType}
			</TableCell>
			<TableCell>
				<div className="flex space-x-2">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant={!post.isAvailable ? "outline" : "destructive"}
								size="icon"
								onClick={() => handleLockRentalPost(post.rentalPostId)}
							>
								{
									post.isAvailable ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />
								}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Bạn có chắc chắn muốn {
									post.isAvailable ? "khóa" : "mở khóa"
								} bài viết này?</AlertDialogTitle>
								<AlertDialogDescription>
									{post.isAvailable ? "Bài viết sẽ không còn hiển thị trên trang web" : "Bài viết sẽ hiển thị trên trang web"}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Hủy</AlertDialogCancel>
								<AlertDialogAction onClick={handleLockRentalPostFromCard}>
									{
										post.isAvailable ? "Khóa" : "Mở khóa"
									}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<Link href={`/manage-rental-post/${post.rentalPostId}`}>
						<Button
							variant="outline"
							size="icon"
						>
							<Pencil className="h-4 w-4" />
						</Button>
					</Link>
					<Link href={`/listings/${post.rentalPostId}`}>
						<Button
							variant="outline"
							size="icon"
						>
							<Info className="h-4 w-4" />
						</Button>
					</Link>
				</div>
			</TableCell>
		</TableRow>
	);
}

export default ManageRentalPostCard;