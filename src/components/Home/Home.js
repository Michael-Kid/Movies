import React, { useEffect } from 'react'
import movieApi from '../../common/apis/MovieApi'
import MovieListing from '../MovieListing/MovieListing'
import { APIkey } from '../../common/apis/MovieApiKey'

export default function Home() {
  useEffect(() => {
    const movieText = 'Hunger'
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apikey=${APIkey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log('Err:', err)
        })
      console.log('the response from api', response)
    }
    fetchMovies()
  }, [])

  return (
    <div className='banner-img'>
      <MovieListing />
    </div>
  )
}
