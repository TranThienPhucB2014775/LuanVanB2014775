export type contractResponses = {
	contractId: string;
	roomId: string;
	landlordId: string;
	startDate: string;
	description: string;
	expectedEndDate: string;
	actualEndDate: string;
	price: number;
	depositAmount: number;
	isAvailable: boolean;
	roomTypeId: string;
	apartmentId: string;
}

const temp = new Date()