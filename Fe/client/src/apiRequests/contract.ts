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
		`/property/contract/${roomId}/room`,
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
	),
	getContractByContractId: (
		{
			contractId,
			sessionToken
		}: {
			contractId: string;
			sessionToken: string;
		}) => http.get<result<contractResponses>>(
		`/property/contract/${contractId}`,
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
	moveContract: (
		{
			contractId,
			roomId,
			newRoomId,
			sessionToken
		}: {
			contractId: string;
			roomId: string;
			newRoomId: string;
			sessionToken: string;
		}) => http.put<result<string>>(
		`/property/contract/move-contract`,
		{
			contractId: contractId,
			roomId: roomId,
			newRoomId: newRoomId
		},
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	)
};

export default contractApiRequest;