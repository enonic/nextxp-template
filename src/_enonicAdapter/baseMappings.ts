import {CATCH_ALL, ComponentRegistry} from './ComponentRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './utils';
import FragmentView from './views/Fragment';
import BasePage, {PageDevView} from './views/BasePage';
import BasePart, {PartDevView} from './views/BasePart';
import BaseLayout, {LayoutDevView} from './views/BaseLayout';
import TextView from './views/Text';
import {ContentDevView} from './views/BaseContent';

// Base Content Types

ComponentRegistry.addContentType(FRAGMENT_CONTENTTYPE_NAME, {
    view: FragmentView,
});


// Base Components

ComponentRegistry.addComponent(XP_COMPONENT_TYPE.PAGE, {
    view: BasePage
});

ComponentRegistry.addComponent(XP_COMPONENT_TYPE.PART, {
    view: BasePart
});

ComponentRegistry.addComponent(XP_COMPONENT_TYPE.LAYOUT, {
    view: BaseLayout
});

ComponentRegistry.addComponent(XP_COMPONENT_TYPE.FRAGMENT, {
    view: FragmentView
});

ComponentRegistry.addComponent(XP_COMPONENT_TYPE.TEXT, {
    view: TextView
});

// Next Dev mode handling

ComponentRegistry.addPage(CATCH_ALL, {
    view: PageDevView
});

ComponentRegistry.addPart(CATCH_ALL, {
    view: PartDevView
});

ComponentRegistry.addLayout(CATCH_ALL, {
    view: LayoutDevView
});

ComponentRegistry.addContentType(CATCH_ALL, {
    view: ContentDevView
});


// console.debug('Base components registered');
