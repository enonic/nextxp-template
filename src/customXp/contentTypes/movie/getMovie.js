import {APP_NAME_UNDERSCORED} from '../../../enonic-connection-config'

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
                _path(siteRelative:true)
                displayName
                data {
                  photos {
                    ... on media_Image {                                             
                      imageUrl: imageUrl(type: absolute, scale: "block(100,100)")       
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
            _path(siteRelative:true)
        }
      }
    }
  }
}`;

export default getMovie;
