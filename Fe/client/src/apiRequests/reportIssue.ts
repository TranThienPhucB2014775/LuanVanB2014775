import { http } from "@/lib";
import { result } from "@/dto/result";
import { ReportIssueResponse } from "@/dto/response/ReportIssueResponse";
import { ReportIssueRequest, ReportIssueUpdateRequest } from "@/dto/request/ReportIssueRequest";
import { param } from "ts-interface-checker";
import { listResponse } from "@/dto/response/listResponse";

export const ReportIssueApiRequest = {
	createReportIssueService: (
		{
			data,
			sessionToken,
			roomId
		}: {
			data: typeof ReportIssueRequest;
			sessionToken: string;
			roomId: string
		}
	) => http.post<result<ReportIssueResponse>>(
		"/property/report-issue",
		{ ...data, roomId },
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}
	),
	updateReportIssue: (
		{ data, sessionToken }: {
			data: ReportIssueUpdateRequest;
			sessionToken: string;
		}
	) => http.put<result<ReportIssueResponse>>(
		"/property/report-issue",
		{ ...data },
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}
	),
	getAllReportIssueService: async (
		{ sessionToken, pageNum, params }: {
			sessionToken: string;
			pageNum: number;
			params: string;
		}
	) => http.get<listResponse<ReportIssueResponse>>(
		`/property/report-issue/all/${pageNum}${params}`,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}
	)
};