



import { basicMiddleware } from "./middlewares/basicMiddleware";
import { withLocale } from "./middlewares/middlewareLocal";
import { stackMiddlewares } from './middlewares/stackMiddlewares';
import { withAuthentication } from "./middlewares/withAuthentication";


const middlewares = [basicMiddleware]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|assets|docs|.*\\..*|_next).*)",
  ],
}
