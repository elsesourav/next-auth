import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;
   const publicPaths = ["/signin", "/signup", "/verifyemail"];
   const isPublicPath = publicPaths.includes(path);

   const token = request.cookies.get("token")?.value || "";
   if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", request.url));
   } else if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/signin", request.url));
   }
}

// See "Matching Paths" below to learn more
export const config = {
   matcher: [
      "/",
      "/signup",
      "/signin",
      "/profile",
      "/verifyemail",
   ]
};
