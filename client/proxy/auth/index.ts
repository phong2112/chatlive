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

  async sendEmail(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}sendEmail`, data);
  },

  async forgotPassword(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}forgotPassword`, data);
  },

  async verifyCode(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}verifyCode`, data);
  },

  async resetPassword(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}resetPassword`, data);
  },
};
