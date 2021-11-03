import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { APIkey } from '../../common/apis/MovieApiKey'
import MovieApi from '../../common/apis/MovieApi'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async () => {
    const movieText = 'Hunger'
    const response = await MovieApi.get(
      `?apikey=${APIkey}&s=${movieText}&type=movie`
    ).catch((err) => {
      console.log('Err:', err)
    })
    return response.data
  }
)

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async () => {
    const seriesText = 'Star'
    const response = await MovieApi.get(
      `?apikey=${APIkey}&s=${seriesText}&type=series`
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
    [fetchAsyncMovies.pending]: () => {},
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload }
    },
    [fetchAsyncMovies.rejected]: () => {},
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload }
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      return { ...state, selectedMovieOrShow: payload }
    },
  },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow
export default movieSlice.reducer
