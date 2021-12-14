import {APP_NAME, APP_NAME_UNDERSCORED} from '../../../xpAdapter/enonic-connection-config'

export default `
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

// fully qualified XP content-type name:
export const PERSON_CONTENTTYPE_NAME = `${APP_NAME}:person`;
