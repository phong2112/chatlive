import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AppRouter, AuthenRouter, UnAuthenRouter } from "@/constants";

export const AuthenGuard = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";
  // if (!token) {
  //   return NextResponse.redirect(new URL(AppRouter.Login, request.url));
  // }

  const decodedToken: JwtPayload | null = token
    ? jwtDecode(token as string)
    : null;
  const currentTime = Date.now() / 1000;

  const isTokenExpired =
    !decodedToken || !decodedToken?.exp || decodedToken.exp < currentTime;

  // For authen routers
  if (AuthenRouter.includes(pathName)) {
    return isTokenExpired
      ? NextResponse.redirect(new URL(AppRouter.Login, request.url))
      : NextResponse.next();
  }

  // For unauthen routers
  if (UnAuthenRouter.includes(pathName)) {
    return isTokenExpired
      ? NextResponse.next()
      : NextResponse.redirect(new URL(AppRouter.Home, request.url));
  }
};
