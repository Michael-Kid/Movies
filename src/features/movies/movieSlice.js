import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { APIkey } from '../../common/apis/MovieApiKey'
import MovieApi from '../../common/apis/MovieApi'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (query) => {
    const response = await MovieApi.get(
      `?apikey=${APIkey}&s=${query}&type=movie`
    ).catch((err) => {
      console.log('Err:', err)
    })
    return response.data
  }
)

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (query) => {
    const response = await MovieApi.get(
      `?apikey=${APIkey}&s=${query}&type=series`
    ).catch((err) => {
      console.log('Err:', err)
    })
    return response.data
  }
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await MovieApi.get(
      `?apikey=${APIkey}&i=${id}&Plot=full`
    ).catch((err) => {
      console.log('Err:', err)
    })
    return response.data
  }
)

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: false,
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      return { ...state, loading: true }
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, movies: payload }
    },
    [fetchAsyncShows.pending]: (state) => {
      return { ...state, loading: true }
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, shows: payload }
    },
    [fetchAsyncMovieOrShowDetail.pending]: (state) => {
      return { ...state, loading: true }
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, selectedMovieOrShow: payload }
    },
  },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getLoadingState = (state) => state.movies.loading
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow
export default movieSlice.reducer
