import React, { useEffect } from 'react'
import movieApi from '../../common/apis/MovieApi'
import MovieListing from '../MovieListing/MovieListing'
import { APIkey } from '../../common/apis/MovieApiKey'
import { useDispatch } from 'react-redux'
import { addMovies } from '../../features/movies/movieSlice'

export default function Home() {
  const movieText = 'Hunger'
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apikey=${APIkey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log('Err:', err)
        })
      dispatch(addMovies(response.data))
    }
    fetchMovies()
  }, [])

  return (
    <div className='banner-img'>
      <MovieListing />
    </div>
  )
}
