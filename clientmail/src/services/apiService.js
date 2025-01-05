// client/src/services/apiService.js
import axios from "axios";

// Create an Axios instance with interceptors
const api = axios.create({
	baseURL: "http://localhost:4000", // Replace with your API base URL
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor
api.interceptors.request.use(
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

// Add a response interceptor
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

// Create an Axios instance without interceptors
const apiWithoutInterceptors = axios.create({
	baseURL: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});

// Common API methods
export const get = async (url, params = {}) => {
	try {
		const response = await api.get(url, { params });
		return response.data;
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
		throw error;
	}
};

export const post = async (url, data, useInterceptors = true) => {
	try {
		const response = useInterceptors ? await api.post(url, data) : await apiWithoutInterceptors.post(url, data);
		return response.data;
	} catch (error) {
		console.error(`Error posting data to ${url}:`, error);
		throw error;
	}
};

export const put = async (url, data) => {
	try {
		const response = await api.put(url, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating data at ${url}:`, error);
		throw error;
	}
};

export const del = async (url) => {
	try {
		const response = await api.delete(url);
		return response.data;
	} catch (error) {
		console.error(`Error deleting data from ${url}:`, error);
		throw error;
	}
};
