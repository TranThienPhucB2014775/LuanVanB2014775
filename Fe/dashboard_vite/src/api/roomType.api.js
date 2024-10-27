import api from "./api.js";

export const getALlRoomType = async ({pageNum, params = ""}) => {
    try {
        const {data} = await api.get(`property/room-types/all/${pageNum}${params}`, {
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

export const getRoomType = async ({roomTypeId}) => {
    try {
        const {data} = await api.get(`property/room-types/all/${roomTypeId}`, {
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