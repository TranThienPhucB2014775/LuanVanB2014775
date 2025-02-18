import React from "react";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import ReportTenantPostDialog from "@/components/tenantPost/ReportTenantPostDialog";

const tenantPostType = [
	{
		name: "Tìm phòng",
		value: "LOOKING_FOR_ROOM_TO_RENT"
	},
	{
		name: "Tìm bạn ở ghép",
		value: "LOOKING_FOR_ROOMMATE"
	},
	{
		name: "Nhượng lại phòng",
		value: "ROOM_SUBLET"
	}
];

export default function TenantPostItem({ post }: { post: tenantPostResponse }) {
	return (
		<div className="bg-background flex flex-col">
			<div className="flex-grow">
				<Card className="w-full mx-auto">
					<CardHeader>
						<CardTitle className="text-3xl">{post.title}</CardTitle>
						<Link href={`user/${post.userId}`}>
							<div className="flex items-center space-x-4 mt-4">
								<Avatar>
									<AvatarImage src={post.imgAvatar} alt={post.userName} />
									<AvatarFallback>{post.userName.charAt(0).toUpperCase()}</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-lg font-medium">{post.userName}</p>
								</div>
							</div>
						</Link>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-2">Thông Tin Bài Đăng</h3>
								<p className="text-base text-muted-foreground">{post.description}</p>
								<p className="text-base text-muted-foreground">
									{tenantPostType.find(value => value.value === post.tenantPostType)?.name}
								</p>
								<div className="mt-4 flex items-center space-x-4">
									<span className="text-2xl font-bold">{post.price.toLocaleString()} VND</span>
								</div>
							</div>
							<Separator />
							<div>
								<h3 className="text-xl font-semibold mb-2">Địa chỉ</h3>
								<p className="text-base">{post.address}</p>
								<p className="text-base">{`${post.ward}, ${post.district}, ${post.city}`}</p>
							</div>
							<Separator />
							<div>
								<ReportTenantPostDialog rentalPostId={post.tenantPostId} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}