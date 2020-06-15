import { setGoogleUser, GoogleUser, SET_GOOGLE_USER } from './types'

export const initialState: GoogleUser = {
  email: '',
  familyName: '',
  givenName: '',
  googleId: '',
  imageUrl: '',
  name: '',
}

export const googleUserReducer = (
  state: GoogleUser = initialState,
  action: setGoogleUser,
): GoogleUser => {
  switch (action.type) {
    case SET_GOOGLE_USER:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
