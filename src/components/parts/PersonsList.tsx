import React from "react"
import {APP_NAME_DASHED, CONTENT_API_URL} from '../../enonic-connection-config';
import {fetchFromApi} from '../../guillotine/fetchContent';
import getListQuery from '../../selectors/queries/getList';

type Props = Record<string, any>;

export const PERSONS_LIST_PART_NAME = 'persons-list';

const PersonsList = (props: Props) => {
    fetchData(props).then(data => {
        //TODO: handle data fetching differently
    });
    return (
        <>
            <h2>{props[APP_NAME_DASHED][PERSONS_LIST_PART_NAME].title}</h2>

            <pre>{JSON.stringify(props, null, 2)}</pre>
        </>
    )
}

async function fetchData(props: Props) {
    const body = {
        query: getListQuery,
        variables: {
            path: '/hmdb/persons',
        }
    }
    const data = await fetchFromApi(CONTENT_API_URL, body);
    return {
        props: data
    }
}

export default PersonsList;
