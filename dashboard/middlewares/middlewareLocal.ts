import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server';

import { MiddlewareFactory } from './types';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let defaultLocale = 'en';
let locales = ['bn', 'en', 'ar'];

// Get the preferred locale, similar to above or using a library
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
  let headers = { 'accept-language': acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export const withLocale: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    
    if (pathnameIsMissingLocale ) {
      const locale = getLocale(request);

      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url)
      );
    }

    //return next(request, _next)
  };
};

