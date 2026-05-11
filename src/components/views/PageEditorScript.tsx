'use client';

import {RENDER_MODE} from '@enonic/nextjs-adapter';

import {useLayoutEffect} from 'react';

const PageEditorScript = function ({mode}: { mode: RENDER_MODE }) {
    useLayoutEffect(() => {
        // TODO: change to static import after jquery is removed from page-editor (ssr fails now)
        // because of dynamic import it gets init too late and misses the event from CS
        import('@enonic/page-editor').then(({PageEditor, EditorEvents}) => {
            if (!PageEditor.isInitialized()) {
                PageEditor.init(mode === RENDER_MODE.EDIT);
                console.info(`Page editor started in ${mode} mode.`);
            }

            PageEditor.on(EditorEvents.ComponentLoadRequest, (event => {
                    const data = event.getData();
                    console.log('Component load request', data);
                })
            );
        })
    })
    return null;
};

export default PageEditorScript;
