// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../xpAdapter/enonic-connection-config";

import {ReactView} from "./contentSelector";

import PersonList, {PERSONLIST_PART_NAME} from "./parts/PersonList";

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

};


export default partSelector;
