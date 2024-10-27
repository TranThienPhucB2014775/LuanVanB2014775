import { http } from "@/lib";
import { result } from "@/dto/result";
import { invoiceType } from "@/dto/response/invoiceResponse";


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
		}) => http.post<result<any>>(
		`/property/invoice?roomId=${roomId}&month=${month}&year=${year}`,
		{},
		{
			headers: { Authorization: `Bearer ${sessionToken}` }
		}
	)
};