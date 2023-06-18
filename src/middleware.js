import { NextResponse } from 'next/server';
 
export function middleware(request) {
  if(!request.cookies.has('id')){
    if (
        request.nextUrl.pathname.startsWith('/musica') ||
        request.nextUrl.pathname.startsWith('/sala') ||
        request.nextUrl.pathname.startsWith('/salas')
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  }else{
    if (
        request.nextUrl.pathname.startsWith('/cadastro') ||
        request.nextUrl.pathname.startsWith('/login')
    ) {
        return NextResponse.redirect(new URL('/salas', request.url));
    }
  };
}