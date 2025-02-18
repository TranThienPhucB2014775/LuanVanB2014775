import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageFetcher from "@/components/CardImage";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { verificationResponse } from "@/dto/response/verificationRequest";
import { formatDate } from "@/util/formatDate";

function VerifyItem({ verify }: { verify: verificationResponse }) {
	return (
		<Card key={verify.id} className="w-full">
			<CardHeader>
				{/*<CardTitle className="text-lg">{verify.id}</CardTitle>*/}
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<p>
						<strong>Số căn cước:</strong> {verify.cardId}
					</p>
					<p>
						<strong>Ngày gửi:</strong> {formatDate(verify.createdAt)}
					</p>
					<div>
						<strong>Kiểm tra:</strong>{" "}
						<Badge variant={verify.isChecked ? "default" : "secondary"}>
							{verify.isChecked ? "Đã kiểm tra" : "Chưa kiểm tra"}
						</Badge>
					</div>
					<div>
						<strong>Trạng thái:</strong>{" "}
						{verify.isSuccessful === null ? (
							<Badge variant="secondary">Đang xác thực</Badge>
						) : verify.isSuccessful ? (
							<Badge variant="default">Thành công</Badge>
						) : (
							<Badge variant="destructive">Thất bại</Badge>
						)}
					</div>
					<div>
						<strong>Lời nhắn:</strong>
						<ScrollArea className="h-[100px] w-full rounded-md border p-2 mt-1">
							{verify.message || "Không có lời nhắn"}
						</ScrollArea>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Xem hình ảnh căn cước</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Hình ảnh căn cước</DialogTitle>
							</DialogHeader>
							<div className="mt-4">
								<ImageFetcher
									apiUrl={`http://localhost:8082/api/v1/media/card-id/${verify.urlCardId}`}
									imgAlt="ID Card"
								/>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);
}

export default VerifyItem;