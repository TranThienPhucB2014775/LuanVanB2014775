export type tenantResponsesType = {
	userId: string;
	rentalDuration: string;
	startDate: string;
	endDate: string;
	isAvailable: boolean;
}

export type TenantRoomResponse = {
	name: string;
	isAvailable: boolean;
	rentStatus: string;
	roomId: string;
	currentOccupancy: number;
	landlordId: string;
	rentalDuration: string;
	roomTypeId: string;
	apartmentId: string;
	contractId: string;
}