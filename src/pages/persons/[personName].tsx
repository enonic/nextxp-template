import React from 'react';
import MainView from '../../_enonicAdapter/views/MainView';
import {createStaticFunctions} from '../../_enonicAdapter/pages/static';

export const {getStaticPaths, getStaticProps} = createStaticFunctions('persons', 'personName');

export default MainView;
