import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server';
import withAuth from 'next-auth/middleware';

import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

let defaultLocale = 'en';
let locales = ['bn', 'en', 'ar'];


function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
  let headers = { 'accept-language': acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export const withAuthentication = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const locale = getLocale(request);
    const pathname = request.nextUrl.pathname;
    let auth = null;

    const pathnameIsMissingLocale = locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    const handleMiddleware = withAuth(() => {}, {
      callbacks: {
        authorized(params) {
          let { token } = params;
          auth = !!token;
          return !!token;
        }
      },
      pages: {
        signIn: `/${locale}/auth/login`,
        error: `/error`
      }
    }) as NextMiddleware;

    await handleMiddleware(request, _next);

    if (!auth) {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    } else {
      if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
          new URL(`/${locale}/${pathname}`, request.url)
        );
      }
    }
  };
};
