import { AuthProxyService } from "@/proxy/auth";

export const AuthService = {
  async signIn(data: any): Promise<any> {
    return AuthProxyService.signIn(data).then((res) => {
      const accessToken = res?.data?.access_token;

      localStorage.setItem("token", accessToken);
    });
  },

  async getProfile(): Promise<any> {
    return AuthProxyService.profile();
  },

  async register(data: any): Promise<any> {
    return AuthProxyService.register(data);
  },
};
