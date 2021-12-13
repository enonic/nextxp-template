import {Context} from "../pages/[[...contentPath]]";

export type ReactView = (props: any) => JSX.Element;

export type PropsProcessor = (content: any, context?: Context) => any

// TODO: also access as arguments: dataAsJson, pageAsJson, configAsJson from the first (meta) call here? To allow content or component config values to affect the query? Another option could be to let the component or page controller pass those values to nextjs by a header
export type VariablesGetter = (path: string, context?: Context) => {
    path: string,
    [variables: string]: any
};


export type SelectedQueryMaybeVariablesFunc = string |
    { query: string, variables: VariablesGetter } |
    [string, VariablesGetter]
