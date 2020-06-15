export const SET_GOOGLE_USER = 'SET_GOOGLE_USER'

export interface GoogleUser {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

export interface setGoogleUser {
  type: typeof SET_GOOGLE_USER
  payload: GoogleUser
}
