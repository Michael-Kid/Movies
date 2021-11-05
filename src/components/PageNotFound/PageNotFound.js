import React from 'react'
import { Link } from 'react-router-dom'
import page from '../../images/pnf.jpg'
import './PageNotFound.scss'

export default function PageNotFound() {
  return (
    <div className='page-not-found'>
      <img src={page} alt='Page Not Found' />
      <Link to='/'>
        <button type='button' className='btn btn-success'>
          Back to the Home Page
        </button>
      </Link>
    </div>
  )
}
