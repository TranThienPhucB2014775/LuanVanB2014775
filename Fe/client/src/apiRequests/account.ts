import { http } from "@/lib";
import { result } from "@/dto/result";
import { EditProfileFormValues, editProfileSchema } from "@/dto/response/infoResponse";

const accountApiRequest = {
	updateImgAvatar: ({ formData, sessionToken }: {
		formData: FormData; sessionToken: string;
	}) =>
		http.put<string>("/profile/avatar", formData, {
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}),
	updateProfile: (data: {
		sessionToken: string,
		data: typeof editProfileSchema,
		userId: string
	}) =>
		http.post<result<string>>("/profile/profile/update", {
			...data.data, userId: data.userId }, {
			headers: {
				Authorization: `Bearer ${data.sessionToken}`
			}
		}),
	reportAccount: ({
						accountId,
						message,
						sessionToken
					}: {
		accountId: string;
		message: string;
		sessionToken: string;
	}) =>
		http.post<result<string>>(
			"identity/users/report",
			{
				userId: accountId,
				message
			},
			{
				headers: {
					Authorization: `Bearer ${sessionToken}`
				}
			}
		)
};

export default accountApiRequest;
