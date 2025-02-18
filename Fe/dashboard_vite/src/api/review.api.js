import api from "./api.js";

export const getALlReviewByItemId = async ({pageNum, params, itemId = ""}) => {
    try {
        const {data} = await api.get(`interact/feedback/${pageNum}/${itemId}${params}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const deleteReview = async (data) => {
    try {
        const response = await api.delete(`interact/feedback/${data}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};