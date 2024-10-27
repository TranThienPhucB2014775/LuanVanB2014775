import React from "react";
import Link from "next/link";
import apartmentApiRequest from "@/apiRequests/apartment";
import { cookies } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	MapPin,
	Home,
	Book,
	CheckCircle,
	XCircle,
	User
} from "lucide-react";
import ListAdditionalCost from "@/components/manage/apartment/ListAdditionalCost";
import { renderTextWithLineBreaks } from "@/util/renderTextWithLineBreaks";

async function ApartmentDetail({ apartmentId, isManage = true }: { apartmentId: string; isManage?: boolean }) {
	const cookieStore = cookies();

	const res = await apartmentApiRequest.getApartment({
		sessionToken: cookieStore.get("sessionToken")?.value ?? "",
		apartmentId: apartmentId
	});

	return (
		<div className="space-y-6 py-4">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-3xl font-bold">{res.payload?.result.name}</CardTitle>
							<CardDescription className="flex items-center gap-2 mt-2">
								<MapPin className="w-4 h-4" />
								{res.payload?.result.address}
							</CardDescription>
						</div>
						{res.payload?.result.userId && (
							<Link href={`/user/${res.payload.result.userId}`} passHref>
								<Button variant="outline" className="flex items-center gap-2">
									<User className="w-4 h-4" />
									<span className="sr-only">Xem thông tin chủ sở hữu</span>
									Chủ sở hữu
								</Button>
							</Link>
						)}
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Home className="w-5 h-5" /> Thông tin chung
							</h2>
							<p><strong>Loại cho thuê:</strong> {res.payload?.result.apartmentType}</p>
							<p className="flex items-center gap-2">
								<strong>Hoạt động:</strong>
								{res.payload?.result.isAvailable ? (
									<span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Đang hoạt động
                  </span>
								) : (
									<span className="text-red-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Ngưng hoạt động
                  </span>
								)}
							</p>
						</div>
						<div>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
								<Book className="w-5 h-5" /> Quy định
							</h2>
							<p>{res.payload?.result.rule}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{res.payload?.result.description && (
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">Mô tả</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{res.payload?.result.description}</p>
					</CardContent>
				</Card>
			)}

			{res.payload?.result.utility && (
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">Tiện ích</CardTitle>
					</CardHeader>
					<CardContent>
						<div>
							{renderTextWithLineBreaks(res.payload?.result.utility)}
						</div>
					</CardContent>
				</Card>
			)}

			<ListAdditionalCost
				additionalCosts={res.payload?.result.additionalCostResponses}
				isManage={isManage}
				apartmentId={apartmentId}
			/>
		</div>
	);
}

export default ApartmentDetail;