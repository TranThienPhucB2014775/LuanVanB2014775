import {useState} from "react";

export function useFetch<T>(fetchFn: (data: any) => Promise<T>) {

    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("")

    async function fetch(data: any) {
        setIsFetching(true);
        try {
            const res = await fetchFn(data);
            setIsFetching(prevState => !prevState);
            return res;
        } catch (error) {
            setError("Lỗi không xác định");
        }

        setIsFetching(false);
    }

    return {
        isFetching,
        error,
        fetch,
    }
}