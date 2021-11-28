// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import {ReactComp} from "./typeSelector";

import PersonsList, {PERSONS_LIST_PART_NAME} from "../components/pageeditor/parts/PersonsList";

export type PartSelector = {
    [descriptor:string]: PartSelection
}

export type PartSelection = {
    page?: ReactComp
}

const partSelector: PartSelector = {
    /*[`${APP_NAME}:${PERSONS_LIST_PART_NAME}`]: {
        page: PersonsList
    },*/
};


export default partSelector;
