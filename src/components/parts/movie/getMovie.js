import {APP_NAME_UNDERSCORED} from '../../../cmsAdapter/constants'


const getMovie = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      type
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Movie {
        data {
          subtitle
          abstract
          trailer
          release
          photos {
            ... on media_Image {                                             
              imageUrl: imageUrl(type: absolute, scale: "width(500)")       
              attachments {                                                 
                name
              }
            }
          }
          cast {
            character
            actor {
              ... on ${APP_NAME_UNDERSCORED}_Person {
                _path(type: siteRelative)
                displayName
                data {
                  photos {
                    ... on media_Image {                                             
                      imageUrl: imageUrl(type: absolute, scale: "block(200,200)")       
                      attachments {                                                 
                        name
                      }
                    }
                  }
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
  }
}`;

export default getMovie;