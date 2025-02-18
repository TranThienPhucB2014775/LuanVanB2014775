export type tenantPostResponse = {
	tenantPostId: string
	userId: string
	userName: string
	imgAvatar: string
	title: string
	description: string
	price: number
	location: string | null
	isAvailable: boolean
	city: string
	district: string
	address: string
	ward: string
	tenantPostType: string
}

export type tenantResponseOfLandlord = {
	userId: string;
	rentalDuration: string;
	startDate: string;
	endDate: string;
	isAvailable: boolean;
	roomTypeId: string;
	roomTypeName: string;
	apartmentId: string;
	apartmentName: string;
	roomName: string;
	roomId: string;
}
