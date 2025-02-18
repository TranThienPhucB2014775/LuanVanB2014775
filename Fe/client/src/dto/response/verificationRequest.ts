export type verificationResponse = {
	id: string;
	userId: string;
	cardId: string;
	urlCardId: string;
	isChecked: boolean;
	isSuccessful: boolean | null;
	message: string
	createdAt: string;
}