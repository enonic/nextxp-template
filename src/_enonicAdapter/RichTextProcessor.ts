import {commonChars, CONTENT_API_URL, getUrl, RENDER_MODE} from './utils';
import {parse} from 'node-html-parser';
import HTMLElement from 'node-html-parser/dist/nodes/html';
import * as ReactDOMServer from 'react-dom/server';
import {MetaData} from './guillotine/getMetaData';
import BaseMacro from './views/BaseMacro';

export interface TextData {
    processedHtml: string,
    links: LinkData[],
    macrosAsJson: MacroData[],
}

export interface LinkData {
    ref: string,
    media: {
        content: {
            id: string,
        }
    } | null,
}

export interface MacroConfig {
    [key: string]: any;
}

export interface MacroData {
    ref: string;
    name: string;
    descriptor: string;
    config: {
        [name: string]: MacroConfig;
    };
}

export class RichTextProcessor {
    private static urlFunction: (url: string) => string;
    private static apiUrl: string;
    private static macroAttr = 'data-macro-ref';
    private static imageAttr = 'data-image-ref';
    private static linkAttr = 'data-link-ref';

    public static process(data: TextData, meta: MetaData): string {
        const root: HTMLElement = parse(data.processedHtml);
        const mode = meta?.renderMode || RENDER_MODE.NEXT;
        // run first to make sure contents is updated before processing links and images
        this.processMacros(root, data.macrosAsJson, meta);
        this.processLinks(root, data.links, mode);
        if (mode !== RENDER_MODE.NEXT) {
            // images have absolute urls to XP so no need to process them in next mode rendering
            this.processImages(root);
        }
        return root.toString();
    }

    private static processMacros(root: HTMLElement, macroData: MacroData[], meta: MetaData): void {
        const macros = root.querySelectorAll('editor-macro[' + this.macroAttr + ']');
        macros.forEach(macroEl => {
            const ref = macroEl.getAttribute(this.macroAttr);
            if (ref) {
                const data = macroData.find(d => d.ref === ref);
                if (data) {
                    const MacroElement = BaseMacro({meta, data});
                    // don't replace if macro output is null
                    if (MacroElement) {
                        const macroOutput = ReactDOMServer.renderToStaticMarkup(MacroElement);
                        macroEl.replaceWith(macroOutput);
                    }
                }
            }
        })
    }

    private static processImages(root: HTMLElement): void {
        const imgs = root.querySelectorAll('img[' + this.imageAttr + ']');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                img.setAttribute('src', this.urlFunction(this.stripApiUrl(src)));
            }
        })
    }

    private static processLinks(root: HTMLElement, linkData: LinkData[], mode: RENDER_MODE): void {
        const links = root.querySelectorAll('a[' + this.linkAttr + ']');
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
        const remaining = common.length > 0 ? url.substring(common.length) : url;
        return (remaining.length > 0 && remaining.charAt(0) === '/') ? remaining.substring(1) : remaining;
    }


}

RichTextProcessor.setUrlFunction(getUrl);
RichTextProcessor.setApiUrl(CONTENT_API_URL);
