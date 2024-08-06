import api from "../api/api";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

export const getALlUsers = async ({ pageNum, params }) => {
  try {
    const { data } = await api.get(`identity/users/all/${pageNum}${params}`, {
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

export const getUser = async ({ id }) => {
  try {
    const { data } = await api.get(`identity/users/${id}`, {
      headers,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const disableUser = async ({ email }) => {
  try {
    const { data } = await api.delete(`identity/users/${email}`, {
      headers,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const enableUser = async ({ email }) => {
  try {
    const { data } = await api.put(`identity/users/${email}`, null, {
      headers,
    });
    return data;
  } catch (error) {
    return error;
  }
};
