import api from "./api.js";

export const getALlApartment = async ({pageNum, params = ""}) => {
    try {
        const {data} = await api.get(`property/apartment/all/${pageNum}${params}`, {
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

export const getApartment = async ({roomTypeId}) => {
    try {
        const {data} = await api.get(`property/apartment/${roomTypeId}`, {
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