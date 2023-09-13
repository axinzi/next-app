import { NextResponse, NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequest) {
    // const pathname = request.nextUrl.pathname;
    // // 权限验证
    // switch (true) {
    //   case pathname.startsWith('/user'):
    //     console.log(pathname)
    //     break;
    //   case pathname.startsWith('/admin'):
    //     console.log(pathname)
    //     break;
    // }
    return NextResponse.next()
  },

  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
  }
)
export const config = { matcher: ["/user/:path*","/"] }