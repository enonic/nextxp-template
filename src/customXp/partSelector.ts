// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../xpAdapter/enonic-connection-config";


import PersonList, {PERSONLIST_PART_NAME} from "./parts/PersonList";
import {TypeSelection} from "./_selectorTypes";

export type PartSelector = {
    [fullContentType: string]: TypeSelection
}


const partSelector: PartSelector = {

    // TODO: Should this selector handle layouts too rather than adding layoutSelector.ts? Simpler to keep it in one place, but should we then rename this file? To what?

    [PERSONLIST_PART_NAME]: {
        // query: personQuery,              // TODO: support specifying queries to parts in fetchContent
        // props: personPropsProcessor      // TODO: support props processors to parts in fetchContent
        view: PersonList
    },

};


export default partSelector;
