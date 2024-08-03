export const AppRouter = {
  Login: "/auth/login",
  Register: "/auth/register",
  Home: "/home",
  ForgotPassword: "/auth/forgot-password",
  ResetPassword: "/auth/reset-password",
};

export const UnAuthenRouter = [AppRouter.Login, AppRouter.Register];
export const AuthenRouter = [AppRouter.Home];
