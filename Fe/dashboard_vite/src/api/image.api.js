import api from "./api.js";

export const getImageCardId = async ({id}) => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No access token found");
        }

        const response = await fetch(`http://localhost:8082/api/v1/media/card-id/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.blob(); // Ensure response is parsed as a Blob
        return data;
    } catch (error) {
        return error;
    }
}