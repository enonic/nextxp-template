import {NextRequest, NextResponse} from 'next/server'
import {getProjectsConfig, PROJECT_ID_HEADER, ProjectsConfig} from '@enonic/nextjs-adapter'

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
    if (locale && locale !== 'default' && req.nextUrl.locale !== locale) {
        const url = new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url);
        console.info(`Project "${projectId}" needs "${locale}" locale, was "${req.nextUrl.locale}"; redirecting to: ${url}`);

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

    const projects: ProjectsConfig = getProjectsConfig();

    return Object.keys(projects).find(l => {
        return projects[l]?.toLowerCase() === projectId.toLowerCase();
    });
}