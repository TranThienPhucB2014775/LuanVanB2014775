export type commentResponse = {
	userName: string
	userId: string
	userEmail: string
	imgAvatar: string
	content: string
	isAvailable: boolean
	createdAt: string
	updateAt: string
	page: number
	commentParent: commentResponse;
	commentId: string
}