import {getUrl, RENDER_MODE} from './utils';
import {parse} from 'node-html-parser';

export interface TextData {
    processedHtml: string,
    images: {
        ref: string,
    }[]
}

export class RichTextProcessor {
    private static urlFunction: (url: string) => string;
    private static imageAttr = 'data-image-ref';

    public static process(data: TextData, mode: RENDER_MODE): string {
        if (mode === RENDER_MODE.NEXT) {
            // images have absolute urls to XP so no need to process them in next mode rendering
            return data.processedHtml;
        }
        const root = parse(data.processedHtml);
        const imgs = root.querySelectorAll('img');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (img.hasAttribute(this.imageAttr) && src) {
                const ind = src.indexOf('_/image');
                img.setAttribute('src', this.urlFunction(ind >= 0 ? src.substr(ind) : src));
            }
        })
        return root.toString();
    }


    public static setUrlFunction(func: (url: string) => string): void {
        this.urlFunction = func;
    }

}

RichTextProcessor.setUrlFunction(getUrl);
