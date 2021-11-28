import React from "react"

const PersonPage = (props) => {
    const {displayName, data={}, parent={}} = props.content;
    const {bio, photos} = data;
    const {_path} = parent;

    return (
        <>
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
        </>
    )
}

export default PersonPage;
