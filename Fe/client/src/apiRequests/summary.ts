import { http } from "@/lib";
import { listResponse } from "@/dto/response/listResponse";
import { tenantResponsesType, TenantRoomResponse } from "@/dto/response/tenantResponse";
import { result } from "@/dto/result";
import { invoiceUnPaidResponse, SummaryResponse, totalInvoiceResponse } from "@/dto/response/SummaryResponse";

const summaryApiRequest = {
	getSummary: (
		data: {
			sessionToken: string;
			params: string
		}) =>
		http.get<result<SummaryResponse>>(`/property/summary?${data.params}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getInvoiceUnPaid: (
		data: {
			sessionToken: string;
			params: string
		}) =>
		http.get<result<invoiceUnPaidResponse>>(`/property/summary/invoice-unpaid?${data.params}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	getTotalInvoices: (
		data: {
			sessionToken: string;
			params: string
		}) =>
		http.get<result<totalInvoiceResponse []>>(`/property/summary/monthly-revenue-stats?${data.params}`, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		})
};

export default summaryApiRequest;
