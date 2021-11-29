import React from "react"
import {APP_NAME} from "../../../enonic-connection-config";
import Layout from "../../../components/blocks/Layout";

// fully qualified XP content-type name:
export const PERSON_CONTENTTYPE_NAME = `${APP_NAME}:person`;

const Person = ({content}) => {
    const {displayName, data={}, parent={}, layoutProps} = content;
    const {bio, photos} = data;
    const {_path} = parent;

    return (
        <Layout {...layoutProps}>
            <div>
                <h1>{displayName}</h1>

                <p>{bio}</p>

                {
                    photos.map((photo, i) => (
                        <img key={i}
                             src={photo.imageUrl}
                             title={
                                 (photo.attachments || [])[0].name ||
                                 displayName
                             }
                             width="200"
                        />
                    ))
                }
            </div>

            <p><a href={_path}>Back to Persons</a></p>
        </Layout>
    )
}

export default Person;
