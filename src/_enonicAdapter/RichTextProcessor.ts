import {commonChars, getUrl} from './utils';
import {ImageData, LinkData} from './guillotine/getMetaData';

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
        const strippedUrl = this.stripApiUrl(url);
        return this.urlFunction ? this.urlFunction(strippedUrl) : strippedUrl;
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

    public static isContentImage(ref: string, linkData: ImageData[]): boolean {
        return linkData.find(data => data.ref === ref)?.image !== null;
    }

    private static stripApiUrl(url: string): string {
        const common = commonChars(url, this.apiUrl);
        const remaining = common.length > 0 ? url.substring(common.length) : url;
        return (remaining.length > 0 && remaining.charAt(0) === '/') ? remaining.substring(1) : remaining;
    }
}

RichTextProcessor.setUrlFunction(getUrl);
