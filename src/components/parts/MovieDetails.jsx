import React from "react"
import {APP_NAME_UNDERSCORED} from '../../cmsAdapter/constants'


export const getMovie = `
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


// Root component
const MovieView = (obj) => {
//    console.log('MovieView:')
//    console.log(JSON.stringify(obj, null, 2));
    const data = obj.data?.data;
    const {displayName, parent = {}} = obj.content;
    return (
        <>
            <div>
                <h2>{displayName}</h2>
                {data && <MovieInfo data={data}/>}
                {data?.cast && <Cast cast={data.cast}/>}
            </div>

            <BackLink parent={parent}/>
        </>
    );
};

export default MovieView;

// Main movie info: release year, poster image and abstract text.
const MovieInfo = ({data}) => {
    const posterPhoto = (data.photos || [])[0] || {};
    return (
        <>
            { data.release && (
                <p>({ new Date(data.release).getFullYear() })</p>
            )}
            { posterPhoto.imageUrl && (
                <img src={posterPhoto.imageUrl}
                     title={data.subtitle || movie.displayName}
                     alt={data.subtitle || movie.displayName}
                />
            )}
            <p>{data.abstract}</p>
        </>
    )
}

// List persons starring in the movie.
const Cast = ({cast}) => !!(cast?.length) && (
    <div>
        <h4>Cast</h4>
        <ul style={{listStyle: "none", display: "flex", flexFlow: "row wrap"}}>
            {cast.map(
                (person, i) => person && (
                    <CastMember key={i} {...person} />
                )
            )}
        </ul>
    </div>
);

const CastMember = (person) => {
    const { character, actor={} } = person;
    const { displayName, _path, data={} } = actor;
    const personPhoto = (data.photos || [])[0] || {};

    return (
        <li style={{marginRight: "15px"}}>
            {
                personPhoto.imageUrl &&
                <img src={personPhoto.imageUrl}
                     title={`${displayName} as ${character}`}
                     alt={`${displayName} as ${character}`}/>
            }
            <div>
                <p>{character}</p>
                <p><a href={_path}>
                    {displayName}
                </a></p>
            </div>
        </li>
    );
}

// Link to parent item
const BackLink = ({parent}) => parent && (
    <p><a href={parent._path}>Back to Movies</a></p>
);
