import React from "react"

const Person = ({content}) => {
    const {displayName, data={}, parent={}} = content;
    const {bio, photos} = data;
    const {_path} = parent;

    return (
        <>
            <div>
                <h2>{displayName}</h2>
                <p>{bio}</p>
                {
                    photos.map((photo, i) => (
                        <img key={i}
                             src={photo.imageUrl}
                             title={
                                 (photo.attachments || [])[0].name ||
                                 displayName
                             }
                             width="500"
                        />
                    ))
                }
            </div>
            <p><a href={_path}>Back to Persons</a></p>
        </>
    )
}

export default Person;
