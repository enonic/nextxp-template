// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import {PageComponent} from "./typeSelector";

export type ComponentSelector = {
    [fullContentType:string]: ComponentSelection
}
export type ComponentSelection = {
    page?: PageComponent
}

const componentSelector: ComponentSelector = {

};


export default componentSelector;
