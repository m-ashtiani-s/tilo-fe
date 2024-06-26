import { API_URL } from "@/configs/global";

import { ApiError } from "@/types/http-errors.interface";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { errorHandler, networkErrorStrategy } from "./http-error-strategies";
import { getSession } from "next-auth/react";

const httpService = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

httpService.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error?.response) {
			const statusCode = error?.response?.status;
			if (statusCode >= 400) {
				// const errorData: ApiError = error.response?.data;

				// errorHandler[statusCode](errorData);
				error.errorResponse = error.response.data;
			}
		} else {
			networkErrorStrategy();
		}
		throw error.response.data
	}
);

async function getToken() {
	const session = await getSession();
	if (session) {
		return `${session.user.accessToken}`;
	} else {
		return "";
	}
}

async function apiBase<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
	const response: AxiosResponse = await httpService(url, options);
	
	return response.data as T;
}


async function readData<T>(url: string, params?: any, headers?: AxiosRequestConfig["headers"], signal?: AbortSignal): Promise<T> {
    const token = await getToken();
    const options: AxiosRequestConfig = {
        headers: { ...headers, token: token },
        params: params,
        method: "GET",
        signal: signal,
    };
    try {
        const response = await apiBase<T>(url, options);
        return response;
    } catch (error: any) {
        if (error?.code === 401) {
        }
        throw error;
    }
}

async function createData<TModel, TResult>(
	url: string,
	data: TModel,
	headers?: AxiosRequestConfig["headers"]
): Promise<TResult> {
    const token=!url.includes('login') ? await getToken() : ''
	const options: AxiosRequestConfig = {
		method: "POST",
		headers: { ...headers, token: token } || {},
		data: JSON.stringify(data),
	};

	return await apiBase<TResult>(url, options);
}

async function updateData<TModel, TResult>(url: string, data: TModel, headers?: AxiosRequestHeaders): Promise<TResult> {
	const options: AxiosRequestConfig = {
		method: "PUT",
		headers: headers,
		data: JSON.stringify(data),
	};

	return await apiBase<TResult>(url, options);
}

async function deleteData< TResult>(url: string, headers?: AxiosRequestConfig["headers"]): Promise<TResult> {
	const token=!url.includes('login') ? await getToken() : ''
	const options: AxiosRequestConfig = {
		method: "DELETE",
		headers: { ...headers, token: token },
	};

	return await apiBase(url, options);
}

export { createData, readData, updateData, deleteData };
