import { roomResponse } from "@/dto/response/roomResponse";
import { roomTypeResponse } from "@/dto/response/roomTypeResponse";

export type InvitationResponse = {
	room: roomResponse;
	roomType: roomTypeResponse;

	landlordId: string;
	invitationStatus: string;
	inviteToken: string;
	message: string;
	createdAt: string;
	price: number;
	depositAmount: number;
	startDate: string;
	endDate: string;
}