import { getContentLinkUrlFromXpPath } from '../../enonic-connection-config';

const processList = (props, context) => ({
    ...props,
    children: (props.children || []).map(
        child => ({
            ...child,
            _path: getContentLinkUrlFromXpPath(child._path, context)
        })
    )
});

export default processList;
