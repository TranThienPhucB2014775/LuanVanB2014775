import api from "./api.js";

export const getAllReports = async ({pageNum, params}) => {
    try {
        const {data} = await api.get(`/interact/report/all/${pageNum}?${params}`, {
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

export const updateReport = async ({reportId}) => {
    try {
        const {data} = await api.put(`/interact/report/${reportId}`, {}, {
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