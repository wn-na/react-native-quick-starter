/* eslint-disable no-tabs */
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiMap } from "./api";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RequestMapObject = {
	payload?: any;
	response?: any;
};

export type RequestURL<M extends HttpMethod> = M extends keyof ApiMap
	? Extract<keyof ApiMap[M], `${string}`> extends `${infer U}`
		? U
		: never
	: never;

export type RequestMethod<M extends HttpMethod, U extends RequestURL<M>> = M extends keyof ApiMap
	? U extends keyof ApiMap[M]
		? M
		: never
	: never;

export type RequestPayload<M extends HttpMethod, U extends RequestURL<M>> = M extends keyof ApiMap
	? U extends keyof ApiMap[M]
		? "payload" extends keyof ApiMap[M][U]
			? ApiMap[M][U]["payload"]
			: never
		: never
	: never;

export type RequestResponse<M extends HttpMethod, U extends RequestURL<M>> = M extends keyof ApiMap
	? U extends keyof ApiMap[M]
		? "response" extends keyof ApiMap[M][U]
			? ApiMap[M][U]["response"]
			: never
		: never
	: never;

export type AxiosConfig<M extends HttpMethod, U extends RequestURL<M>> = M extends "POST" | "PUT" | "PATCH"
	? Omit<AxiosRequestConfig, "data"> & { data?: RequestPayload<M, U> }
	: Omit<AxiosRequestConfig, "params"> & { params?: RequestPayload<M, U> };

/**
 * @description change this interface for your api response format
 */
export type Response<M extends HttpMethod, U extends RequestURL<M>> = {
	data: {
		response: RequestResponse<M, U>;
	};
};

interface CustomRequestInstance {
	get<T extends RequestURL<"GET">>(url: T, config?: AxiosConfig<"GET", T>): Promise<Response<"GET", T>>;
	delete<T extends RequestURL<"DELETE">>(url: T, config?: AxiosConfig<"DELETE", T>): Promise<Response<"DELETE", T>>;
	post<T extends RequestURL<"POST">>(
		url: T,
		data?: RequestPayload<"POST", T>,
		config?: AxiosConfig<"POST", T>
	): Promise<Response<"POST", T>>;
	put<T extends RequestURL<"PUT">>(url: T, data?: RequestPayload<"PUT", T>, config?: AxiosConfig<"PUT", T>): Promise<Response<"PUT", T>>;
	patch<T extends RequestURL<"PATCH">>(
		url: T,
		data?: RequestPayload<"PATCH", T>,
		config?: AxiosConfig<"PATCH", T>
	): Promise<Response<"PATCH", T>>;
}

export type RequestInstance = Omit<AxiosInstance, keyof CustomRequestInstance> & CustomRequestInstance;
