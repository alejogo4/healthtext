import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server';

import { MiddlewareFactory } from './types';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { withAuthentication } from './withAuthentication';

let defaultLocale = 'en';
let locales = ['bn', 'en', 'ar'];

function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
  let headers = { 'accept-language': acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); 
}


export const basicMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;

    const locale = getLocale(request);

    const pathnameIsMissingLocale = locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathname.includes('/auth')) {

      if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
          new URL(`/${locale}/auth/login`, request.url)
        );
      }
      return NextResponse.next();
    }

    return withAuthentication(next)(request, _next);
  };
};
