// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import {ReactView} from "./contentSelector";

import PersonList, {PERSONLIST_PART_NAME} from "./parts/PersonList";
import HeaderView, {HEADER_PART_NAME} from "./parts/Header";
import FooterView, {FOOTER_PART_NAME} from "./parts/Footer";

export type PartSelector = {
    [descriptor:string]: PartSelection
}

export type PartSelection = {
    view?: ReactView
}

const partSelector: PartSelector = {

    [PERSONLIST_PART_NAME]: {
        view: PersonList
    },
    [HEADER_PART_NAME]: {
        view: HeaderView
    },
    [FOOTER_PART_NAME]: {
        view: FooterView
    },

};


export default partSelector;
