import { getContentLinkUrlFromXpPath } from '../../enonic-connection-config';

const processPerson = (props, context) => ({
    ...props,
    parent: {
        _path: getContentLinkUrlFromXpPath(props.parent._path, context)
    }
});

export default processPerson;
