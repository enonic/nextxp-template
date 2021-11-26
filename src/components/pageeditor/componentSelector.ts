import TextComponent from './TextComponent';
import PartComponent from './PartComponent';
import ImageComponent from './ImageComponent';

export type ComponentSelector = {
    [type: string]: (content: any) => JSX.Element
}

const componentSelector: ComponentSelector = {
    'text': TextComponent,
    'part': PartComponent,
    'image': ImageComponent,
};


export default componentSelector;
