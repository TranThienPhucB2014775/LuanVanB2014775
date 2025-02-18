"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/useFetch";
import { authApiRequest } from "@/apiRequests";
import { ApiResponse } from "@/dto/ApiResponse";
import { infoResponse } from "@/dto/response";
import envConfig from "@/config";
import { useAppContext } from "@/app/app-provider";
import RentalListings from "@/components/rentalPost/ListRentalPost";
import ListTenantPost from "@/components/tenantPost/ListTenantPost";
import ApartmentPage from "@/components/manage/apartment/ListApartmentPage";
import About from "@/components/user/About";
import Reviews from "@/components/feedBack/Reviews";
import AnimatedSection from "@/components/AnimatedSection";
import ReportUserPostDialog from "@/app/user/[user_id]/ReportUserPostDialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import facebook from "@/assets/icons/facebook.png";
import zalo from "@/assets/images/zalo.png";
import { Separator } from "@/components/ui/separator";
import { Facebook, MessageCircle } from "lucide-react";

const tabs = [
	{ route: "about", label: "Giới thiệu" },
	{ route: "posts", label: "Tin cho thuê" },
	{ route: "tenant-posts", label: "Tin tìm trọ" },
	{ route: "apartments", label: "Dãy trọ" },
	{ route: "reviews", label: "Đánh giá" }
];

export default function UserProfile({ params }: { params: { user_id: string } }) {
	const { error, isFetching, fetch } = useFetch<ApiResponse<infoResponse>>(
		(data: { userId: string; sessionToken: string }) => authApiRequest.infoById({ ...data })
	);

	const [user, setUser] = useState<infoResponse | undefined>(undefined);
	const { isAuthenticated } = useAppContext();

	const memoizedFetch = useCallback(fetch, []);

	useEffect(() => {
		async function getInfo() {
			if (!params.user_id) return;
			const res = await memoizedFetch({
				userId: params.user_id,
				sessionToken: localStorage.getItem("token") || ""
			});
			if (res?.code === 0) {
				setUser(res?.payload as infoResponse);
			}
		}

		if (!user) {
			getInfo();
		}
	}, [params.user_id, memoizedFetch, user]);

	if (user === undefined && isFetching) {
		return <ProfileSkeleton />;
	}

	if (user === undefined && !isFetching) {
		return <UserNotFound />;
	}

	const roleText = user?.result.role === "LANDLORD" ? "Chủ trọ" : "Người thuê trọ"

	return (
		<div className="container py-10 space-y-8">
			<Card className="w-full max-w-md mx-auto">
				<CardContent className="p-6">
					<div className="flex items-center gap-6">
						<Avatar className="h-24 w-24">
							<AvatarImage
								src={`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/media/${user?.result.imgAvatar}`}
								alt={user?.result.username}
							/>
							<AvatarFallback>{user?.result.username.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<h1 className="text-3xl font-bold">{user?.result.username}</h1>
							<Badge variant="secondary">{roleText}</Badge>
						</div>
					</div>
				</CardContent>
				<Separator />
				<CardFooter className="p-6 flex justify-between items-center">
					<div className="flex gap-4">
						{user?.result.facebook && (
							<Link href={user.result.facebook} target="_blank" rel="noopener noreferrer">
								<Button variant="outline" size="icon">
									<Facebook className="h-5 w-5" />
									<span className="sr-only">Facebook</span>
								</Button>
							</Link>
						)}
						{user?.result.zaloPhoneNumber && (
							<Link href={`https://id.zalo.me/account?continue=http%3A%2F%2Fzalo%2Eme%2F${user.result.zaloPhoneNumber}`} target="_blank"
								  rel="noopener noreferrer">
								<Button variant="outline" size="icon">
									<Image src={zalo} alt={"zalo"}/>
									<span className="sr-only">Zalo</span>
								</Button>
							</Link>
						)}
					</div>
					<ReportUserPostDialog rentalPostId={user?.result.id || ""} />
				</CardFooter>
			</Card>

			<Tabs defaultValue="about" className="w-full">
				<TabsList className="w-full justify-start border-b bg-background">
					{tabs.map((tab) => {
						if ((tab.route === "apartments" || tab.route === "posts") &&
							(user?.result.role === "ROLE_TENANT" || !isAuthenticated)) {
							return null;
						}
						return (
							<TabsTrigger key={tab.route} value={tab.route} className="flex-1">
								{tab.label}
							</TabsTrigger>
						);
					})}
				</TabsList>
				<TabsContent value="posts">
					<RentalListings userId={params.user_id} />
				</TabsContent>
				<TabsContent value="tenant-posts">
					<ListTenantPost userId={params.user_id} />
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
		</div>
	);
}

function ProfileSkeleton() {
	return (
		<div className="container py-10 space-y-8">
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center gap-6">
						<Skeleton className="h-24 w-24 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-8 w-48" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
				</CardContent>
			</Card>
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-64 w-full" />
		</div>
	);
}

function UserNotFound() {
	return (
		<Card className="mx-auto max-w-md text-center">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Người dùng không được tìm thấy</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground mb-6">
					Chúng tôi xin lỗi, nhưng thông tin người dùng mà bạn yêu cầu không thể được tìm thấy. Vui lòng kiểm
					tra lại URL hoặc thử lại sau.
				</p>
				<Link
					href="/"
					className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					prefetch={false}
				>
					Về trang chủ
				</Link>
			</CardContent>
		</Card>
	);
}