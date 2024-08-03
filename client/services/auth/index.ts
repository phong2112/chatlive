import { AppRouter } from "@/constants";
import { AuthProxyService } from "@/proxy/auth";
import { deleteCookie, setCookie } from "cookies-next";

export const AuthService = {
  async signIn(data: any): Promise<any> {
    return AuthProxyService.signIn(data).then((res) => {
      const accessToken = res?.data?.access_token;

      setCookie("token", accessToken);
    });
  },

  async getProfile(): Promise<any> {
    return AuthProxyService.profile();
  },

  async register(data: any): Promise<any> {
    return AuthProxyService.register(data);
  },

  async logout(): Promise<any> {
    deleteCookie("token");
    window.location = AppRouter.Login as any;
  },

  async forgotPassword(data: any): Promise<any> {
    return AuthProxyService.forgotPassword(data);
  },

  async resetPassword(data: any): Promise<any> {
    return AuthProxyService.resetPassword(data);
  },

  async verifyCode(data: any): Promise<any> {
    return AuthProxyService.verifyCode(data);
  },
};
