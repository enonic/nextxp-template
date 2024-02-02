import {NextRequest, NextResponse} from 'next/server'
import {getLocaleProjectConfigById, PROJECT_ID_HEADER} from '@enonic/nextjs-adapter'
import {addBasePath} from 'next/dist/client/add-base-path';

const PUBLIC_ASSET = /\.(.*)$/

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        req.nextUrl.pathname.startsWith('/_/enonic') ||
        PUBLIC_ASSET.test(req.nextUrl.pathname)
    ) {
        return
    }

    const projectId = req.headers.get(PROJECT_ID_HEADER) || undefined;
    const locale = getLocaleProjectConfigById(projectId)?.locale;

    if (locale && locale !== 'default' && req.nextUrl.locale !== locale) {
        const baseUrl = addBasePath(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`);
        const url = new URL(baseUrl, req.url);
        console.info(`Project "${projectId}" needs "${locale}" locale, was "${req.nextUrl.locale}"; redirecting to: ${url}`);

        const response = NextResponse.redirect(url);
        response.headers.set('Accept-Language', locale);
        response.cookies.set('NEXT_LOCALE', locale);

        return response;
    }

    return NextResponse.next();
}
