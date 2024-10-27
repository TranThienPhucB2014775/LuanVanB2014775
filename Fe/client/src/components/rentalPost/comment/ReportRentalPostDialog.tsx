"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Flag } from "lucide-react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import commentApiRequest from "@/apiRequests/comment";
import rentalPostApiRequest from "@/apiRequests/rentalPost";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";


interface ReportDialogProps {
	rentalPostId: string;
}

function ReportRentalPostDialog({ rentalPostId }: ReportDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [reportReason, setReportReason] = useState("");
	const [customReason, setCustomReason] = useState("");

	const {
		error: reportCommentError,
		isFetching: isReportCommentFetching,
		fetch: reportComment
	} = useFetch<ApiResponse<result<string>>>(
		(data: {
			rentalPostId: string,
			message: string,
			sessionToken: string
		}) => rentalPostApiRequest.reportRentalPost(data)
	);

	const { toast } = useToast();

	const handleReport = async () => {
		// Here you would typically call an API to submit the report

		let isSuccessful = false;

		if (reportReason === "other") {
			const res = await reportComment({
				rentalPostId: rentalPostId,
				message: customReason,
				sessionToken: localStorage.getItem("token")!
			});
			if (res?.code === 0) {
				isSuccessful = true;
			}
		} else {
			const res = await reportComment({
				rentalPostId: rentalPostId,
				message: reportReason,
				sessionToken: localStorage.getItem("token")!
			});
			if (res?.code === 0) {
				isSuccessful = true;
			}
		}

		if (isSuccessful) {
			toast({
				description: "Báo cáo bài đăng thành công",
				title: "Thành công",
				action: (
					<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
				)
			});
		} else {
			toast({
				variant: "destructive",
				description: "Báo cáo bài đăng thất bại",
				title: "Lỗi",
				action: (
					<ToastAction altText="Goto schedule to undo">Tắt</ToastAction>
				)
			});
		}

		// setIsOpen(false);
		setReportReason("");
		setCustomReason("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					<Flag className="w-4 h-4" />
					Báo cáo bài đăng
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Báo cáo bài đăng</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<RadioGroup value={reportReason} onValueChange={setReportReason}>
						<div className="flex items-center space-x-2 mb-2">
							<RadioGroupItem value="inappropriate" id="inappropriate" />
							<Label htmlFor="inappropriate">Nội dung không phù hợp</Label>
						</div>
						<div className="flex items-center space-x-2 mb-2">
							<RadioGroupItem value="spam" id="spam" />
							<Label htmlFor="spam">Spam hoặc lừa đảo</Label>
						</div>
						<div className="flex items-center space-x-2 mb-2">
							<RadioGroupItem value="duplicate" id="duplicate" />
							<Label htmlFor="duplicate">Bài đăng trùng lặp</Label>
						</div>
						<div className="flex items-center space-x-2 mb-2">
							<RadioGroupItem value="other" id="other" />
							<Label htmlFor="other">Lý do khác</Label>
						</div>
					</RadioGroup>
					{reportReason === "other" && (
						<div className="mt-4">
							<Label htmlFor="customReason">Nhập lý do khác:</Label>
							<Input
								id="customReason"
								value={customReason}
								onChange={(e) => setCustomReason(e.target.value)}
								className="mt-1"
							/>
						</div>
					)}
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
					<Button
						onClick={handleReport}
						disabled={!reportReason || (reportReason === "other" && !customReason)}
					>
						Gửi báo cáo
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ReportRentalPostDialog;