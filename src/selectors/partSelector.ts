// APP_NAME helps to fully qualify XP-component name strings in the connected XP app:
import {APP_NAME} from "../enonic-connection-config";

import {ReactComp} from "./typeSelector";

export type PartSelector = {
    [descriptor:string]: PartSelection
}

export type PartSelection = {
    page?: ReactComp
}

const partSelector: PartSelector = {

};


export default partSelector;
