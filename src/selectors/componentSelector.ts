export type ComponentSelector = {
    [type: string]: (content: any) => JSX.Element   // TODO: content? Always? Better description?
}

const componentSelector: ComponentSelector = {
};


export default componentSelector;
