import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import verificationApiRequest from "@/apiRequests/verifycation";
import { cookies } from "next/headers";
import VerificationInfo from "@/components/Profile/VerificationInfo";
import { verificationResponse } from "@/dto/response/verification";
import VerificationForm from "@/components/Profile/VerificationForm";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function UploadPage() {

	const jwt = require("jsonwebtoken");

	const cookieStore = cookies();
	const sessionToken = cookieStore.get("sessionToken")?.value ?? "";

	const { sub } = jwt.decode(sessionToken);

	const verificationInfo = await verificationApiRequest.getVerification({
		sessionToken: sessionToken,
		userId: sub
	});

	console.log(verificationInfo);

	if (verificationInfo?.code === 0) {
		console.log("1");
		return <VerificationInfo verificationInfo={verificationInfo.payload?.result as verificationResponse} />;
	} else if (verificationInfo?.code === 1018) {
		console.log("2");
		return (
			<Card className="max-w-md mx-auto mt-8">
				<CardHeader className="text-center">
					<AlertCircle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
					<CardTitle className="text-2xl font-bold text-gray-800">Chưa xác minh</CardTitle>
				</CardHeader>
				<CardContent className="text-center">
					<p className="text-gray-600 mb-4">
						Tài khoản của bạn chưa được xác minh. Xác minh tài khoản để mở khóa tất cả các tính năng và đảm
						bảo an toàn cho cộng đồng của chúng tôi.
					</p>
					<ul className="text-left text-sm text-gray-600 mb-4 space-y-2">
						<li className="flex items-center">
							<span className="mr-2">✓</span> Tăng độ tin cậy của hồ sơ
						</li>
						<li className="flex items-center">
							<span className="mr-2">✓</span> Truy cập các tính năng đặc biệt
						</li>
						<li className="flex items-center">
							<span className="mr-2">✓</span> Xây dựng niềm tin trong cộng đồng
						</li>
					</ul>
				</CardContent>
				<CardFooter className="justify-center">
					<Link href={"/verification/verification-form"}>
						<Button>Bắt đầu xác minh</Button>
					</Link>
				</CardFooter>
			</Card>
		);
	}

	return <></>;
}