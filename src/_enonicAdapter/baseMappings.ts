import {CATCH_ALL, TypesRegistry} from './ComponentRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './utils';
import FragmentView from './views/Fragment';
import BasePage, {PageDevView} from './views/BasePage';
import BasePart, {PartDevView} from './views/BasePart';
import BaseLayout, {LayoutDevView} from './views/BaseLayout';
import TextView from './views/Text';
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

TypesRegistry.addContentType(CATCH_ALL, {
    view: ContentDevView,
});


console.info('Base components registered');
