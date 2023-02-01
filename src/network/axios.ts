/* eslint-disable quote-props */
import axios from "axios";
import { RequestInstance } from "./types/type";

export const axiosInstance: RequestInstance = axios.create({
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	timeout: 10000,
	timeoutErrorMessage: "Timeout with network request"
});
