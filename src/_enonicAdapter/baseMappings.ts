import {CATCH_ALL, ComponentRegistry} from './ComponentRegistry';
import {FRAGMENT_CONTENTTYPE_NAME, XP_COMPONENT_TYPE} from './utils';
import FragmentView from './views/Fragment';
import BasePage from './views/BasePage';
import BasePart from './views/BasePart';
import BaseLayout from './views/BaseLayout';
import TextView from './views/Text';

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
