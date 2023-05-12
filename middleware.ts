import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("Logged In As Police: " + request.cookies.has('loggedin'))
  console.log("Logged In As Public: " + request.cookies.has('loggedinaspublic'))

  if (request.nextUrl.pathname.startsWith('/firCards') && !request.cookies.has('loggedin')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/evidence') && !request.cookies.has('loggedin')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/evidenceCards') && !request.cookies.has('loggedin')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}