import { z } from "zod";


export const ReportIssueRequest = z.object(
	{
		title: z.string().min(3, "tên phải lớn hơn 3 kí tự").max(255,"tên phải nhỏ hơn 255 kí tự"),
		description: z.string().min(3, "tên phải lớn hơn 3 kí tự").max(255,"tên phải nhỏ hơn 255 kí tự"),
	}
)
export type ReportIssueUpdateRequest = {
	reportIssueId: string;
	status: string;
}