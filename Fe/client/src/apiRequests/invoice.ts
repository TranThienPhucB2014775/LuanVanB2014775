import { http } from "@/lib";
import { result } from "@/dto/result";
import { invoiceType } from "@/dto/response/invoiceResponse";
import { totalInvoiceResponse } from "@/dto/response/SummaryResponse";


export const invoiceApiRequest = {
		getInvoice: (
			{
				roomId,
				month,
				year,
				sessionToken
			}: {
				roomId: string;
				month: number;
				year: number;
				sessionToken: string;
			}) => http.get<result<invoiceType>>(
			`/property/invoice?roomId=${roomId}&month=${month}&year=${year}`,
			{
				headers: { Authorization: `Bearer ${sessionToken}` }
			}
		),
		completeInvoice: (
			{
				roomId,
				month,
				year,
				sessionToken
			}: {
				roomId: string;
				month: number;
				year: number;
				sessionToken: string;
			}) => http.post<result<invoiceType>>(
			`/property/invoice?roomId=${roomId}&month=${month}&year=${year}`,
			{},
			{
				headers: { Authorization: `Bearer ${sessionToken}` }
			}
		),
		getTotalPriceInvoice: (
			data: {
				sessionToken: string;
				params: string
			}) => http.get<result<totalInvoiceResponse>>(
			`/property/invoice/all?${data.params}`,
			{
				headers: { Authorization: `Bearer ${data.sessionToken}` }
			}
		),
		updateInvoicePaid: (
			data: {
				sessionToken: string;
				roomId: string;
				month: number;
				year: number;
			}) => http.put<result<string>>(
			`/property/invoice?roomId=${data.roomId}&month=${data.month}&year=${data.year}`,
			{},
			{
				headers: { Authorization: `Bearer ${data.sessionToken}` }
			}
		)
	}
;