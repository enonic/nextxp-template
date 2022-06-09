import {ContentApiBaseBody, Context, fetchContent, fetchGuillotine} from '../guillotine/fetchContent';
import {CONTENT_API_URL} from '../utils';

// Static files are generated long before a request is made so needs to register mappings
import "../../_enonicAdapter/baseMappings";
import "../../components/_mappings";

const query = `query($path: ID) {
                  guillotine {
                    getChildren(key: $path) {
                      _name
                    }
                  }
                }`;

export function createStaticFunctions(path: string, paramName: string = 'name', sourceName: string = '_name') {
    return {
        getStaticProps: async function (context: Context) {
            const params = context.params || {};
            return {
                props: await fetchContent(`${path}/${params[paramName] || ''}`, context),
                revalidate: 60 * 60 // ISR every hour
            }
        },
        getStaticPaths: async function () {
            const fullPath = `\${site}/${path}/`;
            const body: ContentApiBaseBody = {
                query,
                variables: {path: fullPath}
            };
            const result = await fetchGuillotine(CONTENT_API_URL, body, fullPath);
            const paths = result?.guillotine?.getChildren.map((child: any) => {
                return {
                    params: {
                        [paramName]: child[sourceName]
                    }
                }
            });

            return {
                paths,
                fallback: false,
            };
        }
    }
}
