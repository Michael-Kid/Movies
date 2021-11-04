import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice'
import user from '../../images/user.png'
import './Header.scss'

export default function Header() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchAsyncMovies(query))
    dispatch(fetchAsyncShows(query))
    setQuery('')
  }
  return (
    <div className='header'>
      <Link to='/'>
        <div className='logo'>MovieApp</div>
      </Link>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            value={query}
            placeholder='Search for Movies or Shows'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className='user-image'>
        <img src={user} alt='user' />
      </div>
    </div>
  )
}
