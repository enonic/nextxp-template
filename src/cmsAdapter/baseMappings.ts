import {TypesRegistry} from './TypesRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './constants';
import FragmentView from './views/_Fragment';
import BasePart from './views/_BasePart';
import BaseLayout from './views/_BaseLayout';
import TextView from './views/_Text';

// Base Content Types

TypesRegistry.addContentType(FRAGMENT_CONTENTTYPE_NAME, {
    view: FragmentView,
});

// Base Components

TypesRegistry.addComponent(XP_COMPONENT_TYPE.PART, {
    view: BasePart
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.LAYOUT, {
    view: BaseLayout
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.FRAGMENT, {
    view: FragmentView
});

TypesRegistry.addComponent(XP_COMPONENT_TYPE.TEXT, {
    view: TextView
});

console.info('Base components registered');
