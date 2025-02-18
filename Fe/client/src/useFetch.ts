import { useState } from "react";

export function useFetch<T, Y = any>(fetchFn: (data: Y) => Promise<T>) {
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState("");

	async function fetch(data: Y) {
		setIsFetching(true);
		try {
			const res = await fetchFn(data);
			setIsFetching((prevState) => !prevState);
			// @ts-ignore
			if (res.error) {
				// @ts-ignore
				setError(res.error);
			}
			return res;
		} catch (error) {
			setError("Lỗi không xác định");
		}
		setIsFetching(false);
	}

	function reset() {
		setError("");
	}

	return {
		isFetching,
		error,
		fetch,
		reset
	};
}
