"use client";

import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Posts from "@/components/user/Posts";
import ApartmentPage from "@/components/manage/apartment/ListApartmentPage";
import About from "@/components/user/About";
import { authApiRequest } from "@/apiRequests";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import envConfig from "@/config";
import Link from "next/link";
import Reviews from "@/components/feedBack/Reviews";
import AnimatedSection from "@/components/AnimatedSection";
import { useAppContext } from "@/app/app-provider";
import RentalListings from "@/components/rentalPost/ListRentalPost";

const tabs = [
	{
		route: "posts",
		label: "Bài đăng"
	},
	{
		route: "apartments",
		label: "Căn hộ"
	},
	{
		route: "about",
		label: "Giới thiệu"
	},
	{
		route: "reviews",
		label: "Đánh giá"
	}
];

export default function page({ params }: { params: { user_id: string } }) {

	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) =>
			authApiRequest.infoById({ ...data })
	);

	const [user, setUser] = useState<infoResponse | undefined>(undefined);

	useEffect(() => {
		async function getInfo() {
			if (!params.user_id) return;
			const res = await fetch({
				userId: params.user_id,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setUser((res?.payload as infoResponse));
			} else if (error) {
				console.log(error);
			}
		}

		getInfo();
	}, []);

	const { isAuthenticated } = useAppContext();
	return (
		<div>
			{user === undefined && isFetching && <div>Loading...</div>}
			{user === undefined && !isFetching
				? <div
					className="flex flex-col items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-md text-center">
						<div className="mx-auto h-12 w-12 text-primary" />
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Người dùng
							không được tìm thấy</h1>
						<p className="mt-4 text-muted-foreground">
							Chúng tôi xin lỗi, nhưng thông tin người dùng mà bạn yêu cầu không thể được tìm thấy. Vui
							lòng kiểm tra lại URL hoặc thử lại sau.
						</p>
						<div className="mt-6">
							<Link
								href="/"
								className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								prefetch={false}
							>
								Về trang chủ
							</Link>
						</div>
					</div>
				</div>
				: <div className="container py-10">
					<div className="rounded-t-lg">
						<div className=" flex items-center gap-4">
							<Avatar className="h-16 w-16">
								<AvatarImage
									src={`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/${user?.result.imgAvatar}`}
									alt="@shadcn"
								/>
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<h1 className="text-2xl font-bold">{user?.result.username}</h1>
								<p className="text-muted-foreground">
									{user?.result.role === "LANDLORD" ? "Chủ trọ" : "Người thuê trọ"}
								</p>
							</div>
						</div>
					</div>
					<Tabs defaultValue="posts" className="w-full pt-6">
						<TabsList className="border-b bg-Neutral-w100">
							{tabs.map(tab => {
								if (tab.route === "apartments") {
									if (user?.result.role === "ROLE_TENANT") return null;
									console.log(isAuthenticated);
									if (!isAuthenticated) {
										console.log("authenticated");
										return null;
									}
								}
								return <TabsTrigger key={tab.route} value={tab.route}>{tab.label}</TabsTrigger>;
							})
							}

						</TabsList>
						<TabsContent value="posts">
							<RentalListings userId={params.user_id} />
						</TabsContent>
						<TabsContent value="apartments">
							<ApartmentPage userId={params.user_id} isManage={false} />
						</TabsContent>
						<AnimatedSection>
							<TabsContent value="about">
								<About user={user} />
							</TabsContent>
						</AnimatedSection>
						<TabsContent value="reviews">
							<Reviews itemId={params.user_id} userId={""} isView={false} />
						</TabsContent>
					</Tabs>
				</div>}
		</div>
	);
}
