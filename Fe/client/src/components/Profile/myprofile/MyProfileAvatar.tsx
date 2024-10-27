"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import accountApiRequest from "@/apiRequests/account";
import { mediaLink } from "@/constants/media";

import logo from "@/assets/images/Logo.png";

export default function MyProfileAvatar({ urlImage }: { urlImage: string }) {

	const [img, setImg] = useState<File | null>(null);

	const [previewUrl, setPreviewUrl] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();

	const { error, isFetching, fetch } = useFetch<ApiResponse<string>>(
		({
			 formData,
			 sessionToken
		 }: {
			formData: FormData
			sessionToken: string
		}) => accountApiRequest.updateImgAvatar({ formData, sessionToken })
	);

	useEffect(() => {
		setPreviewUrl(`${mediaLink}/${urlImage}`);
	}, [urlImage]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const selectedFile = event.target.files[0];
			setImg(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const handleSaveImage = async () => {
		if (img === null) return;
		const formData = new FormData();
		formData.append("image", img);
		const sessionToken = localStorage.getItem("token");
		const res = await fetch({ formData, sessionToken });

		if (res?.code === 0) {
			toast({
				title: "Thành công",
				description: "Cập nhật ảnh đại diện thành công"
			});
			setImg(null);
		} else if (res?.code === 2010) {
			toast({
				variant: "destructive",
				title: "Lỗi",
				description: "Kích thước ảnh quá lớn"
			});
		}
		{
			toast({
				variant: "destructive",
				title: "Lỗi",
				description: "Cập nhật ảnh đại diện thất bại"
			});
		}
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardContent className="p-6">
				<div className="flex flex-col items-center space-y-6">
					<div className="relative w-40 h-40">
						<Image
							className="rounded-full ring-4 ring-primary/10"
							src={previewUrl === "" ? logo : previewUrl}
							alt="Avatar"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className="flex flex-col w-full space-y-4">
						<Button
							onClick={handleButtonClick}
							variant="outline"
							className="w-full"
						>
							Chọn ảnh
						</Button>
						<Input
							id="picture"
							type="file"
							ref={fileInputRef}
							className="hidden"
							onChange={handleFileChange}
							accept="image/*"
						/>
						<Button
							onClick={handleSaveImage}
							disabled={!img || isFetching}
							className="w-full"
						>
							{isFetching ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Đang lưu
								</>
							) : (
								"Lưu ảnh"
							)}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}