import {draftMode} from 'next/headers';
import {redirect} from 'next/navigation';
import {NextRequest} from 'next/server';
import {validatePath, validateToken} from '../../../utils';

export function HEAD(req: NextRequest) {
    return processRequest(req);
}

export function GET(req: NextRequest) {
    return processRequest(req);
}

function processRequest(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const token = params.get('token');
    let response = validateToken(token);
    if (response !== null) {
        return response;
    }

    const path = params.get('path');
    response = validatePath(path);
    if (response !== null) {
        return response;
    }

    console.info(`Previewing [${path}]...`);

    draftMode().enable();

    redirect(!path?.length ? '/' : path);
}
