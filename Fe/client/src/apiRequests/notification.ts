import { http } from "@/lib";
import { result } from "@/dto/result";
import { invoiceType } from "@/dto/response/invoiceResponse";
import { listResponse } from "@/dto/response/listResponse";
import { NotificationResponse } from "@/dto/response/notification";


export const notificationApiRequest = {
	getAllNotification: (
		{
			pageNum,
			params,
			sessionToken
		}: {
			pageNum: number;
			params: string;
			sessionToken: string;
		}) => http.get<listResponse<NotificationResponse>>(
		`/notification/notifications/${pageNum}?${params}`,
		{
			headers: { Authorization: `Bearer ${sessionToken}` }
		}
	),
	markAsReadNotification: (
		{
			notificationId,
			sessionToken
		}: {
			notificationId: string;
			sessionToken: string;
		}) => http.put<null>(
		`/notification/notifications/${notificationId}`,
		{},
		{
			headers: { Authorization: `Bearer ${sessionToken}` }
		}
	)
};