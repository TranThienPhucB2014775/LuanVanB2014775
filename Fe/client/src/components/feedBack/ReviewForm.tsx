"use client";

import React, { useState } from "react";
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apartmentRequest } from "@/dto/request/apartment";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedBackRequest } from "@/dto/request/FeedBackRequest";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { apartmentResponse } from "@/dto/response/apartmentResponse";
import apartmentApiRequest from "@/apiRequests/apartment";
import feedBackApiRequest from "@/apiRequests/FeedBack";
import { FeedBackResponse } from "@/dto/response/FeedBackResponse";
import { useToast } from "@/components/ui/use-toast";
import { StarIcon } from "@heroicons/react/24/solid";
import { Pencil, Star } from "lucide-react";
import { result } from "@/dto/result";

function ReviewForm(
	{ FeedBackType, itemId, feedBack, updateFeedBack }: {
		FeedBackType: string;
		itemId: string;
		feedBack?: {
			id: string
			rating: number;
			feedback: string;
		};
		updateFeedBack: Function
	}) {

	const form = useForm<z.infer<typeof feedBackRequest>>({
		resolver: zodResolver(feedBackRequest),
		defaultValues: {
			feedBack: feedBack?.feedback || ""
		}
	});

	const {
		error,
		isFetching,
		fetch
	} = useFetch<ApiResponse<result<FeedBackResponse>>>(
		(data: {
			sessionToken: string,
			data: {
				itemId: string;
				rating: number;
				feedBackType: string;
				feedback: string;
			}
		}) => feedBackApiRequest.createFeedBack(data)
	);

	const {
		error: errorUpdate,
		isFetching: isFetchingUpdate,
		fetch: update
	} = useFetch<ApiResponse<result<FeedBackResponse>>>(
		(data: {
			sessionToken: string,
			data: {
				id: string;
				rating: number;
				feedback: string;
			}
		}) => feedBackApiRequest.updateFeedBack(data)
	);

	const {
		error: errorRatingAparment,
		isFetching: isFetchingRatingApartment,
		fetch: ratingApartment
	} = useFetch<ApiResponse<result<FeedBackResponse>>>(
		(data: {
			sessionToken: string,
			data: {
				apartmentId: string;
				rating: number;
				feedback: string;
			}
		}) => apartmentApiRequest.createFeedBack(data)
	);


	const [star, setStar] = useState(feedBack?.rating || 1);

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof feedBackRequest>) {

		const res =
			feedBack !== undefined
				? await update({
					sessionToken: localStorage.getItem("token") || "",
					data: {
						id: feedBack.id,
						rating: star,
						feedback: values.feedBack
					}
				})
				: FeedBackType === "LANDLORD"
					? await fetch({
						sessionToken: localStorage.getItem("token") || "",
						data: {
							itemId,
							rating: star,
							feedBackType: FeedBackType,
							feedback: values.feedBack
						}
					})
					: await ratingApartment({
						sessionToken: localStorage.getItem("token") || "",
						data: {
							apartmentId: itemId,
							rating: star,
							feedback: values.feedBack
						}
					});
		if (res?.code === 0) {
			toast({
				title: feedBack !== undefined ? "Chỉnh sửa thành công" : "Đánh giá thành công",
				description: "Cảm ơn bạn đã đánh giá"
			});
			updateFeedBack(res?.payload?.result);
		} else if (res?.code === 8008) {
			toast({
				title: "Đánh gia thất bại",
				description: "Không thể đánh giá 2 lần",
				variant: "destructive"
			});
		} else if (res?.code === 8006) {
			toast({
				title: "Đánh gia thất bại",
				description: "Bạn đã chỉnh sửa quá số lần giới hạn",
				variant: "destructive"
			});
		} else {
			toast({
				title: "Đánh gia thất bại",
				description: "Đánh gái thất bại, vui lòng thử lại",
				variant: "destructive"
			});
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					{feedBack ? <Pencil className="w-4 h-4 mr-1" /> : <Star className="w-4 h-4 mr-1" />}
					{feedBack ? "Chỉnh sửa" : "Đánh giá"}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{feedBack ? "Chỉnh sửa đánh giá" : "Thêm mới đánh giá"}
					</AlertDialogTitle>
					<AlertDialogDescription>
						Viết đánh giá của bạn tại đây. Nhấn 'Gửi' khi bạn đã hoàn tất.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-2">
					<Label htmlFor="rating">Rating</Label>
					<div className="flex items-center gap-2">
						{[1, 2, 3, 4, 5].map((index) => (
							<Star
								key={index}
								className={`w-8 h-8 ${
									index <= star ? "text-black fill-black" : "text-gray-300"
								} cursor-pointer transition-colors`}
								onClick={() => setStar(index)}
							/>
						))}
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="feedBack"
							render={({ field }) => (
								<FormItem>
									<Label htmlFor="review">Review</Label>
									<FormControl>
										<Textarea rows={4} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<AlertDialogCancel>Huỷ</AlertDialogCancel>
							<Button type="submit">Lưu</Button>
						</div>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ReviewForm;