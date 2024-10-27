import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RentalPostListResponse, RentalPostResponse } from "@/dto/response/rentalPost";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { mediaLink } from "@/constants/media";

interface RentalPostCardProps {
	post: RentalPostListResponse;
}

export default function RentalPostCard({ post }: RentalPostCardProps) {
	return (
		<Card className="w-full">
			<CardContent className="p-4">
				<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
					<p className="text-sm"><strong>Địa chỉ:</strong> {post.address}, {post.ward}</p>
					<p className="text-sm"><strong>Khu vực:</strong> {post.district}, {post.city}</p>
					<p className="text-sm"><strong>Diện tích:</strong> {post.area} m²</p>
					<p className="text-sm"><strong>Giá:</strong> {parseInt(post.price).toLocaleString("vi-VN")} VND</p>
					<p className="text-sm"><strong>Loại cho thuê:</strong> {post.rentalType}</p>
				</div>
				<div className="flex justify-end">
					<Link href={`/listings/${post.rentalPostId}`}>
						<Button variant="outline" size="sm">
							<Info className="w-4 h-4 mr-2" />
							Chi tiết
						</Button>
					</Link>
				</div>
			</CardContent>
			<CardFooter className="p-4 border-t">
				<Link href={`/user/${post.userId}`}>
					<div className="flex items-center w-full">
						<Avatar className="w-12 h-12 mr-4">
							<AvatarImage src={`${mediaLink}/${post.imgAvatar}`} alt={post.userName} />
							<AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold">{post.userName}</p>
							<p className="text-sm text-muted-foreground">Người đăng</p>
						</div>
					</div>
				</Link>
			</CardFooter>
		</Card>
	);
}