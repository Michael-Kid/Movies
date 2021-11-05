import React from 'react'
import { useSelector } from 'react-redux'
import {
  getAllMovies,
  getAllShows,
  getLoadingState,
} from '../../features/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import Slider from 'react-slick'
import Loader from '../Loader/Loader'
import { settings } from '../../common/Settings'
import './MovieListing.scss'

export default function MovieListing() {
  const movies = useSelector(getAllMovies)
  const shows = useSelector(getAllShows)
  const loading = useSelector(getLoadingState)
  let renderMovies = ''
  let renderShows = ''

  renderMovies =
    movies.Response === 'True' ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />
      })
    ) : (
      <div className='movies-error'>
        <h3>Movies are not found. Try searching for something else</h3>
      </div>
    )
  renderShows =
    shows.Response === 'True' ? (
      shows.Search.map((show, index) => {
        return <MovieCard key={index} data={show} />
      })
    ) : (
      <div className='shows-error'>
        <h3>Shows are not found. Try searching for something else</h3>
      </div>
    )

  return (
    <div className='listing'>
      {loading ? (
        <div className='loader'>
          <Loader />
        </div>
      ) : (
        <div className='movie-wrapper'>
          <div className='movie-list'>
            <h2>Movies</h2>
            <div className='movie-container'>
              <Slider {...settings}>{renderMovies}</Slider>
            </div>
          </div>
          <div className='show-list'>
            <h2>Shows</h2>
            <div className='movie-container'>
              <Slider {...settings}> {renderShows}</Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
