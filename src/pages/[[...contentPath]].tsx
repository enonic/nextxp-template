import React from 'react';
import {
    ContentApiBaseBody,
    Context,
    fetchContent,
    FetchContentResult,
    fetchGuillotine,
    getContentApiUrl,
    getProjectsConfig,
    getUrl,
    GuillotineResult,
    IS_DEV_MODE,
    RENDER_MODE,
} from "@enonic/nextjs-adapter";
import MainView from '@enonic/nextjs-adapter/views/MainView';

// Register component mappings
import "@enonic/nextjs-adapter/baseMappings";
import "../components/_mappings";
import {GetStaticPropsResult, Redirect} from 'next';

const query = `query ($count: Int = 100){
  guillotine {
    query(query: "type NOT LIKE 'media:*' AND type != 'base:folder' AND _path NOT LIKE '*/_*'", first: $count) {
      _name
      _path
      site {
        _name
      }
    }
  }
}`;

export async function getStaticProps(context: Context): Promise<GetStaticPropsResult<FetchContentResult>> {
    const path = context.params?.contentPath || [];
    console.info(`Accessing static page (locale=${context.locale}) ${context.preview ? '(preview) ' : ''}at: ${path}`);

    if (context.preview) {
        populateXPHeaders(context);
    }

    const {
        common = null,
        data = null,
        meta,
        error = null,
        page = null,
    } = await fetchContent(path, context);

    // HTTP 500
    if (error && error.code === '500') {
        throw error
    }

    // we can not set 418 for static paths,
    // but we can show 404 instead to be handled in CS
    const canNotRender = meta && !meta.canRender && meta.renderMode !== RENDER_MODE.EDIT;

    const catchAllInNextProdMode = meta?.renderMode === RENDER_MODE.NEXT && !IS_DEV_MODE && meta?.catchAll;

    const props = {
        common,
        data,
        meta,
        error,
        page,
    }

    let notFound = (error && error.code === '404') || context.res?.statusCode === 404 || canNotRender || catchAllInNextProdMode || undefined;
    // We want to redirect shortcuts so they work with next
    // Edit mode should be stopped so redirects don't trigger in content studio
    let redirect: Redirect | undefined = undefined;

    if (meta.type == "base:shortcut" &&
        data?.get?.data?.target?.pageUrl &&
        meta.renderMode === RENDER_MODE.NEXT) {
        redirect = {
            statusCode: 307,
            destination: getUrl(data.get.data.target.pageUrl, meta)
        };

        // Cant have 404 and redirect at the same time
        notFound = undefined;
    }

    return {
        redirect,
        notFound,
        props,
        revalidate: 3600,   // In seconds, meaning every hour
    }
}

function populateXPHeaders(context: Context) {
    const pd = context.previewData;
    if (!pd) {
        return;
    }
    const req = context.req || {};
    req.headers = Object.assign(req.headers || {}, pd.headers);
    context.params = Object.assign(context.params || {}, pd.params);
    context.req = req;
}

export async function getStaticPaths() {
    const paths = await recursiveFetchAllLocalesContent('\${site}/');
    return {
        paths: paths,
        fallback: 'blocking',
    };
}

interface Item {
    params: { contentPath: string[] },
    locale?: string,
}

export async function recursiveFetchAllLocalesContent(path: string, countPerLocale?: number, filter?: (content: any) => boolean): Promise<Item[]> {
    const promises = Object.keys(getProjectsConfig()).map(locale => recursiveFetchLocaleContent(path, locale, countPerLocale, filter));
    return Promise.all(promises).then(results => {
        return results.reduce((all, localePaths) => all.concat(localePaths), []);
    });
}

export async function recursiveFetchLocaleContent(path: string, locale: string, count?: number, filter?: (content: any) => boolean): Promise<Item[]> {
    const contentApiUrl = getContentApiUrl({locale});
    const body: ContentApiBaseBody = {
        query,
        variables: {
            count
        }
    };
    return fetchGuillotine(contentApiUrl, body).then((results: GuillotineResult) => {
        return results.guillotine.query.reduce((prev: Item[], child: any) => {
            if (filter && !filter(child)) {
                return prev;
            }
            const regexp = new RegExp(`/${child.site?._name}/?`)
            const contentPath = child._path.replace(regexp, '');
            console.info('adding[' + locale + ']', contentPath);
            prev.push({
                params: {
                    contentPath: contentPath.split('/')
                },
                locale: normalizeLocale(locale),
            });
            return prev;
        }, []);
    });
}

function normalizeLocale(locale: string): string | undefined {
    return locale !== 'default' ? locale : undefined;
}

export default MainView;
