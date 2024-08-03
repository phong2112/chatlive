import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AppRouter, AuthenRouter, UnAuthenRouter } from "@/constants";
import { AuthProxyService } from "@/proxy/auth";

export const ResetPasswordGuard = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  // if (!token) {
  //   return NextResponse.redirect(new URL(AppRouter.Login, request.url));
  // }
  const isTokenValid = await AuthProxyService.verifyCode({
    token,
  });

  return isTokenValid;
};
