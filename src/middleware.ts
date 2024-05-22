// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoute,
//   publicRoute,
// } from "./route";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoute.includes(nextUrl.pathname);
//   const isAuthRoute = authRoute.includes(nextUrl.pathname);

//   // if (isApiAuthRoute) {
//   //   return null;
//   // }
//   // if (isAuthRoute) {
//   //   if (isLoggedIn) {
//   //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//   //   }
//   //   return null;
//   // }

//   // if (!isLoggedIn && !isPublicRoute) {
//   //   return Response.redirect(new URL("/auth/signin", nextUrl));
//   // }
//   // return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//   if (nextUrl.pathname.startsWith("/v1")) {
//     if (!isLoggedIn) {
//       return Response.redirect(new URL("/auth/signin", nextUrl));
//     }
//   }
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export { auth as middleware } from "@/auth";
