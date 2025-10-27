import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import './MovieDetails.css'

const MovieDetails = () => {
    const [movie, setMovie] = useState(undefined)
    const [error, setError] = useState(undefined)
    const {id} = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const handleGetInf = async () => {
            setError(undefined) 
            setMovie([])
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${id}`)
                const data = await res.json()
                if(data.Response == 'False'){
                    throw new Error(data.Error)
                }
                console.log(data);
                
                setMovie(data)
                        
            } catch(err) {
                setError(err.message)
                console.error(err)
                setMovie([])
            }
        }
        handleGetInf()
    }, [id])
 
    return movie && (
        <><div className="back" onClick={() => nav('/')}>← Back</div>
        <div className="movie-details">
            {error ? (<div>{error}</div>) : (
            <>
                
                <h1 className="movie-details__title">{movie.Title}</h1>

                <div className="movie-details__plot">{movie.Plot}</div>
                <img src={`http://img.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${movie.imdbID}`} alt={movie.Title} className="movie-details__image" />
                <div className="movie-details__info">
                    <div className="movie-details__info__releas">Release: {movie.Released}</div>
                    <div className="movie-details__info__type">Type: {movie.Type}</div>
                    <div className="movie-details__info__genre">Genre: {movie.Genre}</div>
                    <div className="movie-details__info__rated">Rated: {movie.Rated}</div>
                    <div className="movie-details__info__runtime">Length: {movie.Runtime}</div>
                    <div className="movie-details__info__rating">Rating:
                        {movie.length == 0 ? (<></>) : movie.Ratings.map((el,index) => (
                            <div key={index} className="movie-details__info__rating__rate">{el.Source} — {el.Value}</div>
                        ))}
                    </div>
                </div>
                <div className="movie-details__people">
                    <div className="movie-details__people__writer">Writer: {movie.Writer}</div>
                    <div className="movie-details__people__director">Director: {movie.Director}</div>
                    <div className="movie-details__people__actors">Actors: {movie.Actors}</div>
                </div>
            </>
            )}
            
        </div></>
        )
}


export default MovieDetails