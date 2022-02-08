import {TypesRegistry} from './TypesRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './constants';
import FragmentView from './views/_Fragment';
import BasePart from './views/_BasePart';
import BaseLayout from './views/_BaseLayout';
import TextView from './views/_Text';
import { LayoutDevView, PageDevView, PartDevView } from './views/_DevView';
import {CATCH_ALL} from '../cmsAdapter/TypesRegistry';

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

TypesRegistry.addPage(CATCH_ALL, {
    view: PageDevView
});

TypesRegistry.addPart(CATCH_ALL, {
    view: PartDevView
});

TypesRegistry.addLayout(CATCH_ALL, {
    view: LayoutDevView
});

console.info('Base components registered');
