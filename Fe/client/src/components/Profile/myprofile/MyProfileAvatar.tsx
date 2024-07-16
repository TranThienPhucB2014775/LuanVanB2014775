"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import accountApiRequest from "@/apiRequests/account";
import { useToast } from "@/components/ui/use-toast";

export default function MyProfileAvatar({ urlImage }: { urlImage: string }) {
	const [img, setImg] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();

	const {
		error,
		isFetching,
		fetch
	} = useFetch<ApiResponse<string>>(
		({ formData, sessionToken }: {
			formData: FormData,
			sessionToken: string
		}) => accountApiRequest.updateImgAvatar({ formData, sessionToken }));

	useEffect(() => {
		setPreviewUrl(urlImage);
	}, [urlImage]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const selectedFile = event.target.files[0];
			setImg(event.target.files[0]);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const handleSaveImage = async () => {
		if (img === null) return;
		const formData = new FormData();
		img && formData.append("image", img);
		const sessionToken = localStorage.getItem("token");
		const res = await fetch({ formData, sessionToken });

		console.log(res);
		if (res?.code === 200) {
			toast({
				title: "Thành công",
				description: "Cập nhật ảnh đại diện thành công"
			});
			setImg(null)
		} else {
			toast({
				variant: "destructive",
				title: "Thành công",
				description: "Cập nhật ảnh đại diện thành công"
			});
		}
	};

	return (
		<div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
			{/*{img && (<img src={img} />)}*/}
			<img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
				 src={previewUrl}
				 alt="Bordered avatar" />

			<div className="flex flex-col space-y-5 sm:ml-8">
				<button type="button"
						onClick={handleButtonClick}
						className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
					Chọn ảnh
				</button>
				<Input id="picture" type="file"
					   ref={fileInputRef}
					   className="hidden"
					   onChange={handleFileChange}
				/>
				<button type="button"
						className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
						onClick={handleSaveImage}
				>
					{isFetching
						? "Đang lưu"
						: "Lưu ảnh"}
				</button>
			</div>
		</div>
	);
}