
import BasePart from "../components/pageeditor/parts/_BasePart";
import Image from "../components/pageeditor/_Image";
import Text from "../components/pageeditor/_Text";
import {PropsProcessor, ReactComp, SelectedQueryMaybeVariablesFunc} from "./typeSelector";


export type ComponentSelection = {
    //query?: SelectedQueryMaybeVariablesFunc,
    //props?: PropsProcessor,
    page?: ReactComp
}

export type ComponentSelector = {
    [fullContentType: string]: ComponentSelection
}

const componentSelector: ComponentSelector = {
    'text': {
        page: Text
    },
    'part': {
        page: BasePart
    },
    'image': {
        page: Image
    }
};

export default componentSelector;
