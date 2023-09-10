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
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
 
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
 
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}
 
export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}