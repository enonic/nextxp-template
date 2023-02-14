import React from 'react'
import {FetchContentResult, getUrl} from '@enonic/nextjs-adapter';

const Person = (props: FetchContentResult) => {
    const {displayName, data, parent} = props.data?.get as any;
    const {bio, photos} = data;
    const meta = props.meta;
    const {_path} = parent;

    return (
        <>
            <div>
                <h2>{displayName}</h2>
                <p>{bio}</p>
                {
                    photos.map((photo: any, i: number) => (
                        <img key={i}
                             src={getUrl(photo.imageUrl, meta)}
                             title={getTitle(photo, displayName)}
                             alt={getTitle(photo, displayName)}
                             width="500"
                        />
                    ))
                }
            </div>
            <p><a href={getUrl(_path, meta)}>Back to Persons</a></p>
        </>
    )
}

export default Person;

function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
}