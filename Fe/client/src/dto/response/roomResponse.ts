export type roomResponse = {
	name: string;
	tenants: any;
	rentStatus: string;
	isAvailable: boolean;
	roomId: string;
	currentOccupancy: number;
	apartmentId: string;
	roomTypeId: string
}