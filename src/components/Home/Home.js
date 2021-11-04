import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch } from 'react-redux'
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice'

export default function Home() {
  const dispatch = useDispatch()
  const movieText = 'Hunger'
  const showText = 'Star'
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncShows(showText))
  }, [dispatch])

  return (
    <div className='banner-img'>
      <MovieListing />
    </div>
  )
}
