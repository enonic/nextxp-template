import {NextResponse} from 'next/server';

export function validateToken(token: string | null) {
    if (token !== process.env.ENONIC_API_TOKEN) {
        // XP hijacks 401 to show login page, so send 407 instead
        return NextResponse.json({message: 'Invalid token'}, {
            status: 407,
        });
    }
    return null;
}

export function validatePath(path: string | string[] | null) {
    // If the slug doesn't exist prevent preview mode from being enabled
    if (path === null || path === undefined) {
        return NextResponse.json({message: 'Invalid path'}, {
            status: 400,
        });
    }
    return null;
}
