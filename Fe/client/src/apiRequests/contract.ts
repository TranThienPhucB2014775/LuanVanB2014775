import { http } from "@/lib";
import { result } from "@/dto/result";
import { contractResponses } from "@/dto/response/contract";

const contractApiRequest = {
	getContractByRoomId: (
		{
			roomId,
			sessionToken
		}: {
			roomId: string;
			sessionToken: string;
		}) => http.get<result<contractResponses>>(
		`/property/contract/${roomId}`,
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
	disableContract: (
		{
			contractId,
			sessionToken
		}: {
			contractId: string;
			sessionToken: string;
		}) => http.put<result<string>>(
		`/property/contract`,
		{
			contractId: contractId
		},
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	)
};

export default contractApiRequest;