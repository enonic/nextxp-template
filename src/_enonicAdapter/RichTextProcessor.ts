import {commonChars, CONTENT_API_URL, getUrl} from './utils';
import {LinkData} from './guillotine/getMetaData';

export class RichTextProcessor {
    private static urlFunction: (url: string) => string;
    private static apiUrl: string;

    public static IMG_TAG = 'img';
    public static LINK_TAG = 'a';
    public static MACRO_TAG = 'editor-macro';

    public static IMG_ATTR = 'data-image-ref';
    public static LINK_ATTR = 'data-link-ref';
    public static MACRO_ATTR = 'data-macro-ref';

    public static processUrl(url: string): string {
        return this.urlFunction(this.stripApiUrl(url));
    }

    public static setUrlFunction(func: (url: string) => string): void {
        this.urlFunction = func;
    }

    public static setApiUrl(url: string): void {
        this.apiUrl = url;
    }

    public static isMediaLink(ref: string, linkData: LinkData[]): boolean {
        return linkData.find(data => data.ref === ref)?.media !== null;
    }

    private static stripApiUrl(url: string): string {
        const common = commonChars(url, this.apiUrl);
        const remaining = common.length > 0 ? url.substring(common.length) : url;
        return (remaining.length > 0 && remaining.charAt(0) === '/') ? remaining.substring(1) : remaining;
    }


}

RichTextProcessor.setUrlFunction(getUrl);
RichTextProcessor.setApiUrl(CONTENT_API_URL);
