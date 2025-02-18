import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoiceUnPaidResponse } from "@/dto/response/SummaryResponse";

function InvoiceUnPaidCard({ invoiceUnPaid }: { invoiceUnPaid: invoiceUnPaidResponse }) {
	return (
		<Card
			className="col-span-full bg-red-50 transition-all duration-300">
			<CardHeader>
				<CardTitle className="text-red-600">Hóa đơn chưa thanh toán</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<p className="text-sm font-medium text-red-600">Tổng số hóa đơn</p>
					<p className="text-3xl font-bold text-red-700">{invoiceUnPaid.totalUnpaidInvoices}</p>
				</div>
				<div>
					<p className="text-sm font-medium text-red-600">Tổng số tiền</p>
					<p className="text-3xl font-bold text-red-700">
						{invoiceUnPaid.totalUnpaidAmount?.toLocaleString()} VND
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default InvoiceUnPaidCard;