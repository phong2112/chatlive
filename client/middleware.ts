import type { NextRequest } from "next/server";
import { AuthenGuard } from "./ultis/guards/authen";

export function middleware(request: NextRequest) {
  // Run authen guard first => validate the session
  return AuthenGuard(request);
}
