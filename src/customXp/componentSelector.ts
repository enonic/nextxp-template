import BasePart from "../xpAdapter/views/_BasePart";
import ImageView from "./components/_Image";
import TextView from "./components/_Text";
import {XP_COMPONENT_TYPE} from "../xpAdapter/enonic-connection-config";
import {TypesRegistry} from '../xpAdapter/TypesRegistry';
import BaseLayout from '../xpAdapter/views/_BaseLayout';

TypesRegistry.addComponent(XP_COMPONENT_TYPE.PART, {
    view: BasePart
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.LAYOUT, {
    // query: TODO: allow override queries (which would affect all image components) to be added here? If so, should they mutate the first (meta) or the second one?
    // props: TODO: same,
    view: BaseLayout
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.IMAGE, {
    // query: TODO: allow override queries (which would affect all image components) to be added here? If so, should they mutate the first (meta) or the second one?
    // props: TODO: same,
    view: ImageView
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.TEXT, {
    // query: TODO: allow override queries (which would affect all text components) to be added here? If so, should they mutate the first (meta) or the second one?
    // props: TODO: same,
    view: TextView
});
