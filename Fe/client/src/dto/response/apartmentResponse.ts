export type apartmentResponse = {
	name: string;
	city: string;
	address: string;
	rule: string;
	utility: string;
	description: string;
	isAvailable: boolean;
	apartmentType: string;
	apartmentId: string;
	additionalCostResponses: Array<additionalCostResponsesType>;
	userId: string;
	currentOccupancy: number;
}

export type additionalCostResponsesType = {
	name: string;
	cost: number;
	additionalCostType: string;
	unit: string;
	additionalCostId: string;
}