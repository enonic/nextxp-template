import React from "react"
import {FetchContentResult} from '../../_enonicAdapter/guillotine/fetchContent';
import {APP_NAME_UNDERSCORED, getUrl} from '../../_enonicAdapter/constants'

const Person = (props: FetchContentResult) => {
    const {displayName, data, parent} = props.content as any;
    const {bio, photos} = data;
    const {_path} = parent;

    return (
        <>
            <div>
                <h2>{displayName}</h2>
                <p>{bio}</p>
                {
                    photos.map((photo: any, i: number) => (
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
            <p><a href={getUrl(_path)}>Back to Persons</a></p>
        </>
    )
}

export default Person;

export const getPerson = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Person {
        data {
          bio
          dateofbirth
          photos {
           ... on media_Image {                                             
              imageUrl: imageUrl(type: absolute, scale: "width(500)")       
              attachments {                                                 
                name
              }
            }
          }
        }
      }
      parent {
        _path(type: siteRelative)                                                           
      }
    }
  }
}`;
