import React, { useState } from "react";
import { verificationResponse } from "@/dto/response/verification";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { mediaLink } from "@/constants/media";
import ImageFetcher from "@/components/CardImage";

function VerificationInfo({ verificationInfo }: { verificationInfo: verificationResponse }) {

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Thông tin xác minh</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label>Số căn cước</Label>
					<p className="mt-1 font-medium">{verificationInfo.cardId}</p>
				</div>
				<div>
					<Label>Hình ảnh căn cước</Label>
					<div className="mt-2 border rounded-lg overflow-hidden">
						{/*<img*/}
						{/*	src={`http://localhost:8082/api/v1/media/card-id/${verificationInfo.urlCardId}`}*/}
						{/*	alt="ID Card"*/}
						{/*	// width={500}*/}
						{/*	// height={300}*/}
						{/*	// layout="responsive"*/}
						{/*	// objectFit="cover"*/}
						{/*/>*/}
						<ImageFetcher
							apiUrl={`http://localhost:8082/api/v1/media/card-id/${verificationInfo.urlCardId}`}
							imgAlt="ID Card"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default VerificationInfo;