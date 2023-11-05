import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'

let locales = ['pt', 'en']

function getLocale(request) {
  let headers = { 'accept-language': 'pt;q=0.5' }
  let languages = new Negotiator({ headers }).languages()
  let locales = ['pt', 'en']
  let defaultLocale = 'pt'

  return match(languages, locales, defaultLocale)
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  const isApiPath = pathname.startsWith("/api");

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale && !isApiPath) {
    const locale = getLocale(request);

    // Redirecione para a URL corrigida com o locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    '/((?!api|icones|_next/static|_next/image|favicon.ico).*)',
  ],
}