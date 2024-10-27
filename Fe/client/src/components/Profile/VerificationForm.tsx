"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import verificationRequestApiRequest from "@/apiRequests/verifycationRequest";
import { result } from "@/dto/result";
import { verificationResponse } from "@/dto/response/verificationRequest";

function VerificationForm() {
	const [file, setFile] = useState<File | null>(null);
	const [idNumber, setIdNumber] = useState("");
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const { error, isFetching, fetch } = useFetch<ApiResponse<result<verificationResponse>>>(
		({
			 formData,
			 sessionToken
		 }: {
			formData: FormData
			sessionToken: string
		}) => verificationRequestApiRequest.createVerificationRequest({ formData, sessionToken })
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file || !idNumber) {
			toast({
				variant: "destructive",
				title: "Lỗi",
				description: "Vui lòng chọn hình ảnh và nhập số căn cước"
			});
			return;
		}
		const formData = new FormData();
		formData.append("cardId", idNumber);
		formData.append("image", file);

		const res = await fetch({ formData, sessionToken: localStorage.getItem("token") });

		if (res?.code === 0) {
			toast({
				title: "Thành công",
				description: "Đã upload hình ảnh và số căn cước"
			});
		} else {
			toast({
				variant: "destructive",
				title: "Lỗi",
				description: "Đã có lỗi xảy ra"
			});
		}
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">Xác minh tài khoản</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="idNumber" className="text-lg font-semibold">Số căn cước</Label>
						<Input
							id="idNumber"
							value={idNumber}
							onChange={(e) => setIdNumber(e.target.value)}
							placeholder="Nhập số căn cước"
							className="text-base"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="image" className="text-lg font-semibold">Hình ảnh căn cước</Label>
						<input
							ref={fileInputRef}
							id="image"
							type="file"
							onChange={handleFileChange}
							className="hidden"
							accept="image/*"
						/>
						<Button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="w-full py-6 text-lg font-semibold"
						>
							<Upload className="mr-2 h-5 w-5" />
							{file ? "Chọn ảnh khác" : "Chọn ảnh"}
						</Button>
						{previewUrl && (
							<div className="mt-4 border rounded-lg overflow-hidden">
								<Image
									src={previewUrl}
									alt="Preview"
									width={500}
									height={300}
									layout="responsive"
									objectFit="cover"
								/>
							</div>
						)}
					</div>
					<Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={isFetching}>
						{isFetching ? (
							<>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								Đang Gửi...
							</>
						) : (
							"Gửi"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

export default VerificationForm;