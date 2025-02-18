import { result } from "@/dto/result";
import { http } from "@/lib";

export const monthlyUsageApiRequest = {
	createMonthlyUsage: (
		{
			data,
			sessionToken
		}: {
			data: {
				month: number,
				year: number,
				additionalCostId: string,
				usage: number,
				roomId: string
			};
			sessionToken: string;
		}) => http.post<result<string>>(
		"/property/monthly-usage",
		{ ...data },
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
};