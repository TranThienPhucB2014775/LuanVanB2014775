import { http } from "@/lib";
import { verificationResponse } from "@/dto/response/verification";
import { result } from "@/dto/result";

const verificationApiRequest = {
	getVerification: (
		{ sessionToken, userId }: { sessionToken: string ;userId: string}
	) => http.get<result<verificationResponse>>(
		`/identity/verification/${userId}`,
		{ headers: { Authorization: `Bearer ${sessionToken}` } })
};

export default verificationApiRequest;