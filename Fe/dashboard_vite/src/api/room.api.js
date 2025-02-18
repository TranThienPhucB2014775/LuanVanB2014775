import api from "./api.js";

export const getALlRoom = async ({pageNum, params = ""}) => {
    try {
        const {data} = await api.get(`property/rooms/all/${pageNum}${params}`, {
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

export const getRoom = async ({pageNum}) => {
    try {
        const {data} = await api.get(`property/room/all/${pageNum}`, {
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