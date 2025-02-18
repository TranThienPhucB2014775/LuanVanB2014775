import React from "react";
import { roomResponse } from "@/dto/response/roomResponse";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { useToast } from "@/components/ui/use-toast";
import { invoiceApiRequest } from "@/apiRequests/invoice";

function CompleteInvoiceForm({ room, handleChangeIsPaid }: { room: roomResponse; handleChangeIsPaid: Function }) {
	const { fetch } = useFetch<ApiResponse<result<string>>>(
		({ roomId, month, year, sessionToken }: {
			roomId: string;
			month: number;
			year: number;
			sessionToken: string
		}) =>
			invoiceApiRequest.updateInvoicePaid({ roomId, sessionToken, month, year })
	);

	const { toast } = useToast();

	async function handleCompleteInvoice({ month, year }: { month: number; year: number }) {
		const res = await fetch({
			roomId: room.roomId,
			month: month,
			year: year,
			sessionToken: localStorage.getItem("token") || ""
		});

		if (res?.code === 0) {
			handleChangeIsPaid({ month, year });
			toast({
				title: "Thành công",
				description: "Xác nhận hóa đơn thành công",
				duration: 3000
			});
		} else {
			toast({
				title: "Thất bại",
				description: "Xác nhận hóa đơn thất bại",
				variant: "destructive",
				duration: 3000
			});
		}
	}

	const unpaidInvoices = room.invoiceResponse.filter((invoice) => !invoice.isPaid);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="p-3" aria-label="Xác nhận hóa đơn">
					<BadgeCheck className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Xác nhận thanh toán hóa đơn</DialogTitle>
					<DialogDescription className="text-sm text-gray-500">
						Khi bạn xác nhận hóa đơn đã thanh toán, hệ thống sẽ không thể chỉnh sửa hóa đơn này nữa.
					</DialogDescription>
				</DialogHeader>

				{unpaidInvoices.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-6">
						<BadgeCheck className="h-16 w-16 text-green-500 mb-4" />
						<p className="text-lg font-semibold text-gray-700">Tất cả hóa đơn đã được thanh toán</p>
					</div>
				) : (
					<ScrollArea className="h-[300px] pr-4">
						<div className="space-y-4">
							{unpaidInvoices.map((invoice) => (
								<div key={`${invoice.month}-${invoice.year}`} className="bg-gray-50 p-4 rounded-lg">
									<h3 className="text-lg font-semibold mb-2">
										Hóa đơn tháng {invoice.month} - {invoice.year}
									</h3>
									<p className="text-sm text-gray-600 mb-4">Xác nhận thanh toán cho hóa đơn này?</p>
									<Button
										onClick={() => handleCompleteInvoice({
											month: invoice.month,
											year: invoice.year
										})}
										className="w-full"
									>
										Xác nhận đã thanh toán
									</Button>
								</div>
							))}
						</div>
					</ScrollArea>
				)}

				<DialogFooter className="mt-6">
					<Button variant="outline" className="w-full sm:w-auto">
						Đóng
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default CompleteInvoiceForm;

