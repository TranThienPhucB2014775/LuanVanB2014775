import api from "./api.js";

export const getTotalPost = async () => {
    try {
        const {data} = await api.get(`post/summary`, {
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

export const getUser = async () => {
    try {
        const {data} = await api.get(`identity/summary`, {
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

export const getProperty = async () => {
    try {
        const {data} = await api.get(`property/summary/admin`, {
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
