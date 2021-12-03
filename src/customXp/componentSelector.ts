
import BasePart from "../xpAdapter/views/_BasePart";
import ImageView from "./components/_Image";
import TextView from "./components/_Text";

import {TypeSelection} from "./_selectorTypes";
import {XP_COMPONENT_TYPE} from "../xpAdapter/enonic-connection-config";



export type ComponentSelector = {
    [fullContentType: string]: TypeSelection
}

const componentSelector: ComponentSelector = {

    [XP_COMPONENT_TYPE.TEXT]: {
        // query: TODO: allow override queries (which would affect all text components) to be added here? If so, should they mutate the first (meta) or the second one?
        // props: TODO: same,
        view: TextView
    },

    [XP_COMPONENT_TYPE.PART]: {
        //
        view: BasePart
    },

    [XP_COMPONENT_TYPE.IMAGE]: {
        // query: TODO: allow override queries (which would affect all image components) to be added here? If so, should they mutate the first (meta) or the second one?
        // props: TODO: same,
        view: ImageView
    },

    /* TODO: Support
        Layout
        Fragment
     */
};

export default componentSelector;
