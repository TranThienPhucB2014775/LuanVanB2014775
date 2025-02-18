"use client";

import React, { useState, useEffect } from "react";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Home, User, DollarSign, Maximize, BedDouble, Phone, Mail, Flag } from "lucide-react";
import { mediaLink } from "@/constants/media";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import authApiRequest from "../../apiRequests/auth";
import zalo from "@/assets/images/zalo.png";
import Image from "next/image";
import Link from "next/link";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { RentalPostResponse } from "@/dto/response/rentalPost";
import ReportRentalPostDialog from "@/components/rentalPost/ReportRentalPostDialog";

function RentalPostInfo({ rentalPostDetail }: { rentalPostDetail: RentalPostResponse }) {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const userData = await authApiRequest.infoById({ userId: rentalPostDetail.userId || "" });
			setUser(userData.payload?.result);
			setLoading(false);
		}

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-background">
			<main className="container mx-auto px-4 py-8">
				<div className="grid gap-8 md:grid-cols-[2fr_1fr]">
					<div>
						<Carousel className="w-full mb-6">
							<CarouselContent>
								{rentalPostDetail?.images.map((image: any, index: number) => (
									<CarouselItem key={image.imageId}>
										<div className="aspect-video relative flex items-center justify-center">
											<img
												src={`${mediaLink}/${image.imageUrl}`}
												alt={`Rental property image ${index + 1}`}
												className="h-full object-cover rounded-lg"
											/>
											<div
												className="absolute bottom-4 right-4 bg-background/80 px-2 py-1 rounded-md text-sm">
												{index + 1} / {rentalPostDetail?.images.length}
											</div>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-2" />
							<CarouselNext className="right-2" />
						</Carousel>

						<h2 className="text-3xl font-bold mb-4">{rentalPostDetail?.title}</h2>

						<div className="flex items-center space-x-2 mb-4">
							<MapPin className="w-5 h-5 text-muted-foreground" />
							<span
								className="text-lg">{`${rentalPostDetail?.address}, ${rentalPostDetail?.ward}, ${rentalPostDetail?.district}, ${rentalPostDetail?.city}`}</span>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-6">
							<div className="flex items-center space-x-2">
								<Home className="w-5 h-5 text-muted-foreground" />
								<span>{rentalPostDetail?.rentalType}</span>
							</div>
							<div className="flex items-center space-x-2">
								<User className="w-5 h-5 text-muted-foreground" />
								<span>{rentalPostDetail?.tenantType}</span>
							</div>
							<div className="flex items-center space-x-2">
								<DollarSign className="w-5 h-5 text-muted-foreground" />
								<span className="text-xl font-bold">{rentalPostDetail?.price}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Maximize className="w-5 h-5 text-muted-foreground" />
								<span>{rentalPostDetail?.area} m²</span>
							</div>
						</div>
						<ReportRentalPostDialog rentalPostId={rentalPostDetail.rentalPostId} />
						<Separator className="my-6" />

						<div className="mb-6">
							<h3 className="text-xl font-semibold mb-2">Mô tả</h3>
							<p className="text-muted-foreground">{rentalPostDetail?.description}</p>
						</div>

						<div className="mb-6">
							<h3 className="text-xl font-semibold mb-2">Tiện nghi</h3>
							<div className="flex flex-wrap gap-2">
								<p className="text-muted-foreground">{rentalPostDetail?.amenities}</p>
							</div>
						</div>
					</div>

					<div>
						<div className="bg-muted p-6 rounded-lg sticky top-24">
							<div className="flex items-center space-x-4 mb-6">
								<Avatar className="w-16 h-16">
									<AvatarImage src={`${mediaLink}/${user?.imgAvatar}`} alt={user?.username} />
									<AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-xl font-semibold">{user?.username}</h3>
								</div>
							</div>
							<Link href={`/user/${user?.id}`}>
								<Button variant="outline" className="w-full mb-4">
									<User className="w-4 h-4 mr-2" />
									Xem trang cá nhân
								</Button>
							</Link>
							<Button variant="outline" className="w-full mb-4">
								<Phone className="w-4 h-4 mr-2" />
								Liên hệ
							</Button>
							<Button variant="outline" className="w-full mb-4">
								<Mail className="w-4 h-4 mr-2" />
								Email
							</Button>
							{
								user?.zaloPhoneNumber &&
								<a href={`https://zalo.me/${user.zaloPhoneNumber}`} target="_blank"
								   rel="noopener noreferrer">
									<Button variant="outline" className="w-full">
										<Image src={zalo} alt="zalo" className="w-6 h-6 mr-2" />
										Zalo
									</Button>
								</a>
							}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default RentalPostInfo;