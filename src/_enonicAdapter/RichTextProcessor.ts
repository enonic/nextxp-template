import {commonChars, CONTENT_API_URL, getUrl, RENDER_MODE} from './utils';
import {parse} from 'node-html-parser';
import HTMLElement from 'node-html-parser/dist/nodes/html';

export interface TextData {
    processedHtml: string,
    links: LinkData[]
}

export interface LinkData {
    ref: string,
    media: {
        content: {
            id: string,
        }
    } | null,
}

export class RichTextProcessor {
    private static urlFunction: (url: string) => string;
    private static apiUrl: string;
    private static imageAttr = 'data-image-ref';
    private static linkAttr = 'data-link-ref';

    public static process(data: TextData, mode: RENDER_MODE): string {
        const root: HTMLElement = parse(data.processedHtml);
        this.processLinks(root, data.links, mode);
        if (mode !== RENDER_MODE.NEXT) {
            // images have absolute urls to XP so no need to process them in next mode rendering
            this.processImages(root);
        }
        return root.toString();
    }

    private static processImages(root: HTMLElement): void {
        const imgs = root.querySelectorAll('img');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            const ref = img.getAttribute(this.imageAttr);
            if (ref && src) {
                img.setAttribute('src', this.urlFunction(this.stripApiUrl(src)));
            }
        })
    }

    private static processLinks(root: HTMLElement, linkData: LinkData[], mode: RENDER_MODE): void {
        const links = root.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const ref = link.getAttribute(this.linkAttr);
            if (ref && href && !(mode === RENDER_MODE.NEXT && this.isMediaLink(ref, linkData))) {
                // do not process media links in next to keep it absolute
                link.setAttribute('href', this.urlFunction(this.stripApiUrl(href)));
            }
        })
    }

    public static setUrlFunction(func: (url: string) => string): void {
        this.urlFunction = func;
    }

    public static setApiUrl(url: string): void {
        this.apiUrl = url;
    }

    private static isMediaLink(ref: string, linkData: LinkData[]): boolean {
        return linkData.find(data => data.ref === ref)?.media !== null;
    }

    private static stripApiUrl(url: string): string {
        const common = commonChars(url, this.apiUrl);
        const remaining = common.length > 0 ? url.substr(common.length) : url;
        return (remaining.length > 0 && remaining.charAt(0) === '/') ? remaining.substr(1) : remaining;
    }


}

RichTextProcessor.setUrlFunction(getUrl);
RichTextProcessor.setApiUrl(CONTENT_API_URL);
