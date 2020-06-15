import { GoogleUser, setGoogleUser, SET_GOOGLE_USER } from './types'
import { Dispatch } from 'react'
import { AppThunk } from '..'

export const putGoogleUser = (user: GoogleUser): AppThunk => (
  dispatch: Dispatch<setGoogleUser>,
) => {
  dispatch({ type: SET_GOOGLE_USER, payload: user })
}
