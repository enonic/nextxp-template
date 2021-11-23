import { getContentLinkUrlFromXpPath } from '../../enonic-connection-config';

const processMovie = (props, context) => ({
    ...props,
    data: {
        ...props.data,
        cast: (props.data?.cast || []).map(
            person => ({
                ...person,
                actor: {
                    ...person.actor,
                    _path: getContentLinkUrlFromXpPath(person.actor._path, context)
                }
            })
        )
    },
    parent: {
        _path: getContentLinkUrlFromXpPath(props.parent._path, context)
    }
});

export default processMovie;
