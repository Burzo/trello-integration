import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Typography } from '@material-ui/core'
import TrelloIntegration from './components/'
import { Loading } from './components/helpers/Loading/Loading'
import { getBrowserLocales } from './helpers'
import moment from 'moment-timezone'
import 'moment/locale/sl'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'
import { setGoogleUser, GoogleUser } from './store/google/types'
import { putGoogleUser } from './store/google/actions'
import { AbsoluteVoucher } from './components/views/Voucher/AbsoluteVoucher'
import jwt_decode from 'jwt-decode'

const PRODUCTION = process.env.NODE_ENV === 'production'

// Set language locale
let locale = getBrowserLocales({ languageCodeOnly: true })
locale && moment.locale(locale[0])

/**
 * App takes care of the google login only
 */
interface IProps {
  putGoogleUser: (user: GoogleUser) => void
}

function App({ putGoogleUser }: IProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const responseGoogle = (response?: any) => {
    const profile: any = jwt_decode(response.credential)

    if (response.error || !profile) {
      setError(
        `Something went wrong, the response was: ${response.error}. Please, try again.`,
      )
    } else {
      putGoogleUser(profile)
      setLoggedIn(true)
    }
    setLoading(false)
  }

  const responseGoogleError = (response?: any) => {
    setError(`Something went wrong. Please, try again.`)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="container-fluid fixed-middle">
        <Loading />
      </div>
    )
  }

  if (PRODUCTION && !loggedIn) {
    return (
      <div className="container-fluid">
        <span className="fixed-middle d-flex flex-column justify-content-center text-center">
          <h2 className="mb-3">Trello API integration</h2>
          <div className="mb-3">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={responseGoogleError}
              auto_select
              useOneTap
            />
          </div>
          <div>
            <Typography align="center" variant="body2">
              {error}
            </Typography>
          </div>
        </span>
      </div>
    )
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <TrelloIntegration />
      <AbsoluteVoucher />
    </div>
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, any, setGoogleUser>,
) => {
  return {
    putGoogleUser: (user: GoogleUser) => dispatch(putGoogleUser(user)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(App)
