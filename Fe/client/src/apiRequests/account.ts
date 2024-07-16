import {http} from "@/lib";

const accountApiRequest = {
	updateImgAvatar: ({ formData, sessionToken }: { formData: FormData, sessionToken: string }) => http.put<string>(
		"/identity/avatar",
		formData,
		{
			headers: {
				Authorization: `Bearer ${sessionToken}`
			}
		}
	)
};

export default accountApiRequest;
