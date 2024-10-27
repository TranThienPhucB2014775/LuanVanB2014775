import React from "react";
import { tenantPostResponse } from "@/dto/response/tenantPostResponse";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "../ui/card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

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

function TenantPostItem({ post }: { post: tenantPostResponse }) {
	return (
		<div className=" bg-background flex flex-col">
			<div className="flex-grow container mx-auto px-4 ">
				<Card className="w-full max-w-4xl mx-auto">
					<CardHeader>
						<CardTitle className="text-3xl">{post.title}</CardTitle>
						<div className="flex items-center space-x-4 mt-4">
							<Avatar>
								<AvatarImage src={post.imgAvatar} alt={post.userName} />
								<AvatarFallback>{post.userName.charAt(0).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-lg font-medium">{post.userName}</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-2">Thông Tin Bài Đăng</h3>
								<p className="text-base text-muted-foreground">{post.description}</p>
								<p className="text-base text-muted-foreground">
									{tenantPostType.map(value => value.value === post.tenantPostType && value.name)}
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
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default TenantPostItem;