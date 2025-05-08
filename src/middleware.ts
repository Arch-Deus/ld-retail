import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check for cookie
  const cookie = cookies().get("Authorization")

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  if(!cookie){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // console.log(cookie)

  // Validate it
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  )
  
  const jwt = cookie.value

  try{
    const { payload } = await jose.jwtVerify(jwt, secret, { })

    // console.log(payload)

    const accurateConnection = await fetch(process.env.NEXT_PUBLIC_ROOT_URL+"/api/accurate_connection", {
      method: "GET"
    })

    const resultAccurateConnection = await accurateConnection.json()

    // console.log(resultAccurateConnection)

    if(!resultAccurateConnection.status){
      return NextResponse.redirect(new URL('/logout', request.url))
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }})
  }
  catch(error){
    return NextResponse.redirect(new URL('/logout', request.url))
    // console.log(error)
  }
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/marketplace/:path*'],
}
