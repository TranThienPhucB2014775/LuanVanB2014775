import { http } from "@/lib";
import { result } from "@/dto/result";
import { verificationResponse } from "@/dto/response/verificationRequest";
import { listResponse } from "@/dto/response/listResponse";


const verificationRequestApiRequest = {
	createVerificationRequest: ({
									formData,
									sessionToken
								}: {
		formData: FormData;
		sessionToken: string;
	}) => http.post<result<verificationResponse>>(
		"/identity/verification-request",
		formData,
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	), getAllVerificationRequest: ({
		page,
		params,
		sessionToken
	}: {
		page: number;
		params: string;
		sessionToken: string;
	}) => http.get<listResponse<verificationResponse>>(
		`/identity/verification-request/all/${page}`,
		{ headers
			: { Authorization: `Bearer ${sessionToken}` }
		})
};

export default verificationRequestApiRequest;