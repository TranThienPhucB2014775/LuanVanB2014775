"use client";

import React, { useState } from "react";
import { invoiceType } from "@/dto/response/invoiceResponse";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/util/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/useFetch";
import { ApiResponse } from "@/dto/ApiResponse";
import { result } from "@/dto/result";
import { invoiceApiRequest } from "@/apiRequests/invoice";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";

function ListInvoiceUnPaid({ invoices, roomId, isLandLord = true }: {
	invoices: invoiceType[];
	roomId: string;
	isLandLord?: Boolean
}) {
	const [unpaidInvoices, setUnpaidInvoices] = useState(invoices);
	const [selectedInvoice, setSelectedInvoice] = useState<{ month: number; year: number } | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { fetch } = useFetch<ApiResponse<result<string>>>(
		({ roomId, month, year, sessionToken }: {
			roomId: string;
			month: number;
			year: number;
			sessionToken: string
		}) =>
			invoiceApiRequest.updateInvoicePaid({ roomId, sessionToken, month, year })
	);

	console.log(isLandLord);

	const { toast } = useToast();

	async function handleCompleteInvoice() {
		if (!selectedInvoice) return;

		const res = await fetch({
			roomId: roomId,
			month: selectedInvoice.month,
			year: selectedInvoice.year,
			sessionToken: localStorage.getItem("token") || ""
		});

		if (res?.code === 0) {
			handleChangeIsPaid(selectedInvoice);
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

		setIsDialogOpen(false);
	}

	function handleChangeIsPaid({ month, year }: { month: number; year: number }) {
		const newUnpaidInvoices = unpaidInvoices.filter(
			(invoice) => invoice.month !== month || invoice.year !== year
		);

		setUnpaidInvoices(newUnpaidInvoices);
	}

	function openConfirmDialog(invoice: invoiceType) {
		setSelectedInvoice({ month: invoice.month, year: invoice.year });
		setIsDialogOpen(true);
	}

	return (
		<>
			<div className="space-y-4">
				<h3 className="text-xl font-semibold flex items-center gap-2">
					<FileText className="w-5 h-5" />
					Hóa đơn chưa thanh toán
				</h3>
				{unpaidInvoices.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tháng</TableHead>
								<TableHead>Năm</TableHead>
								<TableHead>Số tiền</TableHead>
								<TableHead>Trạng thái</TableHead>
								{isLandLord && <TableHead>Hành động</TableHead>}
							</TableRow>
						</TableHeader>
						<TableBody>
							{unpaidInvoices.map((invoice, index) => (
								<TableRow key={index}>
									<TableCell>{invoice.month}</TableCell>
									<TableCell>{invoice.year}</TableCell>
									<TableCell>{formatCurrency(invoice.cost)} VNĐ</TableCell>
									<TableCell>
										<Badge variant="destructive">Chưa thanh toán</Badge>
									</TableCell>
									{isLandLord &&
										<TableCell>
											<Button
												onClick={() => openConfirmDialog(invoice)}
												size="sm"
											>
												Xác nhận đã thanh toán
											</Button>
										</TableCell>}

								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<p className="text-muted-foreground">Không có hóa đơn chưa thanh toán.</p>
				)}
			</div>
			{isLandLord &&
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Xác nhận thanh toán</DialogTitle>
							<DialogDescription>
								Bạn có chắc chắn muốn xác nhận thanh toán hóa đơn này không?
							</DialogDescription>
						</DialogHeader>
						{selectedInvoice && (
							<div className="py-4">
								<p>Tháng: {selectedInvoice.month}</p>
								<p>Năm: {selectedInvoice.year}</p>
								<p>Số
									tiền: {formatCurrency(unpaidInvoices.find(i => i.month === selectedInvoice.month && i.year === selectedInvoice.year)?.cost || 0)} VNĐ</p>
							</div>
						)}
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
							<Button onClick={handleCompleteInvoice}>Xác nhận</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			}
		</>
	);
}

export default ListInvoiceUnPaid;