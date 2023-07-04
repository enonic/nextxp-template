import {NextRequest, NextResponse} from 'next/server'
import {PROJECT_ID_HEADER} from '@enonic/nextjs-adapter'
import {projects} from '../i18n.config'

const PUBLIC_ASSET = /\.(.*)$/

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_ASSET.test(req.nextUrl.pathname)
    ) {
        return
    }

    const projectId = req.headers.get(PROJECT_ID_HEADER);
    const locale = getProjectLocale(projectId);
    if (locale && req.nextUrl.locale !== locale) {
        const url = new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url);
        console.info(`Middleware: project "${projectId}" needs "${locale}" locale, redirecting to: ${url}`);

        const response = NextResponse.redirect(url);

        response.headers.set('Accept-Language', locale);
        response.cookies.set('NEXT_LOCALE', locale);

        return response;
    }

    return NextResponse.next();
}

function getProjectLocale(projectId: string | null): string | undefined {
    if (!projectId) {
        return;
    }

    return Object.keys(projects).find(l => {
        return projects[l]?.toLowerCase() === projectId.toLowerCase();
    });
}