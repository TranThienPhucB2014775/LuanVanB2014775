import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { mediaLink } from "@/constants/media";
import { verificationResponse } from "@/dto/response/verification";
import verificationApiRequest from "@/apiRequests/verifycation";
import ImageFetcher from "@/components/CardImage";

async function getVerification(userId: string): Promise<verificationResponse | null> {
	const res = await verificationApiRequest.getVerification({
		sessionToken: localStorage.getItem("token") || "",
		userId: userId
	});
	if (res?.code === 0) {
		return res.payload?.result || null;
	} else {
		console.log(res?.error);
		return null;
	}
}

export default function CardIdInfo({ userId }: { userId: string }) {
	const [verificationInfo, setVerificationInfo] =
		useState<verificationResponse | null>(null);

	const handleGetVerification = async () => {
		const info = await getVerification(userId);
		setVerificationInfo(info);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="p-3" onClick={handleGetVerification}>
					<CreditCard className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Thông tin căn cước công dân</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4 h-80">
					<div className="flex flex-row justify-center h-full w-full">
						<ImageFetcher
							apiUrl={`http://localhost:8082/api/v1/media/card-id/${verificationInfo?.urlCardId}`}
							imgAlt="ID Card"
							imgClassName="h-80 w-full"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="col-span-1 font-semibold">Số CCCD:</span>
						<span className="col-span-3">{verificationInfo?.cardId}</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}