type imageResponse = {
	imageUrl: string;
	imageId: string;
}

export type RentalPostResponse = {
	rentalPostId: string;
	userId: string;
	city: string;
	district: string;
	address: string;
	ward: string;
	title: string;
	description: string;
	amenities: string;
	area: number;
	tenantType: string;
	price: number;
	rentalType: string;
	images: any;
}

export type RentalPostListResponse = {
	rentalPostId: string;
	userId: string;
	userName: string;
	imgAvatar: string;
	city: string;
	district: string;
	address: string;
	ward: string;
	title: string;
	area: number;
	price: string;
	rentalType: string;
	isAvailable: boolean;
}

