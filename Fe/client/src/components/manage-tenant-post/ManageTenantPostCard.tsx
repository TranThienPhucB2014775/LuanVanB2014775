"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { Info, Lock, Pencil, Unlock } from "lucide-react";
import Link from "next/link";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { result } from "@/dto/result";
import { useToast } from "@/components/ui/use-toast";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import tenantPostApiRequest from "@/apiRequests/tenantPost";

export type tenantPostResponse = {
	tenantPostId: string
	userId: string
	userName: string
	imgAvatar: string
	title: string
	description: string
	price: number
	location: string | null
	isAvailable: boolean
	city: string
	district: string
	address: string
	ward: string
	tenantPostType: string
}

function ManageTenantPostCard({
								  tenantPostResponse
							  }: {
	tenantPostResponse: tenantPostResponse | undefined
}) {
	const [post, setPost] = useState<tenantPostResponse | undefined>(tenantPostResponse);

	const { error: enableError, isFetching: isFetchingEnable, fetch: enableRentalPost } =
		useFetch<ApiResponse<result<string>>>(
			(data: { tenantPostId: string; sessionToken: string }) =>
				tenantPostApiRequest.enableTenantPost(data)
		);

	const { error: errorDelete, isFetching: isFetchingDelete, fetch: deleteRentalPost } =
		useFetch<ApiResponse<result<string>>>(
			(data: { tenantPostId: string; sessionToken: string }) =>
				tenantPostApiRequest.disableTenantPost(data)
		);

	const { toast } = useToast();

	async function handleLockRentalPostFromCard() {
		let res = null;
		if (post !== undefined) {
			if (post?.isAvailable) {
				res = await deleteRentalPost({
					tenantPostId: post.tenantPostId,
					sessionToken: localStorage.getItem("token") || ""
				});
			} else {
				res = await enableRentalPost({
					tenantPostId: post.tenantPostId || "",
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
					variant: "destructive"
				});
			}
		}
	}

	if (!post) return null;

	return (
		<TableRow key={post.tenantPostId}>
			<TableCell>{post.title}</TableCell>
			<TableCell>{`${post.address}, ${post.ward}, ${post.district}, ${post.city}`}</TableCell>
			<TableCell>{`${Number(post.price).toLocaleString()} VND`}</TableCell>
			<TableCell>{post.tenantPostType}</TableCell>
			<TableCell>
				<div className="flex space-x-2">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant={!post.isAvailable ? "outline" : "destructive"}
								size="icon"
							>
								{post.isAvailable ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Bạn có chắc chắn muốn {post.isAvailable ? "khóa" : "mở khóa"} bài viết này?
								</AlertDialogTitle>
								<AlertDialogDescription>
									{post.isAvailable
										? "Bài viết sẽ không còn hiển thị trên trang web"
										: "Bài viết sẽ hiển thị trên trang web"}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Hủy</AlertDialogCancel>
								<AlertDialogAction onClick={handleLockRentalPostFromCard}>
									{post.isAvailable ? "Khóa" : "Mở khóa"}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<Link href={`/manage-tenant-post/${post.tenantPostId}`}>
						<Button variant="outline" size="icon">
							<Pencil className="h-4 w-4" />
						</Button>
					</Link>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="icon">
								<Info className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Chi tiết bài đăng</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarImage src={post.imgAvatar} alt={post.userName} />
										<AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-semibold">{post.userName}</p>
										<p className="text-sm text-muted-foreground">ID: {post.userId}</p>
									</div>
								</div>
								<div>
									<h3 className="font-semibold">Tiêu đề</h3>
									<p>{post.title}</p>
								</div>
								<div>
									<h3 className="font-semibold">Mô tả</h3>
									<p>{post.description}</p>
								</div>
								<div>
									<h3 className="font-semibold">Giá</h3>
									<p>{`${Number(post.price).toLocaleString()} VND`}</p>
								</div>
								<div>
									<h3 className="font-semibold">Địa chỉ</h3>
									<p>{`${post.address}, ${post.ward}, ${post.district}, ${post.city}`}</p>
								</div>
								<div>
									<h3 className="font-semibold">Loại bài đăng</h3>
									<p>{post.tenantPostType}</p>
								</div>
								<div>
									<h3 className="font-semibold">Trạng thái</h3>
									<p>{post.isAvailable ? "Đang hiển thị" : "Đã ẩn"}</p>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</TableCell>
		</TableRow>
	);
}

export default ManageTenantPostCard;