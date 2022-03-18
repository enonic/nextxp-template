import {TypesRegistry} from './ComponentRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './utils';
import FragmentView from './views/Fragment';
import BasePage from './views/BasePage';
import BasePart from './views/BasePart';
import BaseLayout from './views/BaseLayout';
import TextView from './views/Text';
import { PageDevView } from './views/BasePage';
import { PartDevView } from './views/BasePart';
import { LayoutDevView } from './views/BaseLayout';
import {CATCH_ALL} from './ComponentRegistry';
import {ContentDevView} from './views/BaseContent';

// Base Content Types

TypesRegistry.addContentType(FRAGMENT_CONTENTTYPE_NAME, {
    view: FragmentView,
});



// Base Components

TypesRegistry.addComponent(XP_COMPONENT_TYPE.PAGE, {
    view: BasePage
});

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

// Next Dev mode handling

TypesRegistry.addPage(CATCH_ALL, {
    view: PageDevView
});

TypesRegistry.addPart(CATCH_ALL, {
    view: PartDevView
});

TypesRegistry.addLayout(CATCH_ALL, {
    view: LayoutDevView
});

/*
// TODO This view be enabled to run _AFTER_ content and page rendering, rename to addFallback()?
TypesRegistry.addContentType(CATCH_ALL, {
    view: ContentDevView,
});
*/


console.info('Base components registered');
