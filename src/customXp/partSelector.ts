// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import {ReactView} from "./contentSelector";

import PersonsView, {PERSONLIST_PART_NAME} from "./parts/PersonsList";

export type PartSelector = {
    [descriptor:string]: PartSelection
}

export type PartSelection = {
    view?: ReactView
}

const partSelector: PartSelector = {

    [PERSONLIST_PART_NAME]: {
        view: PersonsView
    },

};


export default partSelector;
