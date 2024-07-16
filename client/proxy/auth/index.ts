import { apiUrl } from "@/constants";
import axiosBase from "../axios";

const endPoint = "/auth/";

export const AuthProxyService = {
  async signIn(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}login`, data);
  },

  async register(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}register`, data);
  },

  async profile(): Promise<any> {
    return axiosBase.get(`${endPoint}profile`);
  },
};
