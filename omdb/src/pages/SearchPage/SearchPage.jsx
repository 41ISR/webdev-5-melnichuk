import { useState } from "react"
import "./SearchPage.css"
import MovieCard from "../../components/MovieCard/MovieCard"

const SearchPage = () => {
    const [movieName, setMovieName] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(movieName.trim().length <= 0){
            return
        }
        setError(undefined) 
        setMovies([])
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&s=${movieName}&page=1`)
            const data = await res.json()
            if(data.Response == 'False'){
                throw new Error(data.Error)
            }

            setMovies(data.Search)   
                    
        } catch(err) {
            setError(err.message)
            console.error(err)
        }
    }

    return (
        <>
            <h1>Поиск</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    type="text" />
                <button>Поиск</button>
            </form>
            {error ? 
                (<div>{error}</div>) : 
                (<div className="movie-feed">
                {movies.map((el, index) => <MovieCard key={index} {...el} />)}
            </div>)}
        </>
    )
}

export default SearchPage