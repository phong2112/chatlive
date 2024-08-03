import axiosBase from "../axios";

const endPoint = "/user/";

export const UserProxyService = {
  async sendEmail(data: any): Promise<any> {
    return axiosBase.post(`${endPoint}sendEmail`, data);
  },
};
