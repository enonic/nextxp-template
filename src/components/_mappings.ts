import {CATCH_ALL, ComponentRegistry} from '@enonic/nextjs-adapter';
import PropsView from '@enonic/nextjs-adapter/views/PropsView';
import {commonQuery, commonVariables} from './queries/common';

import "@enonic/nextjs-adapter/baseMappings";

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
