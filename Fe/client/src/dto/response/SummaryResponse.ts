export type SummaryResponse = {
	totalApartments: number
	totalRoomTypes: number
	totalRooms: number
	totalTenants: number
	totalIncome: number
};

export type totalInvoiceResponse = {
	total: number
	month: number
	year: number
};

export type invoiceUnPaidResponse = {
	totalUnpaidAmount: number
	totalUnpaidInvoices: number
}
