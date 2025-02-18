import { http } from "@/lib";
import { additionalCostResponsesType } from "@/dto/response/apartmentResponse";
import { additionalCostCreationRequest, additionalCostUpdateRequest } from "@/dto/request/AdditionalCostRequest";
import { result } from "@/dto/result";
import { listResponse } from "@/dto/response/listResponse";

const additionalCostRequest = {
	createAdditionalCost: (
		{
			data,
			apartmentId,
			sessionToken
		}: {
			data: typeof additionalCostCreationRequest;
			apartmentId: string;
			sessionToken: string;
		}) => http.post<result<additionalCostResponsesType>>(
		"/property/additional-cost",
		{ ...data, apartmentId },
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
	updateAdditionalCost: (
		{
			data,
			additionalCostId,
			sessionToken
		}: {
			data: typeof additionalCostUpdateRequest;
			additionalCostId: string;
			sessionToken: string;
		}) => http.put<result<additionalCostResponsesType>>(
		"/property/additional-cost",
		{ ...data, additionalCostId },
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
	deleteAdditionalCost: (
		{
			additionalCostId,
			sessionToken
		}: {
			additionalCostId: string;
			sessionToken: string;
		}) => http.delete<null>(
		"/property/additional-cost/" + additionalCostId,
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	),
	getUnrecordedAdditionalCost: (
		{
			month,
			year,
			roomId,
			sessionToken
		}: {
			month: number;
			year: number;
			roomId: string;
			sessionToken: string;
		}) => http.post<listResponse<additionalCostResponsesType>>(
		`/property/additional-cost/unrecorded/${roomId}`,
		{
			month,
			year
		},
		{ headers: { Authorization: `Bearer ${sessionToken}` } }
	)
};

export default additionalCostRequest;
