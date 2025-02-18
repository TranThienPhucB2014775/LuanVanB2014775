export type listResponse<T> = {
	result: {
		data: [T];
		totalPage: number;
		totalElement: number;
	}
}

export type rentalPostListResponse<T> = listResponse<T> & {
	result: {
		minPrice: number;
		maxPrice: number;
	} & listResponse<T>['result'];
};
