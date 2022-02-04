import React from "react"

// Root component
const MovieView = ({content}) => {
    const {displayName, data = {}, parent = {}} = content;
    return (
        <>
            <div>
                <h2>{displayName}</h2>
                <MovieInfo data={data}/>
                <Cast cast={data.cast}/>
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
