import api from "./api.js";

export const getReport = async ({reportId}) => {
    try {
        const {data} = await api.get(`/post/comment/${reportId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        return data;
    } catch (error) {
        return error;
    }
}