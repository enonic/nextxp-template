import PersonsList, {PERSONS_LIST_PART_NAME} from './PersonsList';
import {APP_NAME} from '../../enonic-connection-config';

export type PartSelector = {
    [descriptor: string]: (content: any) => JSX.Element,
}

const partSelector: PartSelector = {
    [`${APP_NAME}:${PERSONS_LIST_PART_NAME}`]: PersonsList,
};

export default partSelector;
