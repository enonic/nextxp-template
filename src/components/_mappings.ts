import {APP_NAME} from '../_enonicAdapter/utils'
import {ComponentRegistry, CATCH_ALL} from '../_enonicAdapter/ComponentRegistry';
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
