import api from "./api.js";

export const getAllRentalPost = async ({pageNum, params}) => {
    try {
        const {data} = await api.get(`/post/rental-post/all/${pageNum}${params}`, {
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

export const disableRentalPost = async ({id}) => {
    try {
        const {data} = await api.delete(`/post/rental-post/${id}`, {
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

export const enableRentalPost = async ({id}) => {
    try {
        const {data} = await api.put(`/post/rental-post/${id}`, null, {
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

export const getRentalPostById = async ({rentalPostId}) => {
    try {
        const {data} = await api.get(`/post/rental-post/${rentalPostId}`, {
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