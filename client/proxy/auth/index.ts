import { apiUrl } from "@/constants";
import axios from "axios";

export const AuthProxyService = {
  async signIn(data: any): Promise<any> {
    return axios.post(`${apiUrl}/auth/login`, data);
  },

  async find(data: any): Promise<any> {
    return axios.get(`${apiUrl}/auth/find`, {
      params: data,
    });
  },
};
