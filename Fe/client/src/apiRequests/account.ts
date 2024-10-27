import { http } from "@/lib";

const accountApiRequest = {
	updateImgAvatar: ({ formData, sessionToken }: {
		formData: FormData; sessionToken: string;
	}) =>
		http.put<string>("/profile/avatar", formData, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	reportAccount: ({
						accountId,
						sessionToken
					}: {
		accountId: string;
		sessionToken: string;
	}) =>
		http.post<string>(
			"/profile/report",
			{ accountId },
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`
				}
			}
		)
};

export default accountApiRequest;
