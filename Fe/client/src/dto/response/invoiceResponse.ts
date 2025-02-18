export type invoiceType = {
	cost: number;
	discount: number;
	discountType: string;
	monthlyUsageResponses: Array<monthlyUsageResponses>;
	pendingInvoice: boolean;
	isPaid: boolean;
	month: number;
	year: number;
}

export type monthlyUsageResponses = {
	cost: number;
	usage: number;
	costType: string;
	price: number;
	name: string;
	unit: string;
}