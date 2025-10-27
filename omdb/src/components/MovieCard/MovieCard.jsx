import './MovieCard.css'
import { useNavigate } from 'react-router'

const MovieCard = ({Title, Type, Year, Poster, imdbID}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`movie/${imdbID}`)
    }
    return (
        <div className="movie-card" onClick={handleClick}>
            <h4 className="movie-card__title">{Title}</h4>
            <img src={`http://img.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${imdbID}`} alt={Title} className="movie-card__image" />
            <div className="movie-card__year">{Year}</div>
        </div>
    )
}

export default MovieCard