import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { RequestInstance } from "./types/type";

const axiosMockInstance: RequestInstance = axios.create();
export const axiosMockAdapterInstance = new MockAdapter(axiosMockInstance as AxiosInstance, { delayResponse: 200 });
export default axiosMockInstance;
