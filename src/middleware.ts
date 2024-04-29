import {getRequestLocaleInfo} from '@enonic/nextjs-adapter'
import {NextRequest, NextResponse} from 'next/server'


export function middleware(req: NextRequest) {

    const pathname = req.nextUrl.pathname;
    const {locale, locales} = getRequestLocaleInfo({
        contentPath: pathname,
        headers: req.headers
    });

    const pathPart = pathname.split('/')[1];    // pathname always starts with a slash, followed by locale
    const pathHasLocale = locales.indexOf(pathPart) >= 0

    if (pathHasLocale) {
        // locale is already in the path, no need to redirect
        return;
    } else if (!locale) {
        // no locale found in path or headers, return 404
        console.debug(`Middleware returning 404 for '${pathname}': no locale found`);
        return new NextResponse(null, {
            status: 404,
        });
    }

    req.nextUrl.pathname = `/${locale}${pathname}`

    console.debug(`Middleware redirecting '${pathname}' to '${req.nextUrl.pathname}'`);

    return NextResponse.rewrite(req.nextUrl, {
        request: req,
    });
}

export const config = {
    // NB: should contain all files and folders in the /public folder
    matcher: ["/((?!robots.txt|sitemap.xml|manifest.json|api/|images/|fonts/|_next/webpack-hmr|_next/static|_next/image|assets|favicon.ico|sw.js).*)",],
};
