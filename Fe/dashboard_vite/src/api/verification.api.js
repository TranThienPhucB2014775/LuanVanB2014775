import api from "../api/api";

export const getAllVerifications = async ({pageNum, params}) => {
    try {
        const {data} = await api.get(`identity/verification-request/all/${pageNum}${params}`, {
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

export const verifyIdentity = async ({id, status, message}) => {
    try {
        const {data} = await api.put(`identity/verification-request`, {
            isSuccessful: status,
            id,
            message
        }, {
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