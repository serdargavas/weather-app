import axios, { AxiosInstance } from "axios";
import { getError } from "./api.helper";

export default class AxiosHelper {
  static instance: AxiosInstance;

  constructor(baseURL: string) {
    // Create axios instance
    AxiosHelper.instance = axios.create({ baseURL });
    this.addMws();
  }

  addMws() {
    // Modify axios response
    AxiosHelper.instance.interceptors.response.use(
      (response) => {
        if (response.config.responseType === "blob") {
          return response.data;
        }
        return response.data;
      },
      (error) => {
        throw getError(error);
      }
    );

    // Modify axios request
    AxiosHelper.instance.interceptors.request.use(async (config) => {
      return config;
    });
  }
}
