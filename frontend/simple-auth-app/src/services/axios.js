import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post(
      `/auth/login?email=${email}&password=${password}`
    );
    if (response.data) {
      localStorage.setItem("token", response.data);
    }
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await axiosInstance.post(
      `/auth/register?username=${username}&email=${email}&password=${password}`
    );
    if (response.data) {
      localStorage.setItem("token", response.data);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export const userService = {
  getUserData: async () => {
    const response = await axiosInstance.get(`/user/getuserdata`);
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await axiosInstance.post(
      `/user/changepassword?oldPassword=${oldPassword}&newPassword=${newPassword}`
    );
    return response.data;
  },

  changeUsername: async (newUsername) => {
    const response = await axiosInstance.post(
      `/user/changeusername?newUsername=${newUsername}`
    );
    return response.data;
  },
};

export default axiosInstance;
