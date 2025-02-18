import api from "./api.js";

export const getAllTenantPost = async ({pageNum, params}) => {
    try {
        const {data} = await api.get(`/post/tenant-post/all/${pageNum}${params}`, {
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

export const disableTenantPost = async ({id}) => {
    try {
        const {data} = await api.delete(`/post/tenant-post/${id}`, {
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

export const enableTenantPost = async ({id}) => {
    try {
        const {data} = await api.put(`/post/tenant-post/${id}`, null, {
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

export const getTenantPostById = async ({tenantPostId}) => {
    try {
        const {data} = await api.get(`/post/tenant-post/${tenantPostId}`, {
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