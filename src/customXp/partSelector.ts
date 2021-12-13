import PersonList, {PERSONLIST_PART_NAME} from "./parts/PersonList";
import {TypesRegistry} from '../xpAdapter/TypesRegistry';


TypesRegistry.addPart(PERSONLIST_PART_NAME, {
    // query: personQuery,              // TODO: support specifying queries to parts in fetchContent
    // props: personPropsProcessor      // TODO: support props processors to parts in fetchContent
    view: PersonList
})
