
import BasePart from "../xpAdapter/views/_BasePart";
import ImageView from "./components/_Image";
import TextView from "./components/_Text";

import {PropsProcessor, ReactView, SelectedQueryMaybeVariablesFunc} from "./contentSelector";


export type ComponentSelection = {
    //query?: SelectedQueryMaybeVariablesFunc,
    //props?: PropsProcessor,
    view?: ReactView
}

export type ComponentSelector = {
    [fullContentType: string]: ComponentSelection
}

const componentSelector: ComponentSelector = {
    'text': {
        view: TextView
    },
    'part': {
        view: BasePart
    },
    'image': {
        view: ImageView
    }
};

export default componentSelector;
