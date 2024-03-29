import {CATCH_ALL, ComponentRegistry} from '@enonic/nextjs-adapter/ComponentRegistry';
import {commonQuery, commonVariables} from './queries/common';
import PropsView from './views/Props';


// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// Content type mappings



// Page mappings



// Layout mappings



// Part mappings



// Debug
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
